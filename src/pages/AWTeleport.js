import React from "react"
import { Button } from "waxemist-ui"
import { MainLayout } from "src/layout"
import { Typography, Grid, TextField, makeStyles } from "@material-ui/core"
import { wax, getAsset, setLand } from "src/utils/wax"
import UserHeader from "src/components/UserHeader"
import Asset from "src/components/Asset"
import Snackbar from "src/components/Snackbar"
import LandsModal from "src/components/LandsModal"
import { useLandsContext } from "src/context/LandsContext"

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "90vh",
    paddingBottom: "246px",
    paddingTop: "80px",
  },
  title: {
    color: "#fff",
  },
  formContainer: { marginTop: "24px", paddingBottom: "128px" },
  textField: {
    color: theme.palette.primary.main,
  },
}))

const defaultSnackbar = { open: false, message: "", severity: "" }

const AWTeleport = () => {
  const { lands, saveLands, removeLand } = useLandsContext()
  const classes = useStyles()
  const [landId, setLandId] = React.useState("")
  const [searchedLand, setSearchedLand] = React.useState()
  const [loading, setLoading] = React.useState(false)
  const [modal, setModal] = React.useState(false)
  const [snackbar, setSnackbar] = React.useState(defaultSnackbar)

  const handleLogin = async () => {
    try {
      await wax.login()
      setSearchedLand(false)
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  // Search for the land on the atomic assets API
  const handleSearchSubmit = async id => {
    try {
      let asset
      // Case for stored lands modal, when handleSearch recieves an asset_id string
      if (typeof id === "string") {
        setLoading(true)
        asset = await getAsset(id)
        await validateLandObject(asset)
        setSearchedLand(asset)
        setLoading(false)
        return setModal(false)
      } else {
        // Else just search the land stored on this component s tate

        asset = await getAsset(landId)
        await validateLandObject(asset)
        setSearchedLand(asset)
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: err?.message,
        severity: "error",
      })
    }
  }

  const validateLandObject = async asset => {
    try {
      const isLand = asset?.schema?.schema_name === "land.worlds"
      if (!isLand) {
        setSnackbar({
          open: true,
          message: "Given asset id is not a land",
          severity: "error",
        })
        throw false
      }
    } catch (err) {
      throw err
    }
  }

  // Wax Cloud call to set the land by ID
  const handleSetLand = async () => {
    try {
      const { transaction_id, processed } = await setLand(landId)
      if (processed) {
        setSnackbar({
          open: true,
          message: "Land set with success!",
          severity: "success",
        })
      }
      setSearchedLand()
    } catch (err) {
      if (
        err.message ===
        "assertion failure with message: ERR::LAND_NOT_CHANGING::Land is not changing"
      ) {
        setSnackbar({
          open: true,
          message: "ERR::LAND_NOT_CHANGING::Land is not changing",
          severity: "error",
        })
      } else {
        setSnackbar({
          open: true,
          message: err.message,
          severity: "error",
        })
      }
    }
  }

  const handleOpenStoredLands = async () => {
    setModal(true)
  }

  const handleCloseStoredLands = async () => {
    setModal(false)
  }

  const handleToggleLand = () => {
    if (isSearchedLandInContext()) {
      removeLand()
    } else {
      saveLands(searchedLand)
    }
  }

  const onChangeLandInput = evt => {
    if (!evt.target.value.match(/^[0-9]*$/)) {
      return false
    }
    setLandId(evt.target.value)
  }

  const isSearchedLandInContext = () => {
    const parsedLands = lands
    if (
      searchedLand &&
      parsedLands.length > 0 &&
      parsedLands.find(value => {
        return value.asset_id === searchedLand.asset_id
      })
    ) {
      return true
    } else {
      return false
    }
  }

  const Login = () => {
    if (wax.userAccount) {
      return false
    }

    return (
      <Grid container justify="center" align="center" spacing={4}>
        <Grid item xs={12} container justify="center">
          <Button action={handleLogin}>Login Wax Cloud</Button>
        </Grid>
      </Grid>
    )
  }

  return (
    <MainLayout>
      <Grid
        container
        className={classes.root}
        direction="column"
        justify="center"
        align="center"
      >
        <Grid container justify="center">
          <Typography variant="h2" className={classes.title} gutterBottom>
            AW Land Teleport
          </Typography>
        </Grid>
        <UserHeader userAccount={wax.userAccount} />
        <Login />
        {wax.userAccount && (
          <Grid
            className={classes.formContainer}
            container
            spacing={4}
            justify="center"
          >
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                onChange={onChangeLandInput}
                value={landId}
                className={classes.textField}
                autoFocus={true}
                name="aw-land-id"
                label="Land ID"
                variant="outlined"
              />
            </Grid>
            <Grid item style={{ marginTop: "6px" }}>
              <Button
                disabled={landId.length === 0}
                action={handleSearchSubmit}
                color="primary"
              >
                Search Land
              </Button>
            </Grid>
            <Grid container justify="center">
              <Grid item xs={10} sm={3}>
                <Asset noMint mode="land" value={searchedLand} />
              </Grid>
            </Grid>
            <Grid
              container
              style={{ marginTop: "12px" }}
              justify="center"
              spacing={3}
            >
              <Grid item>
                <Button
                  action={handleSetLand}
                  disabled={!searchedLand}
                  color="secondary"
                >
                  Set Land
                </Button>
              </Grid>
            </Grid>
            <Grid
              style={{ marginTop: "12px" }}
              container
              justify="center"
              spacing={3}
            >
              <Grid item>
                <Button
                  action={handleToggleLand}
                  disabled={!searchedLand}
                  color="primary"
                >
                  {isSearchedLandInContext() ? "Remove Land" : "Save Land"}
                </Button>
              </Grid>
              <Grid item>
                <Button action={handleOpenStoredLands} color="secondary">
                  Stored Lands
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
        <LandsModal
          open={modal}
          lands={lands}
          loading={loading}
          handleCloseLands={handleCloseStoredLands}
          handleSelectLand={handleSearchSubmit}
          handleClose
        />
        <Snackbar
          open={snackbar.open}
          severity={snackbar.severity}
          message={snackbar.message}
          handleClose={() => {
            setSnackbar(defaultSnackbar)
          }}
        />
      </Grid>
    </MainLayout>
  )
}

export default AWTeleport
