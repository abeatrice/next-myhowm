import React from 'react'
import {useRouter} from 'next/router'
import axios from 'axios'
import {Cookies} from 'react-cookie'
import {makeStyles} from '@material-ui/core/styles'
import {AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Grid, Box} from '@material-ui/core'
import {Menu, Lock, Kitchen} from '@material-ui/icons'
import NextLink from 'next/link'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer',
  },
  list: {
    width: 250,
  }
}))

export default function MenuAppBar() {
  const classes = useStyles()
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => setOpen(true)
  const handleDrawerClose = () => setOpen(false)

  const onSubmit = (event) => {
    event.preventDefault()
    const cookies = new Cookies()
    const token = cookies.get('token')
    axios.post('http://127.0.0.1:3000/users/logout', {}, { headers: { 'Authorization': 'Bearer ' + token } })
      .then(function() {
        cookies.remove('token')
        router.push('/login')
      })
      .catch(function(error) {
        console.log(error)
      })
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <NextLink href="/home">
            <Typography variant="h6" className={classes.title}>
              MyHowm
            </Typography>
          </NextLink>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            <Menu />
          </IconButton>
          <Drawer
            open={open}
            anchor="right"
            onClose={handleDrawerClose}
            onKeyDown={handleDrawerClose}
          >
            <List className={classes.list}>
              <Box mx={3} mb={1}>
                <Grid container alignItems="center" justify="space-between">
                  <Grid item>
                    <NextLink href="/home">
                      <Typography variant="h6" className={classes.title}>
                        MyHowm
                      </Typography>
                    </NextLink>
                  </Grid>
                  <Grid item>
                    <IconButton
                        aria-label="close drawer"
                        onClick={handleDrawerClose}
                        >
                        <Menu />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
              <Divider />
              <NextLink href="/recipes">
                <ListItem button>
                    <ListItemIcon><Kitchen /></ListItemIcon>
                    <ListItemText primary="Recipes" />
                </ListItem>
              </NextLink>
              <Divider />
              <ListItem button onClick={onSubmit}>
                  <ListItemIcon>
                    <Lock />
                  </ListItemIcon>
                  <form noValidate onSubmit={onSubmit}>
                    <ListItemText primary="Sign Out" />
                  </form>
              </ListItem>
            </List>
          </Drawer>
        </Toolbar>
      </AppBar>
    </div>
  )
}
