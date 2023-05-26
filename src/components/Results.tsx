// import React from 'react'
import { observer } from 'mobx-react-lite'
import { Box, Typography } from '@mui/material'
import store from '../store/store'
import Stack from '@mui/material/Stack'

import 'katex/dist/katex.min.css'
import { InlineMath } from 'react-katex'
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
          <Box sx={{ my: 4 }}>
            <Typography variant="h5" component="h5">
              Ecuación de rigidez del sistema
            </Typography>

            <EquationContainer>
              <InlineMath math="[F] = [K] \cdot [u]" />
            </EquationContainer>

            <Stack
              direction={'row'}
              spacing={3}
              useFlexGap
              flexWrap="nowrap"
              justifyContent="flex-start"
              alignItems="center"
              sx={{
                position: 'relative',
                maxWidth: { xs: 350, md: 750 },
                overflow: 'auto',
                // border: 1,
                // borderColor: 'error.main',
              }}
            >
              <TwoDimensionalArray
                arr={store.solvedValues.f.global}
                name={'fGlobal'}
              />
              <Typography fontSize={40} fontWeight={400}>
                =
              </Typography>
              <TwoDimensionalArray
                arr={store.solvedValues.k.global}
                name={'kGlobal'}
              />
              <Typography fontSize={40} fontWeight={400}>
                <InlineMath math="\cdot" />
              </Typography>
              <TwoDimensionalArray
                arr={store.solvedValues.u.global}
                name={'uGlobal'}
              />
            </Stack>
          </Box>

          <Box sx={{ my: 4 }}>
            <Typography variant="h5" component="h5">
              Cálculo de los desplazamientos en los grados de libertad no
              restringidos
            </Typography>
            <Stack
              direction={'row'}
              maxWidth={{ sm: 350, md: 550, lg: 750 }}
              spacing={3}
              useFlexGap
              flexWrap="nowrap"
              justifyContent="flex-start"
              alignItems="center"
              sx={{ overflow: 'auto', position: 'relative' }}
            >
              <TwoDimensionalArray
                arr={store.solvedValues.u.unrestricted}
                name={'U_u'}
              />
              <Typography fontSize={40} fontWeight={400}>
                =
              </Typography>
              <Typography fontSize={40} fontWeight={400}>
                <InlineMath math="[" />
              </Typography>
              <TwoDimensionalArray
                arr={store.solvedValues.k.kuu}
                name={'k_uu'}
              />
              <Typography fontSize={40} fontWeight={400}>
                <InlineMath math="]^{-1}" />
              </Typography>
              <Typography fontSize={40} fontWeight={400}>
                <InlineMath math="\{" />
              </Typography>
              <TwoDimensionalArray
                arr={store.solvedValues.f.unrestricted}
                name={'F_u'}
              />
              <Typography fontSize={40} fontWeight={400}>
                <InlineMath math="-" />
              </Typography>
              <TwoDimensionalArray
                arr={store.solvedValues.k.kur}
                name={'k_ur'}
              />
              <Typography fontSize={40} fontWeight={400}>
                <InlineMath math="\cdot" />
              </Typography>
              <TwoDimensionalArray
                arr={store.solvedValues.u.restricted}
                name={'U_r'}
              />
              <Typography fontSize={40} fontWeight={400}>
                <InlineMath math="\}" />
              </Typography>
            </Stack>
            {!store.errors.includes(
              'La matriz no tiene inversa, verifica los datos.'
            ) ? (
              <>
                <Stack
                  direction={'row'}
                  maxWidth={{ sm: 350, md: 550, lg: 750 }}
                  minHeight={250}
                  spacing={3}
                  useFlexGap
                  flexWrap="nowrap"
                  justifyContent="flex-start"
                  alignItems="center"
                  sx={{ overflow: 'auto', position: 'relative', my: 2 }}
                >
                  <TwoDimensionalArray
                    arr={store.solvedValues.u.unrestricted}
                    name={'U_u'}
                  />
                  <Typography fontSize={40} fontWeight={400}>
                    =
                  </Typography>
                  <TwoDimensionalArray
                    arr={store.solvedValues.u.solved}
                    name={'U_u'}
                    decimals={6}
                  />
                </Stack>

                <Box>
                  <Typography variant="h5" component="h5">
                    Cálculo de los desplazamientos en los grados de libertad no
                    restringidos
                  </Typography>
                  <Stack
                    direction={'row'}
                    maxWidth={{ sm: 350, md: 550, lg: 750 }}
                    spacing={3}
                    useFlexGap
                    flexWrap="nowrap"
                    justifyContent="flex-start"
                    alignItems="center"
                    sx={{ overflow: 'auto', position: 'relative', my: 1 }}
                  >
                    <TwoDimensionalArray
                      arr={store.solvedValues.f.restricted}
                      name={'F_r'}
                    />
                    <Typography fontSize={40} fontWeight={400}>
                      =
                    </Typography>
                    <TwoDimensionalArray
                      arr={store.solvedValues.k.krr}
                      name={'k_rr'}
                      decimals={3}
                    />
                    <Typography fontSize={40} fontWeight={400}>
                      <InlineMath math="\cdot" />
                    </Typography>
                    <TwoDimensionalArray
                      arr={store.solvedValues.u.restricted}
                      name={'U_r'}
                      decimals={3}
                    />
                    <Typography fontSize={40} fontWeight={400}>
                      <InlineMath math="+" />
                    </Typography>
                    <TwoDimensionalArray
                      arr={store.solvedValues.k.kru}
                      name={'k_ru'}
                      decimals={3}
                    />
                    <Typography fontSize={40} fontWeight={400}>
                      <InlineMath math="\cdot" />
                    </Typography>
                    <TwoDimensionalArray
                      arr={store.solvedValues.u.solved}
                      name={'U_u'}
                      decimals={3}
                    />
                  </Stack>
                  <Stack
                    direction={'row'}
                    maxWidth={{ sm: 350, md: 550, lg: 750 }}
                    spacing={3}
                    useFlexGap
                    flexWrap="nowrap"
                    justifyContent="flex-start"
                    alignItems="center"
                    sx={{ overflow: 'auto', position: 'relative', my: 1 }}
                  >
                    <TwoDimensionalArray
                      arr={store.solvedValues.f.restricted}
                      name={'F_r'}
                    />
                    <Typography fontSize={40} fontWeight={400}>
                      =
                    </Typography>
                    <TwoDimensionalArray
                      arr={store.solvedValues.f.solved}
                      name={'F_r'}
                      decimals={3}
                    />
                  </Stack>
                </Box>
              </>
            ) : null}
          </Box>
        </Box>
      ) : null}
    </Box>
  )
})

export default Results
