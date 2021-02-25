import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Card, CardContent, CardMedia, Typography} from '@material-ui/core'
import {Dialog, DialogTitle, DialogContent, Slide, IconButton} from '@material-ui/core'
import {Grid, List, ListItem, Divider, Hidden, Box} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 300,
    maxWidth: 300,
    minHeight: 300,
    maxHeight: 300,
    cursor: 'pointer',
    backgroundColor: theme.palette.background.default,
    '&:hover': {
      backgroundColor: theme.palette.action.selected
    }
  },
  content: {
    margin: 0,
    padding: 0,
    width: 300,
    height: 300,
  },
  largeMedia: {
    height: 300,
    backgroundColor: theme.palette.action.hover
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

export default function RecipeCard() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  
  const handleOpen = () => {setOpen(true)}
  const handleClose = () => {setOpen(false)}

  return (
    <>
      <Card className={classes.root} onClick={handleOpen} variant="outlined">
        <Box className={classes.content} display="flex" justifyContent="center" alignItems="center">
          <IconButton aria-label="add recipe">
            <AddIcon />
          </IconButton>
        </Box>
      </Card>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <DialogTitle className={classes.dialogTitle}>
          <Typography component="h2" variant="h5">Recipe Name</Typography>
          <IconButton className={classes.closeButton} onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
            <Card elevation={0} className={classes.recipeDetailCard}>
              <CardMedia
                className={classes.largeMedia}
                title="Recipe Name"
              />
              <CardContent>
                <Typography component="p" variant="body1" align="left" color="textSecondary">
                  Recipe Description
                </Typography>
                <Grid container align="center" spacing={3}>
                  <Grid item xs={12} sm={4} md={3}>
                    <List>
                      <Hidden smUp>
                        <Divider />
                      </Hidden>
                      <ListItem>
                        quantity ingredient
                      </ListItem>
                      <Hidden smUp>
                        <Divider />
                      </Hidden>
                    </List>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <List>
                      <ListItem>
                        instruction
                      </ListItem>
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
