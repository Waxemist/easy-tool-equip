import React from "react"
import { Grid, Fab } from "@material-ui/core"
import Modal from "src/components/ToolsModal"
import Asset from "src/components/Asset"
import Snackbar from "src/components/Snackbar"

const defaultSnackbar = { open: false, message: "", severity: "" }

export const AssetActionList = ({
  userAssets,
  fabActionLabel,
  selectLimit = 100,
  mode,
  refetch,
}) => {
  const [selectedAssets, setSelectedAssets] = React.useState([])
  const [selectedIds, setSelectedIds] = React.useState([])
  const [snackbar, setSnackbar] = React.useState(defaultSnackbar)
  const [modal, setModal] = React.useState(false)

  const handleAssetClick = (asset, isSelected) => {
    if (!isSelected) {
      if (selectedAssets.length >= 3) {
        setSnackbar({
          open: true,
          severity: "warning",
          message: `You can only add up to ${selectLimit} objects`,
        })
        return false
      }

      let newList = [...selectedAssets]
      let newIdList = [...selectedIds]
      newIdList.push(asset.asset_id)
      newList.push(asset)
      setSelectedAssets(newList)
      setSelectedIds(newIdList)
    } else {
      setSelectedAssets([])
      setSelectedIds([])
    }
  }

  const isAssetSelected = asset => {
    if (selectedAssets.find(element => element.asset_id === asset.asset_id)) {
      return true
    }
    return false
  }

  const openModal = () => {
    setModal(true)
  }

  const closeModal = async () => {
    if (refetch) {
      await refetch()
    }
    setModal(false)
  }

  return (
    <Grid container justify="center" spacing={4}>
      {userAssets?.map((value, index) => (
        <Grid item xs={10} md={3} key={index}>
          <Asset
            value={value}
            onClick={handleAssetClick}
            isSelected={isAssetSelected(value)}
          />
        </Grid>
      ))}
      <Snackbar
        open={snackbar.open}
        severity={snackbar.severity}
        message={snackbar.message}
        handleClose={() => {
          setSnackbar(defaultSnackbar)
        }}
      />
      {selectedAssets.length > 0 && (
        <Fab
          onClick={openModal}
          style={{ position: "fixed", bottom: "10%", right: 30, zIndex: 5 }}
          color="primary"
          variant="extended"
        >
          {fabActionLabel}
        </Fab>
      )}
      <Modal
        open={modal}
        selectedIds={selectedIds}
        setSnackbar={setSnackbar}
        mode={mode}
        handleClose={closeModal}
        assets={selectedAssets}
      />
    </Grid>
  )
}
