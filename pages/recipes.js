import React from 'react'
import Head from 'next/head'
import Typography from '@material-ui/core/Typography'
import AuthLayout from '../components/AuthLayout'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import {authenticate} from '../utils/auth'
import {Cookies} from 'react-cookie'
import axios from 'axios'

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
  const cookies = new Cookies();
  const token = cookies.get('token')
  const res = await axios.get('http://localhost/recipes', { headers: { 'Authorization': 'Bearer ' + token } })
  const data = await res.json()
  return {
    props: {recipes: data.data},
  }
}

export default Page
