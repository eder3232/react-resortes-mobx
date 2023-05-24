import React from 'react'
import { makeAutoObservable, observable } from 'mobx'
import { IInputVertexData } from '../interfaces/vertices'
import { IInputEdgeData } from '../interfaces/edges'
import { initialVerticesData } from '../data/vertices'
import { initialEdgesData } from '../data/edges'
import { v4 as uuidv4 } from 'uuid'

class ApplicationStore {
  errors: string[] = []
  inputVerticesData: IInputVertexData[] = initialVerticesData
  inputEdgesData: IInputEdgeData[] = initialEdgesData

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
}

const store = new ApplicationStore()

export default store
