import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Card, CardContent, Typography} from '@material-ui/core'
import {Dialog, DialogTitle, DialogContent, Slide, IconButton, Button, TextField} from '@material-ui/core'
import {Grid, List, ListItem, Divider, Hidden, Box} from '@material-ui/core'
import {DropzoneArea} from 'material-ui-dropzone'
import CloseIcon from '@material-ui/icons/Close'
import SaveIcon from '@material-ui/icons/Save'
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
  dropZone: {
    height: 300,
    backgroundColor: theme.palette.action.hover
  },
  dialogTitle: {
    backgroundColor: theme.palette.info.main,
    margin: 0,
    padding: theme.spacing(2)
  },
  formTitle: {
    margin: 0,
    padding: 0,
    width: '50ch'
  },
  dialogContent: {
    margin: 0,
    padding: 0,
  },
  formButtons: {
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(0, 1),
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
  const [title, setTitle] = React.useState('')
  const [file, setFile] = React.useState(null)

  const handleOpen = () => {setOpen(true)}
  const handleClose = () => {setOpen(false)}
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(file)
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Card className={classes.root} onClick={handleOpen} variant="outlined">
        <Box className={classes.content} display="flex" justifyContent="center" alignItems="center">
          <IconButton aria-label="add recipe">
            <AddIcon />
          </IconButton>
        </Box>
      </Card>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <DialogTitle className={classes.dialogTitle} disableTypography>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <TextField 
              label="Recipe Name" 
              size="small"
              variant="outlined"
              autoFocus
              className={classes.formTitle}
              value={title}
              onChange={e => setTitle(e.target.value)}
              />
            <div>
              <Button 
                type="submit" 
                variant="contained"
                color="primary"
                disableElevation
                startIcon={<SaveIcon />}
                className={classes.button}
                onClick={handleSubmit}
                >
                Save
              </Button>
              <Button 
                variant="contained"
                color="secondary" 
                disableElevation
                startIcon={<CloseIcon />}
                className={classes.button}
                onClick={handleClose}
                >
                Nevermind
              </Button>
            </div>
          </Box>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
            <Card elevation={0} className={classes.recipeDetailCard}>
              <DropzoneArea 
                 acceptedFiles={['image/*']}
                 dropzoneText={"Drag and drop an image here or click"}
                 dropzoneClass={classes.dropZone}
                 onChange={files => setFile(files[0])}
                 className={classes.dropZone}
                 filesLimit={1}
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
    </form>
  )
}
