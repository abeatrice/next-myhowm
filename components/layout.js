import AppBar from '../components/AppBar';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

export default function({children}) {
    return (
        <>
            <AppBar />
            <Container maxWidth="sm">
                <Box my={4}>
                    {children}
                </Box>
            </Container>
        </>
    )
}
