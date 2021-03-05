import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {AppBar, Toolbar, Typography, IconButton} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import NextLink from 'next/link'
import AppDrawer from './AppDrawer'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer',
  }
}))

export default function MenuAppBar() {
  const classes = useStyles()
  const [drawerOpen, setDrawerOpen] = React.useState(false)

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
            onClick={() => setDrawerOpen(true)}
            edge="start"
          >
            <Menu />
          </IconButton>
          <AppDrawer 
            open={drawerOpen}
            setDrawerOpen={setDrawerOpen}
          />
        </Toolbar>
      </AppBar>
    </div>
  )
}
