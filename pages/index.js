import Link from '../components/Link'
import Typography from '@material-ui/core/Typography'
import GuestLayout from '../components/GuestLayout'
import {authenticate} from '../utils/auth'

function Page() {
  return (
    <GuestLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome
      </Typography>
      <Link href="/login" color="primary">
        Login
      </Link>
      <Link href="/register" color="secondary">
        Register
      </Link>
    </GuestLayout>
  );
}

export async function getServerSideProps(context) {
  await authenticate(context)
  return {props: {}}
}

export default Page
