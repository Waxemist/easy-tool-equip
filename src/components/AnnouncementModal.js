import React from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import Grid from "@material-ui/core/Grid"
import { CircularProgress, makeStyles } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import { setBag, wax } from "src/utils/wax"

const useStyles = makeStyles(theme => ({
  bodyText: {
    color: "#dedede",
  },
}))

export default function AlertDialog({ open, handleClose, selectedIds, mode }) {
  const classes = useStyles()
  const [loading, setLoading] = React.useState()
  const handleSend = async () => {
    try {
      setLoading(true)
      if (mode === "setbag") {
        const result = await setBag(selectedIds)
        setLoading(false)
        handleClose(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const Loading = () => {
    return (
      <Grid
        style={{ height: "300px" }}
        container
        direction="column"
        justify="center"
        align="center"
      >
        <Grid item>
          <CircularProgress />
        </Grid>
        <Grid item> Check WAX Cloud Wallet</Grid>
      </Grid>
    )
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      {loading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <DialogTitle id="alert-dialog-title">
            <Typography variant="h4" color="primary">
              {"Poll #1 Results"}
            </Typography>
          </DialogTitle>
          <DialogContent style={{ paddingTop: "24px" }}>
            <Typography
              className={classes.bodyText}
              variant="body2"
              gutterBottom
            >
              Hello everybody,
            </Typography>
            <Typography
              className={classes.bodyText}
              variant="body2"
              gutterBottom
            >
              It's been an incredible week for Waxemist, we already reached a 1k
              daily user base and the poll is a success with 148 votes.
            </Typography>
            <Typography
              className={classes.bodyText}
              variant="body2"
              gutterBottom
            >
              With 95.9% of the votes, we are happy to announce that{" "}
              <Typography
                style={{ fontWeight: 700 }}
                variant="body2"
                component="span"
                color="secondary"
              >
                Alien Worlds Land Setter
              </Typography>{" "}
              is going to be the new tool added to Waxemist.
            </Typography>
            <Typography
              className={classes.bodyText}
              variant="body2"
              gutterBottom
            >
              We also recieved support messages, thank very much for them, we
              are considering everything you have to say.
            </Typography>
            <Typography
              className={classes.bodyText}
              variant="body2"
              gutterBottom
            >
              Launch day will be announced this week.
            </Typography>
            <Typography
              className={classes.bodyText}
              variant="body2"
              gutterBottom
            >
              Regards,
            </Typography>
            <Typography
              className={classes.bodyText}
              variant="body2"
              gutterBottom
            >
              Loot.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
            <Button
              onClick={() =>
                window.open(
                  "https://docs.google.com/spreadsheets/d/1BkIbo2i9BlBAXC_X7LVFu9-MI06I_tpqEvT3phPvRUU/edit?usp=sharing"
                )
              }
              color="primary"
            >
              View Results
            </Button>
          </DialogActions>
        </React.Fragment>
      )}
    </Dialog>
  )
}
