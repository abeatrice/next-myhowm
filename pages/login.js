import React, {useEffect, useState} from 'react'
import {Cookies} from 'react-cookie'
import {useRouter} from 'next/router'
import axios from 'axios'
import NProgress from 'nprogress'
import {TextField} from '@material-ui/core'
import GuestLayout from '../components/layout/GuestLayout'
import {authenticate} from '../utils/auth'
import AuthForm from '../components/auth/AuthForm'

const serverUrl = 'http://127.0.0.1:3000'

function Page() {
  const cookies = new Cookies()
  const router = useRouter()
  const [submitDisabled, setSubmitDisabled] = useState(false)
  const [form, setForm] = useState({
    UserName: '',
    Password: ''
  })
  const [errors, setErrors] = useState({
    UserName: '',
    Password: '',
    General: ''
  })

  useEffect(() => {
    const disabled = (errors.UserName.length > 0 || errors.Password.length > 0)
    setSubmitDisabled(disabled)
  })

  const onUserNameInput = (value) => {
    setForm({...form, UserName: value})
    
    let helperText = ''
    const alphaNumeric = /[^a-zA-Z0-9]/g
    if(value.trim().length === 0) {
      helperText = 'User Name can not be empty'
    } else if (alphaNumeric.test(value)) {
      helperText = 'User Name can only be numbers and/or letters'
    } else if (value.trim().length > 20) {
      helperText = 'User Name can not be longer than 20 characters'
    } else {
      helperText = ''
    }

    setErrors({...errors, UserName: helperText})
  }

  const onPasswordInput = (value) => {
    setForm({...form, Password: value})
    
    let helperText = ''
    if(value.trim().length === 0) {
      helperText = 'Password can not be empty'
    } else if (value.trim().length > 20) {
      helperText = 'Password can not be longer than 20 characters'
    } else {
      helperText = ''
    }

    setErrors({...errors, Password: helperText})
  }

  const onSubmit = (event) => {
    event.preventDefault()
    NProgress.start()
    setSubmitDisabled(true)
    axios.post(`${serverUrl}/users/login`, form)
      .then(function(response) {
        cookies.set('token', response.data.data.Token)
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
      <AuthForm 
        onSubmit={onSubmit}
        helperText={errors.General}
        disabled={submitDisabled}
        submitText='Sign in'
        linkHref='/register'
        linkText="Don't have an account? Sign Up"
      >
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
          value={form.UserName}
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
          value={form.Password}
          error={errors.Password.length !== 0}
          onInput={e => onPasswordInput(e.target.value)}
          helperText={errors.Password}
        />
      </AuthForm>
    </GuestLayout>
  )
}

export async function getServerSideProps(context) {
  await authenticate(context)
  return {props: {}}
}

export default Page
