import Container from '@mui/material/Container'
import { Box } from '@mui/material'
import VerticesTable from './components/VerticesTable'
import EdgesTable from './components/EdgesTable'
import Button from '@mui/material/Button'
import store from './store/store'
import Errors from './components/Errors'
import Results from './components/Results'

function App() {
  return (
    // <Container maxWidth="sm">
    <Box sx={{ width: '100vw', overflow: 'hidden' }}>
      <Box>
        <Box>
          <VerticesTable />
          <EdgesTable />
        </Box>

        <Box>
          <Button variant="contained" onClick={() => store.calculate()}>
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
