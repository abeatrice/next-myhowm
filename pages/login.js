import React, {useState} from 'react'
import {userRouter} from 'next/router'
import GuestLayout from '../components/GuestLayout'
import NextLink from 'next/link'
import {makeStyles} from '@material-ui/core/styles'
import {TextField, Typography, Button, Grid, Box} from '@material-ui/core'
import {authenticate} from '../utils/auth'
import {Cookies} from 'react-cookie'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  paper: {
    width: theme.spacing(45),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(10),
    }
  },
  form: {
    width: '100%',
    padding: theme.spacing(0, 3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  signup: {
    cursor: 'pointer',
    color: theme.palette.primary,
    '&:hover': {
      color: theme.palette.secondary,
    },
  }
}))

function Page() {
  const classes = useStyles()
  const [UserName, setUserName] = useState('')
  const [Password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    axios.post('http://127.0.0.1:3000/users/login', {UserName, Password})
      .then(function(response) {
        console.log(response)
        // router.push('/')
      })
      .catch(function(error) {
        setError(error.response.data.message)
      })

  }

  return (
    <GuestLayout>
      <div className={classes.paper} elevation={3}>
        <Typography component="h1" variant="h5">
          MyHowm
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField 
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="UserName"
            label="User Name"
            name="UserName"
            autoComplete="username"
            autoFocus
            value={UserName}
            onInput={e => setUserName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Password"
            label="Password"
            type="Password"
            id="Password"
            autoComplete="current-password"
            value={Password}
            onInput={e => setPassword(e.target.value)}
          />
          <Button 
            type="submit" 
            fullWidth 
            variant="contained"
            color="primary" 
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <NextLink href="/register">
                <Typography variant="body2" color="primary" align="right" className={classes.signup}>
                  Don't have an account? Sign Up
                </Typography>
              </NextLink>
            </Grid>
          </Grid>
        </form>
      </div>
      {/* copyright */}
      <Box mt={8}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <NextLink color="inherit" href="/">
            MyHowm
          </NextLink>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Box>
    </GuestLayout>
  );
}

export async function getServerSideProps(context) {
  await authenticate(context)

  return {
    props: {},
  }
}

export default Page
