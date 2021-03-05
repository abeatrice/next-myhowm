import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {IconButton, TextField, List, Box, MenuItem} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
  qty: {
    width: '4ch',
  },
  type: {
    width: '10ch',
    margin: theme.spacing(0, 2)
  },
}))

export default function IngredientList(props) {
  const classes = useStyles()

  const handleChangeIngredient = (key, pos, value) => {
    const ingredients = [...props.ingredients].map((ingredient, index) => {
      if(index === pos) {
        let newIngredient = {...ingredient}
        newIngredient[key] = value
        return newIngredient
      } else {
        return ingredient
      }
    })
    
    props.setIngredients(ingredients)
  }
  
  const handleRemoveIngredient = index => {
    const ingredients = props.ingredients.length === 1 
      ? props.emptyIngredients
      : props.ingredients.filter((_, pos) => pos !== index)

    props.setIngredients(ingredients)
  }

  return (
    <List>
      {props.ingredients.map((ingredient, index) => (
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
            className={classes.qty}
            value={ingredient.Quantity}
            onChange={e => handleChangeIngredient('Quantity', index, e.target.value)}
          />
          <TextField
            placeholder="Unit"
            size="small"
            select
            className={classes.type}
            value={ingredient.Unit}
            onChange={e => handleChangeIngredient('Unit', index, e.target.value)}
          >
            {props.units.map(unit => (
              <MenuItem key={unit} value={unit}>{unit}</MenuItem>
            ))}
          </TextField>
          <TextField
            placeholder="Ingredient"
            size="small"
            value={ingredient.Ingredient}
            onChange={e => handleChangeIngredient('Ingredient', index, e.target.value)}
          />
        </Box>
      ))}
    </List>
  )
}
