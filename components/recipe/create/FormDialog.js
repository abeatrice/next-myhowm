import React from 'react'
import axios from 'axios'
import {Cookies} from 'react-cookie'
import {makeStyles} from '@material-ui/core/styles'
import {Card, CardContent, Typography, Grid, Box} from '@material-ui/core'
import {Dialog, DialogContent, Slide, Button, TextField} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

import TitleBar from './TitleBar'
import IngredientList from './IngredientList'
import InstructionsList from './InstructionsList'
import DropZone from './DropZone'

const useStyles = makeStyles((theme) => ({
  content: {
    margin: 0,
    padding: 0,
  },
  card: {
    borderRadius: 0,
  }
}))

const Transition = React.forwardRef(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
  }
)

const Units = ['whole', 'tsp', 'tbsp', 'fl oz', 'cup(s)', 'lb(s)', 'oz', 'mg', 'g']

export default function FormDialog(props) {
  const classes = useStyles()
  const [title, setTitle] = React.useState('')
  const [file, setFile] = React.useState(null)
  const [uploadImgUrl, setUploadImgUrl] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [instructions, setInstructions] = React.useState([''])
  const [ingredients, setIngredients] = React.useState([
    {
      Quantity: '',
      Unit: Units[0],
      Ingredient: ''
    }
  ])

  const cookies = new Cookies()
  const token = cookies.get('token')
  const axiosConfig = {headers: {'Authorization': 'Bearer ' + token}}
  const serverUrl = 'http://127.0.0.1:3000/recipes'

  const handleFormSubmit = (event) => {
    event.preventDefault()
    
    axios.put(uploadImgUrl, file, {headers: {'Content-Type': file.type}})
    const ImgSrc = uploadImgUrl.split('?')[0]
    
    const formData = {
      RecipeName: title,
      Description: description,
      ImgSrc: ImgSrc,
      Instructions: instructions,
      Ingredients: ingredients
    }

    axios.post(serverUrl, formData, axiosConfig)
      .then(function(response) {
        props.handleNewRecipe(formData)
        props.handleClose()
        setTitle('')
        setFile(null)
        setUploadImgUrl('')
        setDescription('')
        setInstructions([''])
        setIngredients([{Quantity: '', Unit: Units[0],Ingredient: ''}])
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  return (
    <form noValidate encType="multipart/form-data" onSubmit={handleFormSubmit}>
      <Dialog 
        fullScreen 
        open={props.open} 
        onClose={props.handleClose} 
        TransitionComponent={Transition}
      >
        <TitleBar
          title={title}
          setTitle={setTitle}
          handleFormSubmit={handleFormSubmit}
          handleClose={props.handleClose}
        />
        <DialogContent className={classes.content}>
          <Card elevation={0} className={classes.card}>
            <DropZone 
              setFile={setFile} 
              setUploadImgUrl={setUploadImgUrl} 
              serverUrl={serverUrl}
              axiosConfig={axiosConfig}
            />
            <CardContent>
              <TextField
                label="Recipe Description"
                multiline
                rows={2}
                variant="outlined"
                fullWidth
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
              <Grid container align="center" spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Box mt={1}>
                    <Typography variant="h5" align="left">Ingredients</Typography>
                  </Box>
                  <Box mt={1} pl={1} display="flex" justifyContent="flex-start" alignItems="center">
                    <Button startIcon={<AddIcon />} onClick={() => setIngredients(
                      [...ingredients, {Quantity: '', Unit: Units[0], Ingredient: ''}]
                    )}>Add Ingredient</Button>
                  </Box>
                  <IngredientList 
                    ingredients={ingredients}
                    units={Units}
                    setIngredients={setIngredients}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Box mt={1}>
                    <Typography variant="h5" align="left">Instructions</Typography>
                  </Box>
                  <Box mt={1} pl={1} display="flex" justifyContent="flex-start" alignItems="center">
                    <Button startIcon={<AddIcon />} onClick={() => setInstructions([...instructions, ''])}>Add Step</Button>
                  </Box>
                  <InstructionsList 
                    instructions={instructions} 
                    setInstructions={setInstructions} 
                  />
                </Grid> 
              </Grid>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </form>
  )
}
