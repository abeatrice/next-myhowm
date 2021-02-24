import React from 'react'
import Head from 'next/head'
import AuthLayout from '../components/AuthLayout'
import Typography from '@material-ui/core/Typography'
import {authenticate} from '../utils/auth'
import Link from 'next/link'

export default function Page() {
  return (
    <AuthLayout>
        <Head>
          <title>MyHowm - Time to relax...</title>
        </Head>
        <Typography variant="h4" component="h1" gutterBottom>
          Home
        </Typography>
        <Link href="/recipes" color="primary">
          Recipes
        </Link>
    </AuthLayout>
  );
}

export async function getServerSideProps(context) {
  await authenticate(context)

  return {
    props: {},
  }
}
