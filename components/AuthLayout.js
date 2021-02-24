import AppBar from '../components/AppBar';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

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
