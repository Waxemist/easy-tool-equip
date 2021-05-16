import React from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import { makeStyles } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles(theme => ({
  bodyText: {
    color: "#dedede",
  },
}))

export default function AlertDialog({ open, handleClose, selectedIds, mode }) {
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
            {"Land Setter Launch Details"}
          </Typography>
        </DialogTitle>
        <DialogContent style={{ paddingTop: "24px" }}>
          <Typography className={classes.bodyText} variant="body2" gutterBottom>
            Hello everybody,
          </Typography>
          <Typography className={classes.bodyText} variant="body2" gutterBottom>
            We're happy to announce that Alien World Land Teleport is going to
            be launched this Wednesday 19th May. To celebrate this amazing
            moment we're going to giveaway three drills. To participate just
            check our discord in the #giveaways channel. Winners will be chosen
            on the launch day!!
          </Typography>
          <Typography className={classes.bodyText} variant="body2" gutterBottom>
            <Typography
              style={{ fontWeight: 700 }}
              variant="body2"
              component="span"
              color="secondary"
            >
              Alien Worlds Land Setter
            </Typography>{" "}
            allows you to change the land you're at by ID, also by clicking the
            lands in that you save in the browser. It is already finished, but
            we're going to use the next days to keep improving the project in
            general aspects and also test the new tool alot.
          </Typography>

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
          <Button
            onClick={() => window.open("https://discord.gg/UfHCfgnBHt")}
            color="primary"
          >
            Join Discord
          </Button>
        </DialogActions>
      </React.Fragment>
    </Dialog>
  )
}
