import React from 'react'
import Head from 'next/head'
import Typography from '@material-ui/core/Typography'
import Layout from '../components/layout'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

function Page({recipes}) {
  return (
    <Layout>
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
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`http://127.0.0.1:3000/recipes`)
  const data = await res.json()
  return {
    props: {recipes: data.data},
  }
}

export default Page
