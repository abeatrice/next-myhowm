import React from 'react'
import {Typography} from '@material-ui/core'
import NextLink from 'next/link'

export default function Copyright() {
 return (
    <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <NextLink color="default" href="/">
        MyHowm
        </NextLink>{' '}
        {new Date().getFullYear()}
        {'.'}
    </Typography>
 )
}
