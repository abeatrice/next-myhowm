import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import RecipeCard from './Card'
import CreateRecipeCard from './create/Card'
import {Grid} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}))

export default function CardGrid(props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid 
        container
        align="center"
        spacing={3}
      >
        {props.recipes.map((recipe, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <RecipeCard recipe={recipe} />
          </Grid>
        ))}
        <Grid item xs={12} sm={6} md={4}>
          <CreateRecipeCard 
            handleNewRecipe={props.handleNewRecipe}
          />
        </Grid>
      </Grid>
    </div>
  )
}
