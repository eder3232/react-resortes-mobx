import Box from '@mui/material/Box'
import { observer } from 'mobx-react-lite'
import store from '../store/store'

import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'

const Errors = observer(() => {
  return (
    <Box sx={{ my: 2 }}>
      <Stack spacing={1}>
        {store.errors.map((e, i) => (
          <Alert severity="error" key={i}>
            {e}
          </Alert>
        ))}
      </Stack>
    </Box>
  )
})

export default Errors
