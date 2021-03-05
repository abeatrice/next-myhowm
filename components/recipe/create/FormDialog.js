import React from 'react'
import axios from 'axios'
import {Cookies} from 'react-cookie'
import NProgress from 'nprogress'
import {makeStyles} from '@material-ui/core/styles'
import {Card, CardContent, Typography, Grid, Box} from '@material-ui/core'
import {Dialog, DialogContent, Slide, Button, TextField} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import TitleBar from './TitleBar'
import IngredientList from './IngredientList'
import InstructionsList from './InstructionsList'
import DropZone from './DropZone'

const useStyles = makeStyles(() => ({
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
  const emptyIngredients = [{Quantity: '', Unit: Units[0], Ingredient: ''}]
  const [RecipeName, setRecipeName] = React.useState('')
  const [Description, setDescription] = React.useState('')
  const [Instructions, setInstructions] = React.useState([''])
  const [Ingredients, setIngredients] = React.useState(emptyIngredients)
  const [file, setFile] = React.useState(null)
  const [uploadImgUrl, setUploadImgUrl] = React.useState('')

  const cookies = new Cookies()
  const token = cookies.get('token')
  const axiosConfig = {headers: {'Authorization': 'Bearer ' + token}}
  const serverUrl = 'http://127.0.0.1:3000/recipes'

  const resetForm = () => {
    setRecipeName('')
    setFile(null)
    setUploadImgUrl('')
    setDescription('')
    setInstructions([''])
    setIngredients(emptyIngredients)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    NProgress.start()
    
    axios.put(uploadImgUrl, file, {headers: {'Content-Type': file.type}})
    const ImgSrc = uploadImgUrl.split('?')[0]
    
    const formData = {
      RecipeName,
      Description,
      Instructions,
      Ingredients,
      ImgSrc
    }

    props.handleClose()
    
    axios.post(serverUrl, formData, axiosConfig)
      .then(function() {
        props.handleNewRecipe(formData)
        resetForm()
        NProgress.done()
      })
      .catch(function(error) {
        resetForm()
        NProgress.done()
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
          title={RecipeName}
          setRecipeName={setRecipeName}
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
                value={Description}
                onChange={e => setDescription(e.target.value)}
              />
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Box mt={1}>
                    <Typography variant="h5" align="left">Ingredients</Typography>
                  </Box>
                  <Box mt={1} pl={1} display="flex" justifyContent="flex-start" alignItems="center">
                    <Button startIcon={<AddIcon />} onClick={() => setIngredients([...Ingredients, emptyIngredients[0]])}>Add Ingredient</Button>
                  </Box>
                  <IngredientList 
                    ingredients={Ingredients}
                    units={Units}
                    setIngredients={setIngredients}
                    emptyIngredients={emptyIngredients}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Box mt={1}>
                    <Typography variant="h5" align="left">Instructions</Typography>
                  </Box>
                  <Box mt={1} pl={1} display="flex" justifyContent="flex-start" alignItems="center">
                    <Button startIcon={<AddIcon />} onClick={() => setInstructions([...Instructions, ''])}>Add Step</Button>
                  </Box>
                  <InstructionsList 
                    instructions={Instructions} 
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
