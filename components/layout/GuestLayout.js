import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    height: '100vh',
    margin: 0,
    padding: 0,
  }
})

export default function GuestLayout({children}) {
  const classes = useStyles()
  return (
    <Grid
      container
      spacing={0}
      align="center"
      justify="center"
      direction="column"
      className={classes.root}
    >
      <Grid item>
        {children}
      </Grid>
    </Grid>
  )
}
