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

  return (
    <List>
      {props.ingredients.map((ingredient, index) => (
        <Box mb={2} display="flex" alignItems="center" key={index}>
          <IconButton
            aria-label="remove ingredient" 
            onClick={() => props.handleRemoveIngredient(index)}
          >
            <CloseIcon />
          </IconButton>
          <TextField
            placeholder="Qty"
            size="small"
            className={classes.qty}
            value={ingredient.Quantity}
            onChange={e => props.handleChangeIngredient('Quantity', index, e.target.value)}
          />
          <TextField
            placeholder="Unit"
            size="small"
            select
            className={classes.type}
            value={ingredient.Unit}
            onChange={e => props.handleChangeIngredient('Unit', index, e.target.value)}
          >
            {props.units.map(unit => (
              <MenuItem key={unit} value={unit}>{unit}</MenuItem>
            ))}
          </TextField>
          <TextField
            placeholder="Ingredient"
            size="small"
            value={ingredient.Ingredient}
            onChange={e => props.handleChangeIngredient('Ingredient', index, e.target.value)}
          />
        </Box>
      ))}
    </List>
  )
}
