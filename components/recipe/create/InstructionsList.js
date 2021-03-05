import React from 'react'
import {IconButton, TextField, List, Box} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

export default function InstructionsList(props) {

  const handleRemoveInstruction = (index) => {
    const instructions = props.instructions.length === 1 ? ['']
      : props.instructions.filter((_, pos) => pos !== index)

    props.setInstructions(instructions)
  }
  
  const handleChangeInstruction = (pos, value) => {
    const newInstructions = [...props.instructions].map((instruction, index) => {
      return (index === pos) ? value : instruction
    })
    
    props.setInstructions(newInstructions)
  }

  return (
    <List>
      {props.instructions.map((instruction, index) => (
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
  )
}
