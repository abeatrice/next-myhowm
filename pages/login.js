import React, {useState} from 'react'
import {Cookies} from 'react-cookie'
import {useRouter} from 'next/router'
import NextLink from 'next/link'
import axios from 'axios'
import {makeStyles} from '@material-ui/core/styles'
import {TextField, Typography, Button, Grid, Box, FormControl, FormHelperText} from '@material-ui/core'
import GuestLayout from '../components/layout/GuestLayout'
import {authenticate} from '../utils/auth'

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
  }
}))

function Page() {
  const classes = useStyles()
  const [UserName, setUserName] = useState('')
  const [Password, setPassword] = useState('')
  const [userNameError, setUserNameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [helperText, setHelperText] = useState('')
  const cookies = new Cookies()
  const router = useRouter()

  const onSubmit = (event) => {
    event.preventDefault()
    axios.post('http://127.0.0.1:3000/users/login', {UserName, Password})
      .then(function(response) {
        const token = response.data.data.Token;
        cookies.set('token', token);
        router.push('/home')
      })
      .catch(function(error) {
        let msg = error.response.data.message
        if (msg.includes("UserName")) {
          setUserNameError(true)
        } else if (msg.includes("Password")) {
          setPasswordError(true)
        } else {
          setUserNameError(true)
          setPasswordError(true)
        }
        setHelperText(msg)
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
            error={userNameError}
            onInput={e => {setUserName(e.target.value); setUserNameError(false); setHelperText('')}}
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
            error={passwordError}
            onInput={e => {setPassword(e.target.value); setPasswordError(false); setHelperText('')}}
          />
          <FormControl error={passwordError || userNameError}>
            <FormHelperText>{helperText}</FormHelperText>
          </FormControl>
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
