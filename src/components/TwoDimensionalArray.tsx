import React from 'react'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

interface ITwoDimensionalArray {
  arr: (number | string)[][]
  name: string
  decimals?: number
}

const TwoDimensionalArray: React.FC<ITwoDimensionalArray> = ({
  arr,
  name,
  decimals = 2,
}) => {
  return (
    <Box>
      {/* <Paper sx={{ width: '100%', overflow: 'hidden' }}> */}
      <TableContainer sx={{ maxHeight: 440, minWidth: 350, maxWidth: 680 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={arr.length + 1} align={'center'}>
                {name}
              </TableCell>
            </TableRow>
            <TableRow>
              {Array.from({ length: arr.length + 1 }).map((_, i) => (
                <TableCell align="right" size="small" key={i}>
                  {i}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {arr.map((row, i) => (
              <TableRow key={i}>
                <TableCell align="right" size="small">
                  {i + 1}
                </TableCell>
                {row.map((e, j) => (
                  <TableCell
                    align="right"
                    size="small"
                    key={j}
                    // sx={{ width: 120 }}
                  >
                    {typeof e === 'number' ? e.toFixed(decimals) : e}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* </Paper> */}
    </Box>
  )
}

export default TwoDimensionalArray
