import React from 'react'

import { observer } from 'mobx-react-lite'
import store from '../store/store'

import Box from '@mui/material/Box'
import { IconButton, TextField } from '@mui/material'
// import Checkbox from '@mui/material/Checkbox'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
// import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

import StyledTableCell from './StyledTableCell'
// import { IInputEdgeData } from '../interfaces/edges'

const EdgesTable = observer(() => {
  return (
    <Box>
      <h2>Ingresa los datos:</h2>
      <h3>Vertices o nudos:</h3>
      <Box sx={{ width: 600 }}>
        <form onSubmit={(e) => e.preventDefault()}>
          <TableContainer component={Paper} aria-label="simple table">
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Add</StyledTableCell>
                  <StyledTableCell align="center">Remove</StyledTableCell>
                  <StyledTableCell align="center">Nombre</StyledTableCell>
                  <StyledTableCell align="center">From</StyledTableCell>
                  <StyledTableCell align="center">To</StyledTableCell>
                  <StyledTableCell align="center">K</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {store.inputEdgesData.map((edge, i) => (
                  <TableRow key={edge['id']}>
                    <StyledTableCell align="center">
                      <IconButton onClick={() => store.edges_onAddNewRow(i)}>
                        <AddCircleOutlineIcon />
                      </IconButton>
                    </StyledTableCell>

                    <StyledTableCell
                      align="center"
                      onClick={() => store.edges_onDeleteRow(i)}
                    >
                      <IconButton>
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <TextField
                        onChange={(e) =>
                          store.edges_onChange(
                            e as React.ChangeEvent<HTMLInputElement>
                          )
                        }
                        name={`name-${i}`}
                        value={edge.name}
                        sx={{ width: 100 }}
                      />
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <TextField
                        onChange={(e) =>
                          store.edges_onChange(
                            e as React.ChangeEvent<HTMLInputElement>
                          )
                        }
                        name={`from-${i}`}
                        value={edge.from}
                        sx={{ width: 100 }}
                      />
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <TextField
                        onChange={(e) =>
                          store.edges_onChange(
                            e as React.ChangeEvent<HTMLInputElement>
                          )
                        }
                        name={`to-${i}`}
                        value={edge.to}
                        sx={{ width: 100 }}
                      />
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <TextField
                        onChange={(e) =>
                          store.edges_onChange(
                            e as React.ChangeEvent<HTMLInputElement>
                          )
                        }
                        name={`k-${i}`}
                        value={edge.k}
                        sx={{ width: 100 }}
                        type={'number'}
                      />
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </form>
      </Box>

      <ol>
        {store.inputEdgesData.map((e) => (
          <li key={e.id}>{JSON.stringify(e)}</li>
        ))}
      </ol>
    </Box>
  )
})

export default EdgesTable
