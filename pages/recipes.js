import React from 'react'
import Head from 'next/head'
import axios from 'axios'
import AuthLayout from '../components/AuthLayout'
import {authenticate} from '../utils/auth'
import RecipeCardGrid from '../components/recipe/CardGrid'

const serverUrl = 'http://localhost:3000/recipes'

function Page(props) {
  const [recipes, setRecipes] = React.useState(props.recipes)
  const handleNewRecipe = recipe => setRecipes([...recipes, recipe])

  return (
    <AuthLayout>
      <Head>
        <title>MyHowm Recipes - mmm... what's cooking?</title>
      </Head>
      <RecipeCardGrid 
        recipes={recipes} 
        handleNewRecipe={handleNewRecipe}
      />
    </AuthLayout>
  );
}

export async function getServerSideProps(context) {
  await authenticate(context)
  const token = context.req.headers.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  const res = await axios.get(serverUrl, { headers: { 'Authorization': 'Bearer ' + token } })
  return {
    props: {recipes: res.data.data}
  }
}

export default Page
