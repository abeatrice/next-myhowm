import React from 'react'
import Head from 'next/head'
import Typography from '@material-ui/core/Typography'
import Layout from '../components/layout'

export default function Index() {
  return (
    <Layout>
      <Head>
        <title>MyHowm Recipes - mmm... what's cooking?</title>
      </Head>
      <Typography variant="h4" component="h1" gutterBottom>
        Recipes
      </Typography>
    </Layout>
  );
}
