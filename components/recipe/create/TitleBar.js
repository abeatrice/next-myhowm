import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {DialogTitle, Button, TextField, Box} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import SaveIcon from '@material-ui/icons/Save'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.info.main,
    margin: 0,
    padding: theme.spacing(2)
  },
  title: {
    margin: 0,
    padding: 0,
    width: '50ch'
  },
  button: {
    margin: theme.spacing(0, 1),
  },
}))


export default function FormDialog(props) {
  const classes = useStyles()
  
  return (
    <DialogTitle className={classes.root} disableTypography>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <TextField 
          label="Recipe Name" 
          size="small"
          variant="outlined"
          autoFocus
          className={classes.title}
          value={props.title}
          onChange={e => props.handleTitleChange(e.target.value)}
        />
        <div>
          <Button 
            type="submit" 
            variant="contained"
            color="primary"
            disableElevation
            startIcon={<SaveIcon />}
            className={classes.button}
            onClick={props.handleFormSubmit}
          >
            Save
          </Button>
          <Button 
            variant="contained"
            color="secondary" 
            disableElevation
            startIcon={<CloseIcon />}
            className={classes.button}
            onClick={props.handleClose}
          >
            Nevermind
          </Button>
        </div>
      </Box>
    </DialogTitle>
  )
}
