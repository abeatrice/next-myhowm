import React from 'react'
import {Cookies} from 'react-cookie'
import Head from 'next/head'
import axios from 'axios'
import {Typography, CardHeader, CardContent, Card} from '@material-ui/core'
import AuthLayout from '../components/AuthLayout'
import {authenticate} from '../utils/auth'

function Page({recipes}) {
  return (
    <AuthLayout>
      <Head>
        <title>MyHowm Recipes - mmm... what's cooking?</title>
      </Head>
      <Typography variant="h4" component="h1" gutterBottom>
        Recipes
      </Typography>
      {
        recipes.map(recipe => {
          return (
            <Card key={recipe.ID}>
              <CardHeader 
                title={recipe.Name}
              />
              <CardContent>
                {recipe.Description}
              </CardContent>
            </Card>
          )
        })
      }
    </AuthLayout>
  );
}

export async function getServerSideProps(context) {
  await authenticate(context)
  const cookies = new Cookies()
  const token = cookies.get('token')
  const res = await axios.get('http://localhost:3000/recipes', { headers: { 'Authorization': 'Bearer ' + token } })
  return {
    props: {recipes: res.data.data}
  }
}

export default Page
