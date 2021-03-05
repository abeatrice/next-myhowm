import React from 'react'
import {Cookies} from 'react-cookie'
import {useRouter} from 'next/router'
import NextLink from 'next/link'
import axios from 'axios'
import {makeStyles} from '@material-ui/core/styles'
import {Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Grid, Box} from '@material-ui/core'
import {Menu, Lock, Kitchen} from '@material-ui/icons'

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
    cursor: 'pointer',
  },
  list: {
    width: 250,
  }
}))

const serverUrl = 'http://127.0.0.1:3000/users/logout'
const cookies = new Cookies()
const token = cookies.get('token')
const axiosConfig = { headers: { 'Authorization': 'Bearer ' + token } }

export default function AppDrawer(props) {
  const classes = useStyles()
  const router = useRouter()

  const handleClose = () => props.setDrawerOpen(false)

  const logOut = (event) => {
    event.preventDefault()
    handleClose()
    axios.post(serverUrl, {}, axiosConfig)
      .then(function() {
        cookies.remove('token')
        router.push('/login')
      })
      .catch(function(error) {
        console.log(error)
        cookies.remove('token')
        router.push('/login')
      })
  };

  return (
    <Drawer
      open={props.open}
      anchor="right"
      onClose={handleClose}
      onKeyDown={handleClose}
    >
      <List className={classes.list}>
        <Box mx={3} mb={1}>
          <Grid container alignItems="center" justify="space-between">
            <Grid item onClick={handleClose}>
              <NextLink href="/home">
                <Typography variant="h6" className={classes.title}>
                  MyHowm
                </Typography>
              </NextLink>
            </Grid>
            <Grid item>
              <IconButton
                aria-label="close drawer"
                onClick={handleClose}
              >
                <Menu />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <NextLink href="/recipes">
          <ListItem button onClick={handleClose}>
              <ListItemIcon><Kitchen /></ListItemIcon>
              <ListItemText primary="Recipes" />
          </ListItem>
        </NextLink>
        <Divider />
        <ListItem button onClick={logOut}>
            <ListItemIcon>
              <Lock />
            </ListItemIcon>
            <form noValidate onSubmit={logOut}>
              <ListItemText primary="Sign Out" />
            </form>
        </ListItem>
      </List>
    </Drawer>
  )
}
