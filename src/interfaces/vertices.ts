export interface IInputVertexData {
  id: string
  name: string
  force: string
  displacement: string
  isRestricted: boolean
}

export interface IParsedVertexData {
  id: string
  name: string
  force: number
  displacement: number
  isRestricted: boolean
}
