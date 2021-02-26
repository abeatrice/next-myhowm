import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Card, CardContent, CardMedia, Typography} from '@material-ui/core'
import DetailCard from './DetailCard'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 300,
    maxWidth: 300,
    minHeight: 300,
    maxHeight: 300,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.action.selected
    }
  },
  media: {
    height: 200,
  }
}))

export default function RecipeCard(props) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {setOpen(true)}
  const handleClose = () => {setOpen(false)}

  return (
    <>
      <Card className={classes.root} onClick={handleOpen}>
        <CardMedia 
          className={classes.media}
          image={props.recipe.ImgSrc}
          title={props.recipe.RecipeName}
        />
        <CardContent>
          <Typography component="h1" variant="h5" align="left" gutterBottom>
            {props.recipe.RecipeName}
          </Typography>
          <Typography component="p" variant="body2" align="left" color="textSecondary" noWrap>
            {props.recipe.Description}
          </Typography>
        </CardContent>
      </Card>
      <DetailCard open={open} onClose={handleClose} recipe={props.recipe} />
    </>
  )
}
