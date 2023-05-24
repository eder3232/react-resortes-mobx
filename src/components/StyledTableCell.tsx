// import * as React from 'react'
import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    // color: theme.palette.common.white,
    padding: 4,
    // margin: 4,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: 4,
    margin: 4,
  },
}))

export default StyledTableCell
