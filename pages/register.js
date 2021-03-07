import React, {useState} from 'react'
import {useRouter} from 'next/router'
import {Cookies} from 'react-cookie'
import NextLink from 'next/link'
import axios from 'axios'
import {makeStyles} from '@material-ui/core/styles'
import {TextField, Typography, Button, Grid, Box, FormControl, FormHelperText} from '@material-ui/core'
import {authenticate} from '../utils/auth'
import GuestLayout from '../components/layout/GuestLayout'
import Copyright from '../components/utils/Copyright'

const useStyles = makeStyles((theme) => ({
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
  const router = useRouter()
  const cookies = new Cookies()
  const [UserName, setUserName] = useState('')
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [UserNameError, setUserNameError] = useState(false)
  const [EmailError, setEmailError] = useState(false)
  const [PasswordError, setPasswordError] = useState(false)
  const [helperText, setHelperText] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    axios.post('http://127.0.0.1:3000/users/register', {UserName, Email, Password})
      .then(res => {
        const token = res.data.data.Token
        cookies.set('token', token)
        router.push('/home')
      })
      .catch(err => {
        let msg = err.response.data.message
        if (msg.includes("UserName")) {
          setUserNameError(true)
        } else if (msg.includes("Email")) {
          setEmailError(true)
        } else if (msg.includes("Password")) {
          setPasswordError(true)
        } else {
          setEmailError(true)
          setUserNameError(true)
          setPasswordError(true)
        }
        setHelperText(msg)
      })
  }

  return (
    <GuestLayout>
      <Box width={350}>
        <Typography component="h1" variant="h5" align="center">
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
            error={UserNameError}
            onInput={e => {setUserName(e.target.value); setHelperText(''); setUserNameError(false);}}
          />
          <TextField 
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Email"
            label="Email Address"
            name="Email"
            autoComplete="email"
            value={Email}
            error={EmailError}
            onInput={e => {setEmail(e.target.value); setHelperText(''); setEmailError(false);}}
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
            error={PasswordError}
            onInput={e => {setPassword(e.target.value); setHelperText(''); setPasswordError(false);}}
          />
          <FormControl error={PasswordError || UserNameError || EmailError}>
            <FormHelperText>{helperText}</FormHelperText>
          </FormControl>
          <Button 
            type="submit" 
            fullWidth 
            variant="contained"
            color="primary" 
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <NextLink href="/login">
                <Typography variant="body2" color="primary" align="right" className={classes.signup}>
                  Already have an account? Sign In
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
