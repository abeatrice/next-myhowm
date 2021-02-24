import React from 'react'
import Head from 'next/head'
import axios from 'axios'
import {Typography, CardHeader, CardContent, Card} from '@material-ui/core'
import AuthLayout from '../components/AuthLayout'
import {authenticate} from '../utils/auth'
import RecipeCardGrid from '../components/recipe/CardGrid'

function Page({recipes}) {
  return (
    <AuthLayout>
      <Head>
        <title>MyHowm Recipes - mmm... what's cooking?</title>
      </Head>
      <Typography variant="h4" component="h1" gutterBottom>
        Recipes
      </Typography>
      <RecipeCardGrid recipes={recipes} />
    </AuthLayout>
  );
}

export async function getServerSideProps(context) {
  await authenticate(context)
  const token = context.req.headers.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  const res = await axios.get('http://localhost:3000/recipes', { headers: { 'Authorization': 'Bearer ' + token } })
  return {
    props: {recipes: res.data.data}
  }
}

export default Page
