// import React from 'react'
import { observer } from 'mobx-react-lite'
import { Box, Typography } from '@mui/material'
import store from '../store/store'
import Stack from '@mui/material/Stack'

import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'
import EquationContainer from './EquationContainer'
import TwoDimensionalArray from './TwoDimensionalArray'
// import store from '../store/store'

const Results = observer(() => {
  return (
    <Box>
      <Typography variant="h4" component="h4">
        Results
      </Typography>

      {store.errors.length < 1 ? (
        <Box>
          <Typography variant="h5" component="h5">
            Ecuación de rigidez del sistema
          </Typography>

          <EquationContainer>
            <InlineMath math="[F] = [K] \cdot [u]" />
          </EquationContainer>

          <Stack>
            <TwoDimensionalArray
              arr={store.solvedValues.kGlobal}
              name={'kGlobal'}
            />
          </Stack>

          {JSON.stringify(store.solvedValues.kGlobal)}
        </Box>
      ) : null}
    </Box>
  )
})

export default Results
