import React from "react"
import "src/App.css"
import { Typography, Grid } from "@material-ui/core"
import { UserHeader } from "src/components/UserHeader"
import { MainLayout } from "src/layout"
import AnnouncementModal from "src/components/AnnouncementModal"
import GameCard from "src/components/GameCard"
import image1 from "src/assets/Tool4.png"
import image2 from "src/assets/Tool3.png"
import { useHistory } from "react-router-dom"

const App = () => {
  const history = useHistory()
  const [userAccount] = React.useState()
  const [modal, setModal] = React.useState(false)

  const handleModalOpen = () => {
    setModal(true)
  }

  const handleModalClose = () => {
    setModal(false)
  }

  const Announcement = () => {
    if (userAccount) {
      return false
    }

    return (
      <Grid container justify="center" align="center">
        <a
          style={{
            textDecoration: "none",
            marginBottom: "36px",
            cursor: "pointer",
          }}
          onClick={handleModalOpen}
        >
          <Typography variant="body2" color="primary" gutterBottom>
            🗒 Click here for update notes!
          </Typography>
        </a>
        <AnnouncementModal open={modal} handleClose={handleModalClose} />
      </Grid>
    )
  }

  return (
    <MainLayout>
      <Grid
        container
        style={{
          minHeight: "90vh",
          paddingBottom: "246px",
          paddingTop: "128px",
        }}
        direction="column"
        justify="center"
        align="center"
      >
        <Grid container justify="center">
          <Typography variant="h2" style={{ color: "#fff" }} gutterBottom>
            Choose your Tool
          </Typography>
        </Grid>
        <UserHeader userAccount={userAccount} />
        <Grid container spacing={3} justify="center">
          <GameCard
            onClick={() => history.push("/tool-equip")}
            image={image1}
            label="AW Tool Equip"
          />
          <GameCard
            onClick={() => history.push("/teleport")}
            image={image2}
            label="AW Land Teleport"
          />
        </Grid>
      </Grid>
    </MainLayout>
  )
}

export default App
