import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Card, CardActionArea, CardActions, CardContent, CardMedia} from '@material-ui/core'
import {Button, Typography} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,  
  },
  media: {
    height: 140,
  },
}))

export default function RecipeCard() {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia 
          className={classes.media}
          image="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F3138358.jpg&w=596&h=596&c=sc&poi=face&q=85"
          title="Pancake"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Pancakes
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            These pancakes are pretty good with some vanilla in them.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Edit
        </Button>
      </CardActions>
    </Card>
  )
}
