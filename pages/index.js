import Link from '../components/Link';
import Typography from '@material-ui/core/Typography';

export default function Index() {
  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome
      </Typography>
      <Link href="/login" color="primary">
        Login
      </Link>
      <Link href="/register" color="secondary">
        Register
      </Link>
    </>
  );
}
