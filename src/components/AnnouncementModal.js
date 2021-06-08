import React from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  bodyText: {
    color: "#dedede",
  },
}))

export default function AlertDialog({ open, handleClose }) {
  const classes = useStyles()

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <React.Fragment>
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h4" color="primary">
            Cloudflare 1020
          </Typography>
        </DialogTitle>
        <DialogContent style={{ paddingTop: "24px" }}>
          <Typography className={classes.bodyText} variant="body2" gutterBottom>
            Hello everybody,
          </Typography>
          <Typography className={classes.bodyText} variant="body2" gutterBottom>
            If you are getting the Cloudflare 1020 error you can use our
            secondary links instead.
          </Typography>
          <a href="https://waxemist.vercel.app">
            <Typography
              style={{ fontWeight: 700 }}
              variant="body2"
              color="secondary"
              gutterBottom
            >
              Link 1
            </Typography>{" "}
          </a>
          <a href="https://waxemist.netlify.app">
            <Typography
              style={{ fontWeight: 700 }}
              variant="body2"
              color="secondary"
              gutterBottom
            >
              Link 2
            </Typography>{" "}
          </a>

          <Typography className={classes.bodyText} variant="body2" gutterBottom>
            Regards,
          </Typography>
          <Typography className={classes.bodyText} variant="body2" gutterBottom>
            Loot.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </React.Fragment>
    </Dialog>
  )
}
