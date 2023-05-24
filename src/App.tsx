import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import VerticesTable from './components/VerticesTable'
import EdgesTable from './components/EdgesTable'
import Button from '@mui/material/Button'

function App() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ m: 4 }}>
        <Box>
          <VerticesTable />
          <EdgesTable />
        </Box>

        <Box>
          <Button variant="contained">Calcular</Button>
        </Box>
      </Box>
    </Container>
  )
}

export default App
