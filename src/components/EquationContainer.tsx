import React from 'react'
import { Box } from '@mui/material'

const EquationContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <Box sx={{ m: 2 }}>{children}</Box>
}

export default EquationContainer
