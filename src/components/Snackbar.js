import React from "react"
import MuiAlert from "@material-ui/lab/Alert"
import { makeStyles, Snackbar } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}))

const Alert = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export const CustomizedSnackbars = ({
  severity,
  open,
  handleClose,
  message,
}) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default CustomizedSnackbars
