import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Card, CardContent, CardMedia, Typography} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 300,
    maxWidth: 300,
    minHeight: 300,
    maxHeight: 300,
  },
  media: {
    height: 150,
  },
}))

export default function RecipeCard(props) {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
        <CardMedia 
          className={classes.media}
          image={props.img}
          title={props.name}
        />
        <CardContent>
          <Typography component="h2" variant="h5" align="left" gutterBottom>
            {props.name}
          </Typography>
          <Typography component="p" variant="body2" align="left" color="textSecondary">
            {props.description}
          </Typography>
        </CardContent>
    </Card>
  )
}
