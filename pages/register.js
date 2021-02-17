import React from 'react'
import Typography from '@material-ui/core/Typography'
import GuestLayout from '../components/GuestLayout'
import Link from '../components/Link'

export default function Page() {
  return (
    <GuestLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Register
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
