import React from 'react'
import {useRouter} from 'next/router'
import axios from 'axios'
import {Cookies} from 'react-cookie'
import {makeStyles, withStyles} from '@material-ui/core/styles'
import {AppBar, Toolbar, Typography, IconButton, Menu, MenuList, MenuItem} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import NextLink from 'next/link'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.light,
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer',
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.text.secondary,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  }
}))

const StyledMenu = withStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.default,
  }
}))((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))

const StyledMenuItem = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    '&:hover': {
      backgroundColor: theme.palette.background.light
    }
  }
}))(MenuItem)

export default function MenuAppBar() {
  const classes = useStyles()
  const [auth, setAuth] = React.useState(true)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const router = useRouter()

  const onSubmit = (event) => {
    event.preventDefault()
    const cookies = new Cookies()
    const token = cookies.get('token')
    axios.post('http://127.0.0.1:3000/users/logout', {}, { headers: { 'Authorization': 'Bearer ' + token } })
      .then(function(response) {
        cookies.remove('token')
        router.push('/login')
      })
      .catch(function(error) {
        console.log(error)
      })
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <NextLink href="/">
            <Typography variant="h6" className={classes.title}>
              MyHowm
            </Typography>
          </NextLink>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <StyledMenu
                id="menu-appbar"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
              >
                <StyledMenuItem>
                  <NextLink href="/recipes">
                    <Typography variant="h6">
                      Recipes
                    </Typography>
                  </NextLink>
                </StyledMenuItem>
                <StyledMenuItem>
                  <form noValidate onSubmit={onSubmit}>
                    <Typography variant="h6" onClick={onSubmit}>
                      Sign Out
                    </Typography>
                  </form>
                </StyledMenuItem>
              </StyledMenu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
