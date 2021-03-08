import React from 'react'
import NextLink from 'next/link'
import {Typography, Button, Grid, Box, FormControl, FormHelperText} from '@material-ui/core'

export default function AuthForm(props) {
  return (
    <Box width={350}>
      <Typography component="h1" variant="h5" align="center">
        MyHowm
      </Typography>
      <form onSubmit={props.onSubmit}>
        {props.children}
        <FormControl error={props.helperText.length !== 0}>
          <FormHelperText>{props.helperText}</FormHelperText>
        </FormControl>
        <Box my={2}>
          <Button 
            type="submit" 
            fullWidth 
            variant="contained"
            color="primary"
            disabled={props.disabled}
          >
            {props.submitText}
          </Button>
        </Box>
        <Grid container justify="flex-end">
          <Grid item>
            <NextLink href={props.linkHref}>
              <Button color="secondary" size="small" disableRipple>
                <Typography variant="button" color="primary">
                  {props.linkText}
                </Typography>
              </Button>
            </NextLink>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}
