import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Card, Box, IconButton} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import FormDialog from './FormDialog'

const useStyles = makeStyles((theme) => ({
  card: {
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
  box: {
    margin: 0,
    padding: 0,
    width: 300,
    height: 300,
  }
}))

export default function CreateCard(props) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Card className={classes.card} onClick={handleOpen} variant="outlined">
        <Box className={classes.box} display="flex" justifyContent="center" alignItems="center">
          <IconButton aria-label="add recipe">
            <AddIcon />
          </IconButton>
        </Box>
      </Card>
      <FormDialog 
        open={open}
        handleClose={handleClose}
        handleNewRecipe={props.handleNewRecipe}
      />
    </>
  )
}
