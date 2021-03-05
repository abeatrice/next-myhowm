import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {Grid, Box, Typography} from '@material-ui/core'
import KitchenIcon from '@material-ui/icons/Kitchen'
import {makeStyles} from '@material-ui/core/styles'
import AuthLayout from '../components/layout/AuthLayout'
import {authenticate} from '../utils/auth'
import Loading from '../components/utils/Loading'

const useStyles = makeStyles((theme) => ({
  link: {
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.action.disabled
    }
  }
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
        <Loading open={loading} />
    </AuthLayout>
  );
}

export async function getServerSideProps(context) {
  await authenticate(context)
  return {props: {}}
}
