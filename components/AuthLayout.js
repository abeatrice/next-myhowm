import AppBar from '../components/AppBar'
import {Container, Box} from '@material-ui/core'

export default function AuthLayout({children}) {
  return (
    <>
      <AppBar />
      <Container maxWidth="lg">
        <Box my={4}>
          {children}
        </Box>
      </Container>
    </>
  )
}
