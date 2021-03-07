import React, {useState} from 'react'
import {Cookies} from 'react-cookie'
import {useRouter} from 'next/router'
import NextLink from 'next/link'
import axios from 'axios'
import NProgress from 'nprogress'
import {makeStyles} from '@material-ui/core/styles'
import {TextField, Typography, Button, Grid, Box, FormControl, FormHelperText} from '@material-ui/core'
import GuestLayout from '../components/layout/GuestLayout'
import {authenticate} from '../utils/auth'
import Copyright from '../components/utils/Copyright'

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  signup: {
    cursor: 'pointer',
  }
}))

function Page() {
  const classes = useStyles()
  const cookies = new Cookies()
  const router = useRouter()
  const [UserName, setUserName] = useState('')
  const [Password, setPassword] = useState('')
  const [errors, setErrors] = useState({
    UserName: '',
    Password: '',
    General: ''
  })
  const [submitDisabled, setSubmitDisabled] = useState(false)

  const onUserNameInput = (value) => {
    let helperText = ''
    const alphaNumeric = /[^a-zA-Z0-9]/g
    setUserName(value)

    if(value.trim().length === 0) {
      helperText = 'User Name can not be empty'
    } else if (alphaNumeric.test(value)) {
      helperText = 'User Name can only be numbers and/or letters'
    } else if (value.trim().length > 20) {
      helperText = 'User Name can not be longer than 20 characters'
    } else {
      helperText = ''
    }

    if (helperText.length > 0) {
      setSubmitDisabled(true)
    } else {
      setSubmitDisabled(false)
    }

    setErrors({...errors, UserName: helperText})
  }

  const onPasswordInput = (value) => {
    setPassword(value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    NProgress.start()
    setSubmitDisabled(true)
    axios.post('http://127.0.0.1:3000/users/login', {UserName, Password})
      .then(function(response) {
        const token = response.data.data.Token;
        cookies.set('token', token);
        NProgress.done()
        router.push('/home')
      })
      .catch(function(error) {
        let msg = error.response.data.message
        if (msg.includes("UserName")) {
          setErrors({...errors, UserName: msg})
        } else if (msg.includes("Password")) {
          setErrors({...errors, Password: msg})
        } else {
          setErrors({...errors, General: msg})
        }
        setSubmitDisabled(false)
        NProgress.done()
      })
  }

  return (
    <GuestLayout>
      <Box width={350}>
        <Typography component="h1" variant="h5" align="center">
          MyHowm
        </Typography>
        <form onSubmit={onSubmit}>
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
            error={errors.UserName.length !== 0}
            onInput={e => onUserNameInput(e.target.value)}
            helperText={errors.UserName}
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
            error={errors.Password.length !== 0}
            onInput={e => onPasswordInput(e.target.value)}
          />
          <FormControl error={errors.General.length !== 0}>
            <FormHelperText>{errors.General}</FormHelperText>
          </FormControl>
          <Button 
            type="submit" 
            fullWidth 
            variant="contained"
            color="primary"
            disabled={submitDisabled}
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
      </Box>
      <Box mt={8}>
        <Copyright />
      </Box>
    </GuestLayout>
  );
}

export async function getServerSideProps(context) {
  await authenticate(context)
  return {props: {}}
}

export default Page
