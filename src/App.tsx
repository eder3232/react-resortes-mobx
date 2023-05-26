import { useLayoutEffect } from 'react'
// import Container from '@mui/material/Container'
import { Box } from '@mui/material'
import VerticesTable from './components/VerticesTable'
import EdgesTable from './components/EdgesTable'
import Button from '@mui/material/Button'
import store from './store/store'
import Errors from './components/Errors'
import Results from './components/Results'
import { pink } from '@mui/material/colors'

function App() {
  useLayoutEffect(() => {
    store.calculate()
  }, [])
  return (
    // <Container fixed disableGutters>
    <Box
      sx={{
        width: '100vw',
        px: { xs: 1, sm: 2 },
        overflow: 'auto',
        backgroundColor: pink[50],
      }}
    >
      <Box>
        <Box>
          <VerticesTable />
          <EdgesTable />
        </Box>

        <Box>
          <Button
            variant="contained"
            onClick={() => store.calculate()}
            sx={{ my: 2 }}
          >
            Calcular
          </Button>
          <Errors />

          <Results />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </Box>
      </Box>
    </Box>
    // </Container>
  )
}

export default App
