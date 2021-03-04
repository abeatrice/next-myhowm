import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Card, CardContent, CardMedia, Typography} from '@material-ui/core'
import {Dialog, DialogTitle, DialogContent, Slide, IconButton} from '@material-ui/core'
import {Grid, List, ListItem, Divider, Hidden, Box} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: 0,
  },
  media: {
    height: 300,
  },
  title: {
    backgroundColor: theme.palette.info.main,
    margin: 0,
    padding: theme.spacing(2)
  },
  content: {
    margin: 0,
    padding: 0,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(3),
    top: theme.spacing(1),
  },
}))

const Transition = React.forwardRef(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
  }
)

export default function RecipeCard(props) {
  const classes = useStyles()
  const handleClose = () => {props.onClose(false)}

  return (
    <Dialog fullScreen open={props.open} onClose={handleClose} TransitionComponent={Transition}>
      <DialogTitle className={classes.title} disableTypography>
        <Typography component="h3" variant="h5">{props.recipe.RecipeName}</Typography>
        <IconButton className={classes.closeButton} onClick={handleClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.content}>
          <Card elevation={0} className={classes.card}>
            <CardMedia
              className={classes.media}
              image={props.recipe.ImgSrc}
              title={props.recipe.RecipeName}
            />
            <CardContent>
              <Typography component="p" variant="body1" align="left" color="textSecondary">
                {props.recipe.Description}
              </Typography>
              <Grid container align="center" spacing={3}>
                <Grid item xs={12} sm={4} md={3}>
                  <Box mt={1}>
                    <Typography variant="h5" align="left">Ingredients</Typography>
                  </Box>
                  <List>
                    {props.recipe.Ingredients.map((ingredient, index) => (
                      <ListItem key={index}>
                        {ingredient.Quantity}{' '}{ingredient.Unit}{' '}{ingredient.Ingredient}
                      </ListItem>
                    ))}
                    <Hidden smUp>
                      <Divider />
                    </Hidden>
                  </List>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Box mt={1}>
                    <Typography variant="h5" align="left">Instructions</Typography>
                  </Box>
                  <List>
                    {props.recipe.Instructions.map((instruction, index) => (
                      <ListItem key={index}>
                        {instruction}
                      </ListItem>
                    ))}
                  </List>
                </Grid> 
              </Grid>
            </CardContent>
          </Card>
      </DialogContent>
    </Dialog>
  )
}
