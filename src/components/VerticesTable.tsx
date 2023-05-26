import React from 'react'

import { observer } from 'mobx-react-lite'

import store from '../store/store'

import { Box, IconButton, TextField } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
// import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

// import InputCell from './InputCell'
import StyledTableCell from './StyledTableCell'
// import { IInputVertexData } from '../interfaces/vertices'

const VerticesTable = observer(() => {
  return (
    <Box>
      <h2>Ingresa los datos:</h2>
      <h3>Vertices o nudos:</h3>
      <Box>
        {/* <form onSubmit={(e) => e.preventDefault()}> */}
        {/* <Paper> */}
        <TableContainer sx={{ maxHeight: 440, minWidth: 350, maxWidth: 680 }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Add</StyledTableCell>
                <StyledTableCell align="center">Remove</StyledTableCell>
                <StyledTableCell align="center">Nombre</StyledTableCell>
                <StyledTableCell align="center">Fuerza</StyledTableCell>
                <StyledTableCell align="center">Desplazamiento</StyledTableCell>
                <StyledTableCell align="center">Restringido?</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {store.inputVerticesData.map((vertex, i) => (
                <TableRow key={vertex['id']}>
                  <StyledTableCell align="center">
                    <IconButton onClick={() => store.vertices_onAddNewRow(i)}>
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </StyledTableCell>

                  <StyledTableCell
                    align="center"
                    onClick={() => store.vertices_onDeleteRow(i)}
                  >
                    <IconButton>
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </StyledTableCell>

                  <StyledTableCell>
                    <TextField
                      onChange={(e) =>
                        store.vertices_onChange(
                          e as React.ChangeEvent<HTMLInputElement>
                        )
                      }
                      name={`name-${i}`}
                      value={vertex.name}
                      sx={{ width: 100 }}
                    />
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <TextField
                      onChange={(e) =>
                        store.vertices_onChange(
                          e as React.ChangeEvent<HTMLInputElement>
                        )
                      }
                      name={`force-${i}`}
                      value={vertex.force}
                      sx={{ width: 100 }}
                      type={'number'}
                    />
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <TextField
                      onChange={(e) =>
                        store.vertices_onChange(
                          e as React.ChangeEvent<HTMLInputElement>
                        )
                      }
                      name={`displacement-${i}`}
                      value={vertex.displacement}
                      sx={{ width: 100 }}
                      type={'number'}
                    />
                  </StyledTableCell>

                  <StyledTableCell align="center" padding="checkbox">
                    <Checkbox
                      name={`isRestricted-${i}`}
                      onChange={(e) => store.vertices_onClickCheckbox(e)}
                      inputProps={{ 'aria-label': 'controlled' }}
                      checked={vertex.isRestricted}
                    />
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* </Paper> */}
        {/* </form> */}
      </Box>

      <ol>
        {store.inputVerticesData.map((e) => (
          <li key={e.id}>{JSON.stringify(e)}</li>
        ))}
      </ol>
    </Box>
  )
})

export default VerticesTable
