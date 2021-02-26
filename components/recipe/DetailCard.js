import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Card, CardContent, CardMedia, Typography} from '@material-ui/core'
import {Dialog, DialogTitle, DialogContent, Slide, IconButton} from '@material-ui/core'
import {Grid, List, ListItem, Divider, Hidden} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

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
  },
  largeMedia: {
    height: 300,
  },
  dialogTitle: {
    backgroundColor: theme.palette.primary.main,
    margin: 0,
    padding: theme.spacing(2)
  },
  dialogContent: {
    margin: 0,
    padding: 0,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(3),
    top: theme.spacing(1),
  },
  recipeDetailCard: {
    borderRadius: 0,
  }
}))

const Transition = React.forwardRef(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
  }
)

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
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <DialogTitle className={classes.dialogTitle}>
          <Typography component="h2" variant="h5">{props.recipe.RecipeName}</Typography>
          <IconButton className={classes.closeButton} onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
            <Card elevation={0} className={classes.recipeDetailCard}>
              <CardMedia
                className={classes.largeMedia}
                image={props.recipe.ImgSrc}
                title={props.recipe.RecipeName}
              />
              <CardContent>
                <Typography component="p" variant="body1" align="left" color="textSecondary">
                  {props.recipe.Description}
                </Typography>
                <Grid container align="center" spacing={3}>
                  <Grid item xs={12} sm={4} md={3}>
                    <List>
                      <Hidden smUp>
                        <Divider />
                      </Hidden>
                      {
                        Object.entries(props.recipe.Ingredients).map(([ingredient, quantity]) => {
                          return (
                            <ListItem key={ingredient}>
                              {quantity}{' '}{ingredient}
                            </ListItem>
                          )
                        })
                      }
                      <Hidden smUp>
                        <Divider />
                      </Hidden>
                    </List>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <List>
                      {
                        props.recipe.Instructions.map((instruction, index) => {
                          return (
                            <ListItem key={index}>
                              {instruction}
                            </ListItem>
                          )
                        })
                      }
                    </List>
                  </Grid> 
                </Grid>
              </CardContent>
            </Card>
        </DialogContent>
      </Dialog>
    </>
  )
}
