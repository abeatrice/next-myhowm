import React from 'react'
import axios from 'axios'
import {Cookies} from 'react-cookie'
import {makeStyles} from '@material-ui/core/styles'
import {Card, CardContent, Typography} from '@material-ui/core'
import {Dialog, DialogTitle, DialogContent, Slide, IconButton, Button, TextField} from '@material-ui/core'
import {Grid, List, Box, MenuItem} from '@material-ui/core'
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
  formQty: {
    width: '4ch',
  },
  formQtyType: {
    width: '10ch',
    margin: theme.spacing(0, 2)
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

export default function RecipeCard() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState('')
  const [file, setFile] = React.useState(null)
  const [uploadImgUrl, setUploadImgUrl] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [instructions, setInstructions] = React.useState([''])
  const [ingredients, setIngredients] = React.useState([
    {
      qty: '',
      unit: Units[0],
      ingredient: ''
    }
  ])

  const cookies = new Cookies()
  const token = cookies.get('token')
  const axiosConfig = {headers: {'Authorization': 'Bearer ' + token}}
  const serverUrl = 'http://127.0.0.1:3000/recipes'

  const handleOpen = () => {setOpen(true)}
  const handleClose = () => {setOpen(false)}

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
    newArr.push({qty:'',unit:Units[0],ingredient:''}) 
    setIngredients(newArr)
  }

  const handleRemoveIngredient = (index) => {
    if (ingredients.length === 1) {
      setIngredients([{qty:'',unit:Units[0],ingredient:''}])
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

  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await axios.put(uploadImgUrl, file, {headers: {'Content-Type': file.type}})
    const ImgSrc = uploadImgUrl.split('?')[0]
    
    const formData = {
      RecipeName: title,
      Description: description,
      ImgSrc: ImgSrc,
      Instructions: instructions,
      Ingredients: ingredients
    } 

    axios.post(url, formData, config)
      .then(function(response) {
        console.log(response)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  return (
    <form noValidate encType="multipart/form-data" onSubmit={handleSubmit}>
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
                  <List>
                    {ingredients.map((ingredient, index) => (
                      <Box mb={2} display="flex" alignItems="center" key={index}>
                        <IconButton
                          aria-label="remove ingredient" 
                          onClick={() => handleRemoveIngredient(index)}
                        >
                          <CloseIcon />
                        </IconButton>
                        <TextField
                          placeholder="Qty"
                          size="small"
                          className={classes.formQty}
                          value={ingredient.qty}
                          onChange={e => handleChangeIngredient('qty', index, e.target.value)}
                        />
                        <TextField
                          placeholder="Unit"
                          size="small"
                          select
                          className={classes.formQtyType}
                          value={ingredient.unit}
                          onChange={e => handleChangeIngredient('unit', index, e.target.value)}
                        >
                          {Units.map(unit => (
                            <MenuItem key={unit} value={unit}>{unit}</MenuItem>
                          ))}
                        </TextField>
                        <TextField
                          placeholder="Ingredient"
                          size="small"
                          value={ingredient.ingredient}
                          onChange={e => handleChangeIngredient('ingredient', index, e.target.value)}
                        />
                      </Box>
                    ))}
                  </List>
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
