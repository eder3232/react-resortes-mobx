import { v4 as uuidv4 } from 'uuid'
import { IInputEdgeData } from '../interfaces/edges'

export const initialEdgesData: IInputEdgeData[] = [
  {
    id: uuidv4(),
    name: 'e1',
    from: 'v1',
    to: 'v2',
    k: '10',
  },
  {
    id: uuidv4(),
    name: 'e2',
    from: 'v2',
    to: 'v3',
    k: '8',
  },
  {
    id: uuidv4(),
    name: 'e3',
    from: 'v3',
    to: 'v4',
    k: '12',
  },
]
