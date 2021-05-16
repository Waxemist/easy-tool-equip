import React from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import Grid from "@material-ui/core/Grid"
import { CircularProgress } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import { setBag, wax } from "src/utils/wax"

export default function AlertDialog({
  open,
  handleClose,
  assets,
  selectedIds,
  mode,
}) {
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

  if (!wax.userAccount) {
    return false
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

  const Result = () => {
    return <Grid container></Grid>
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
              {"Confirm Tool Equip"}
            </Typography>
          </DialogTitle>
          <DialogContent style={{ paddingTop: "48px" }}>
            {assets.map((value, index) => {
              return (
                <Grid key={index} container justify="center">
                  <Grid item md={3}>
                    <img
                      style={{
                        objectFit: "contain",
                        maxHeight: "250px",
                        marginBottom: "24px",
                        width: "100%",
                      }}
                      src={`https://ipfs.io/ipfs/${value.data.img}`}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    container
                    align="center"
                    justify="center"
                    direction="column"
                  >
                    <Typography style={{ color: "#fff" }}>
                      {value.name}
                    </Typography>
                    <Typography style={{ color: "#fff" }}>
                      #{value.template_mint}
                    </Typography>
                  </Grid>
                </Grid>
              )
            })}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={handleSend} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </React.Fragment>
      )}
    </Dialog>
  )
}
