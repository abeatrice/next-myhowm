import React from 'react'
import Typography from '@material-ui/core/Typography'
import GuestLayout from '../components/GuestLayout'
import Link from '../components/Link'

export default function Page() {
  return (
    <GuestLayout>
      <div>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <Link href="/login" color="primary">
          Login
        </Link>
        <Link href="/register" color="secondary">
          Register
        </Link>
      </div>
    </GuestLayout>
  );
}
