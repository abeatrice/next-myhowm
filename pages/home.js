import React from 'react'
import Head from 'next/head'
import Layout from '../components/layout'
import Typography from '@material-ui/core/Typography'
import Link from 'next/link'

export default function Index() {
  return (
    <Layout>
        <Head>
          <title>MyHowm Recipes - mmm... what's cooking?</title>
        </Head>
        <Typography variant="h4" component="h1" gutterBottom>
          Home
        </Typography>
        <Link href="/recipes" color="primary">
          Recipes
        </Link>
    </Layout>
  );
}
