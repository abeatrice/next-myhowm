import { createMuiTheme } from '@material-ui/core/styles'
import {grey} from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: grey[900]
    }
  },
})

export default theme
