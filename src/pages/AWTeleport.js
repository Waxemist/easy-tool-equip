import React from "react"
import "src/App.css"
import { Button } from "waxemist-ui"
import { Typography, Grid, TextField, makeStyles } from "@material-ui/core"
import { wax, getAsset, setLand } from "src/utils/wax"
import { UserHeader } from "src/components/UserHeader"
import { MainLayout } from "src/layout"
import { Asset } from "src/components/Asset"
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

const App = () => {
  const { lands, saveLands, removeLand } = useLandsContext()

  const classes = useStyles()
  const [landId, setLandId] = React.useState("")
  const [searchedLand, setSearchedLand] = React.useState()
  const [modal, setModal] = React.useState()

  const handleLogin = async () => {
    try {
      await wax.login()
      setSearchedLand(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleOpenModal = async () => {
    setModal(true)
  }

  const handleCloseModal = async () => {
    setModal(false)
  }

  const handleSearchSubmit = async id => {
    let asset
    if (typeof id === "string") {
      asset = await getAsset(id)
      console.log(asset)
      setSearchedLand(asset)
      return setModal()
    } else {
      asset = await getAsset(landId)
      setSearchedLand(asset)
    }
  }

  const handleSetLand = () => {
    setLand(landId)
  }

  const handleToggleLand = () => {
    if (isSearchedLandInContext()) {
      removeLand()
    } else {
      saveLands(searchedLand)
    }
  }

  const onChangeLandInput = evt => {
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
            AW Teleport
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
                <Asset noMint value={searchedLand} />
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
                <Button action={handleOpenModal} color="secondary">
                  Stored Lands
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
        <LandsModal
          open={modal}
          lands={lands}
          handleClose={handleCloseModal}
          handleSelectLand={handleSearchSubmit}
        />
      </Grid>
    </MainLayout>
  )
}

export default App
