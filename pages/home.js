import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {Grid, Box, Typography, Backdrop, CircularProgress} from '@material-ui/core'
import KitchenIcon from '@material-ui/icons/Kitchen'
import {makeStyles} from '@material-ui/core/styles'
import AuthLayout from '../components/AuthLayout'
import {authenticate} from '../utils/auth'

const useStyles = makeStyles((theme) => ({
  link: {
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.action.disabled
    }
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

export default function Page() {
  const classes = useStyles()
  const [loading, setLoading] = React.useState(false)

  return (
    <AuthLayout>
        <Head>
          <title>MyHowm - Time to relax...</title>
        </Head>
        <Grid container justify="center">
          <Link href="/recipes">
            <Box className={classes.link} onClick={() => setLoading(true)}>
              <Grid container direction="column" spacing={1} justify="center" alignItems="center">
                <Grid item>
                  <KitchenIcon style={{ fontSize: 60 }} />
                </Grid>
                <Grid item>
                  <Typography variant="h6">
                    Recipes
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Link>
        </Grid>
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
    </AuthLayout>
  );
}

export async function getServerSideProps(context) {
  await authenticate(context)
  return {props: {}}
}
