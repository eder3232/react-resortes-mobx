import React from 'react'
import { makeAutoObservable, observable } from 'mobx'
import { IInputVertexData, IParsedVertexData } from '../interfaces/vertices'
import { IInputEdgeData, IParsedEdgeData } from '../interfaces/edges'
import { initialVerticesData } from '../data/vertices'
import { initialEdgesData } from '../data/edges'
import { v4 as uuidv4 } from 'uuid'
import { Vertices } from '../logic/models/vertices'
import { Edges } from '../logic/models/edges'
import { Spring } from '../logic/models/spring'

class ApplicationStore {
  errors: string[] = []
  inputVerticesData: IInputVertexData[] = initialVerticesData
  inputEdgesData: IInputEdgeData[] = initialEdgesData
  solvedValues: {
    k: {
      global: number[][]
      krr: number[][]
      kru: number[][]
      kur: number[][]
      kuu: number[][]
    }
    f: {
      global: (number | string)[][]
      restricted: string[][]
      unrestricted: number[][]
      solved: number[][]
    }
    u: {
      global: (number | string)[][]
      restricted: number[][]
      unrestricted: string[][]
      solved: number[][]
    }
  } = {
    k: { global: [[]], krr: [[]], kru: [[]], kur: [[]], kuu: [[]] },
    f: { global: [[]], restricted: [[]], unrestricted: [[]], solved: [[]] },
    u: { global: [[]], restricted: [[]], unrestricted: [[]], solved: [[]] },
  }

  constructor() {
    makeAutoObservable(this, {
      errors: observable,
      inputVerticesData: observable,
      inputEdgesData: observable,
    })
  }

  // vertices table controller
  vertices_onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const fieldName = e.target.name
    const identifier = fieldName.split('-')[0] as
      | 'name'
      | 'force'
      | 'displacement'
    const index = Number(fieldName.split('-')[1])

    this.inputVerticesData[index][identifier] = e.target.value
  }

  vertices_onAddNewRow(i: number) {
    const elementToInsert = {
      id: uuidv4(),
      name: `v${this.inputVerticesData.length + 1}`,
      displacement: '0',
      force: '0',
      isRestricted: false,
    }

    this.inputVerticesData.splice(i + 1, 0, elementToInsert)
  }

  vertices_onDeleteRow(i: number) {
    this.inputVerticesData.splice(i, 1)
  }

  vertices_onClickCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    const fieldName = e.target.name
    const identifier = fieldName.split('-')[0] as 'isRestricted'
    const index = Number(fieldName.split('-')[1])
    // this.inputVerticesData.map((e) => console.log(e))
    this.inputVerticesData[index][identifier] = e.target.checked
    // cambio a true, o sea se volvio en restringido
    // por lo tanto la fuerza debe ser cero
    if (this.inputVerticesData[index][identifier] === true) {
      this.inputVerticesData[index]['force'] = '0'
    } else {
      this.inputVerticesData[index]['displacement'] = '0'
    }
  }

  edges_onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const fieldName = e.target.name
    const identifier = fieldName.split('-')[0] as 'name' | 'from' | 'to'
    const index = Number(fieldName.split('-')[1])

    this.inputEdgesData[index][identifier] = e.target.value
  }

  edges_onAddNewRow(i: number) {
    const elementToInsert = {
      id: uuidv4(),
      name: `e${this.inputEdgesData.length + 1}`,
      from: '0',
      to: '0',
      k: '',
    }

    this.inputEdgesData.splice(i + 1, 0, elementToInsert)
  }

  edges_onDeleteRow(i: number) {
    this.inputEdgesData.splice(i, 1)
  }

  calculate() {
    // casting de datos
    const copyVertices: IParsedVertexData[] = [...this.inputVerticesData].map(
      (e) => {
        const displacementNumber = Number(e.displacement)
        const forceNumber = Number(e.force)
        const newObj = {
          id: e.id,
          name: e.name,
          force: forceNumber,
          displacement: displacementNumber,
          isRestricted: e.isRestricted,
        }
        return newObj
      }
    )

    const copyEdges: IParsedEdgeData[] = [...this.inputEdgesData].map((e) => {
      const kNumber = Number(e.k)
      return {
        id: e.id,
        name: e.name,
        from: e.from,
        to: e.to,
        k: kNumber,
      }
    })

    const vertices = new Vertices()

    copyVertices.map((e) => {
      try {
        if (e.isRestricted) {
          vertices.addRestrictedVertex(e.displacement, e.name)
        } else {
          vertices.addUnrestrictedVertex(e.force, e.name)
        }
      } catch (e) {
        if (e instanceof Error) {
          this.errors.push(e.message)
        }
      }
    })
    this.errors = []

    const edges = new Edges(vertices.getData())

    copyEdges.map((e) => {
      try {
        edges.add(e.from, e.to, e.k, e.id)
      } catch (e: unknown) {
        if (e instanceof Error) {
          // console.log(e.message)
          this.errors.push(e.message)
        }
      }
    })

    const spring = new Spring(edges.getData())

    spring.dataConfig()
    //Creamos las matrices locales de rigidez
    spring.generateLocals()
    //Generar el vector de grados de libertad de cada elemento
    spring.generateTableDof()
    //Ensamblar la matriz global de rigidez
    this.solvedValues.k.global = spring.buildGlobal()
    //Ensamblamos las matrices de fuerzas
    const {
      global: fGlobal,
      restricted: fRestricted,
      unrestricted: fUnrestricted,
    } = spring.buildForces()
    this.solvedValues.f.global = fGlobal
    this.solvedValues.f.restricted = fRestricted
    this.solvedValues.f.unrestricted = fUnrestricted
    //Ensamblamos las matrices de desplazamientos
    const {
      global: uGlobal,
      restricted: uRestricted,
      unrestricted: uUnrestricted,
    } = spring.buildDisplacements()
    this.solvedValues.u.global = uGlobal
    this.solvedValues.u.restricted = uRestricted
    this.solvedValues.u.unrestricted = uUnrestricted
    //separamos la matriz global de rigidez
    const { krr, kru, kur, kuu } = spring.splitGlobal()

    this.solvedValues.k.krr = krr
    this.solvedValues.k.kru = kru
    this.solvedValues.k.kur = kur
    this.solvedValues.k.kuu = kuu

    try {
      //Resolver la matriz de desplazamientos
      this.solvedValues.u.solved = spring.solveDisplacements()
      //Resolver la matriz de fuerzas
      this.solvedValues.f.solved = spring.solveForces()
      //Creando las matrices globales numericas f y u
      spring.buildNumericFAndU()
      //Obteniendo las fuerzas internas
      spring.solveInternalForces()
      // return spring
      this.errors = []
    } catch {
      this.errors.push('La matriz no tiene inversa, verifica los datos.')
    }
  }
}

const store = new ApplicationStore()

export default store
