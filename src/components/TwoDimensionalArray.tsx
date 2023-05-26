import React from 'react'
import {
  Box,
  Table,
  TableBody,
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

import { pink } from '@mui/material/colors'

interface ITwoDimensionalArray {
  arr: (number | string)[][]
  name: string
  decimals?: number
}

const TwoDimensionalArray: React.FC<ITwoDimensionalArray> = ({
  arr = [],
  name,
  decimals = 2,
}) => {
  return (
    <Box>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={(arr[0]?.length || 0) + 1} align={'center'}>
                  {name}
                </TableCell>
              </TableRow>
              <TableRow>
                {Array.from({ length: (arr[0]?.length || 0) + 1 }).map(
                  (_, i) => (
                    <TableCell
                      align="right"
                      size="small"
                      key={i}
                      sx={{ backgroundColor: pink[100] }}
                    >
                      {i}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {arr.map((row, i) => (
                <TableRow key={i}>
                  <TableCell
                    align="right"
                    size="small"
                    sx={{ backgroundColor: pink[100] }}
                  >
                    {i + 1}
                  </TableCell>
                  {row.map((e, j) => (
                    <TableCell align="right" size="small" key={j}>
                      {typeof e === 'number' ? e.toFixed(decimals) : e}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}

export default TwoDimensionalArray
