import React from 'react'
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
  return (
    <GuestLayout>
      <div className={classes.paper} elevation={3}>
        <Typography component="h1" variant="h5">
          MyHowm
        </Typography>
        <form className={classes.form} noValidate>
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
          />
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
