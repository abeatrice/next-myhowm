import React from 'react'
import axios from 'axios'
import {Cookies} from 'react-cookie'
import {makeStyles} from '@material-ui/core/styles'
import {Card, CardContent, Typography} from '@material-ui/core'
import {Dialog, DialogContent, Slide, IconButton, Button, TextField} from '@material-ui/core'
import {Grid, List, Box, MenuItem} from '@material-ui/core'
import {DropzoneArea} from 'material-ui-dropzone'
import CloseIcon from '@material-ui/icons/Close'
import AddIcon from '@material-ui/icons/Add'

import TitleBar from './TitleBar'
import IngredientList from './IngredientList'

const useStyles = makeStyles((theme) => ({
  dropZone: {
    height: 300,
    backgroundColor: theme.palette.action.hover
  },
  formQty: {
    width: '4ch',
  },
  formQtyType: {
    width: '10ch',
    margin: theme.spacing(0, 2)
  },
  content: {
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
  card: {
    borderRadius: 0,
  },
  ingredientRoot: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400
  },
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

  const handleFileChange = async (file) => {
    if(file) {
      setFile(file)
      const response = await axios.get(`${serverUrl}/ImageUploadUrl`, {
        ...axiosConfig, 
        params: {
          name: file.name,
          type: file.type,
        }
      })
      setUploadImgUrl(response.data.signedUrl)
    } else {
      setFile(null)
      setUploadImgUrl('')
    }
  }

  const handleChangeIngredient = (key, pos, value) => {
    const newIngredients = [...ingredients].map((ingredient, index) => {
      if(index === pos) {
        let newIngredient = {...ingredient}
        newIngredient[key] = value
        return newIngredient
      } else {
        return ingredient
      }
    })
    
    setIngredients(newIngredients)
  }

  const handleAddIngredient = () => {
    let newArr = [...ingredients]
    newArr.push({Quantity:'', Unit:Units[0], Ingredient:''}) 
    setIngredients(newArr)
  }

  const handleRemoveIngredient = (index) => {
    if (ingredients.length === 1) {
      setIngredients([{Quantity:'', Unit:Units[0], Ingredient:''}])
    } else {
      let newIngredients = ingredients.filter((ingredient, pos) => pos !== index)
      setIngredients(newIngredients)
    }
  }

  const handleAddInstruction = () => {
    let newArr = [...instructions]
    newArr.push('')
    setInstructions(newArr)
  }

  const handleRemoveInstruction = (index) => {
    if (instructions.length === 1) {
      setInstructions([''])
    } else {
      let newInstructions = instructions.filter((instruction, pos) => pos !== index)
      setInstructions(newInstructions)
    }
  }
  
  const handleChangeInstruction = (pos, value) => {
    const newInstructions = [...instructions].map((step, index) => {
      if(index === pos) {
        return value
      } else {
        return step
      }
    })
    setInstructions(newInstructions)
  }

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

  const handleTitleChange = title => setTitle(title)

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
          handleTitleChange={handleTitleChange}
          handleFormSubmit={handleFormSubmit}
          handleClose={props.handleClose}
        />
        <DialogContent className={classes.content}>
          <Card elevation={0} className={classes.card}>
            <DropzoneArea 
                acceptedFiles={['image/*']}
                dropzoneText={"Drag and drop an image here or click"}
                dropzoneClass={classes.dropZone}
                onChange={([file]) => handleFileChange(file)}
                className={classes.dropZone}
                filesLimit={1}
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
                    <Button startIcon={<AddIcon />} onClick={handleAddIngredient}>Add Ingredient</Button>
                  </Box>
                  <IngredientList 
                    ingredients={ingredients}
                    units={Units}
                    handleRemoveIngredient={handleRemoveIngredient}
                    handleChangeIngredient={handleChangeIngredient}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Box mt={1}>
                    <Typography variant="h5" align="left">Instructions</Typography>
                  </Box>
                  <Box mt={1} pl={1} display="flex" justifyContent="flex-start" alignItems="center">
                    <Button startIcon={<AddIcon />} onClick={handleAddInstruction}>Add Step</Button>
                  </Box>
                  <List>
                    {instructions.map((instruction, index) => (
                      <Box pr={2} mb={2} display="flex" alignItems="center" key={index}>
                        <IconButton
                          aria-label="remove instruction" 
                          onClick={() => handleRemoveInstruction(index)}
                        >
                          <CloseIcon />
                        </IconButton>
                        <TextField 
                          label={"Step " + (index+1)}
                          size="small"
                          fullWidth
                          value={instruction}
                          onChange={e => handleChangeInstruction(index, e.target.value)}
                        />
                      </Box>
                    ))}
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
