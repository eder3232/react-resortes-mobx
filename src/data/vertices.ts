import { IInputVertexData } from '../interfaces/vertices'

import { v4 as uuidv4 } from 'uuid'

export const initialVerticesData: IInputVertexData[] = [
  {
    id: uuidv4(),
    name: 'v1',
    displacement: '0',
    force: '0',
    isRestricted: true,
  },
  {
    id: uuidv4(),
    name: 'v2',
    displacement: '0',
    force: '-4',
    isRestricted: false,
  },
  {
    id: uuidv4(),
    name: 'v3',
    displacement: '0',
    force: '-8',
    isRestricted: false,
  },
  {
    id: uuidv4(),
    name: 'v4',
    displacement: '0',
    force: '20',
    isRestricted: false,
  },
]
