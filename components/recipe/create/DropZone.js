import React from 'react'
import axios from 'axios'
import {Cookies} from 'react-cookie'
import {makeStyles} from '@material-ui/core/styles'
import {DropzoneArea} from 'material-ui-dropzone'

const useStyles = makeStyles((theme) => ({
  root: {
    height: 300,
    backgroundColor: theme.palette.action.hover
  }
}))

export default function DropZone(props) {
  const classes = useStyles()

  const handleFileChange = async (file) => {
    if(!file) {
      props.setFile(null)
      props.setUploadImgUrl('')
      return
    }
    
    props.setFile(file)
    const response = await axios.get(`${props.serverUrl}/ImageUploadUrl`, {
      ...props.axiosConfig,
      params: {
        name: file.name,
        type: file.type,
      }
    })
    props.setUploadImgUrl(response.data.signedUrl)
  }

  return (
    <DropzoneArea 
        className={classes.root}
        dropzoneClass={classes.root}
        acceptedFiles={['image/*']}
        dropzoneText={"Drag and drop an image here or click"}
        onChange={([file]) => handleFileChange(file)}
        filesLimit={1}
    />
  )
}
