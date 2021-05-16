import React, { useState } from "react"

// LandsContext allows you to easily handle local storage with React.Context
// Local storage is used in order to store prefered lands in the browsers

const LandsContext = React.createContext()

const defaultLands = "[]"

export const LandsProvider = ({ children }) => {
  const [currentLands, setLands] = useState(
    localStorage.getItem("aw-lands") || defaultLands
  )

  // Sets any value it recieves
  const saveLands = landAsset => {
    const nextLands = JSON.parse(currentLands)
    nextLands.push(landAsset)
    localStorage.setItem("aw-lands", JSON.stringify(nextLands))
    setLands(JSON.stringify(nextLands))
  }

  const setDefaultLands = () => {
    // Set lands to void
    localStorage.removeItem("aw-lands")
    setLands(defaultLands)
  }

  const removeLand = assetId => {
    const parsedLands = JSON.parse(currentLands)
    const filteredLands = parsedLands.filter(land => land.asset_id === assetId)
    const jsonLands = JSON.stringify(filteredLands)
    localStorage.setItem("aw-lands", jsonLands)
    setLands(jsonLands)
  }

  return (
    <LandsContext.Provider
      //Context values, you'll be able to acces those with useLandsContext hook.
      value={{
        lands: JSON.parse(currentLands),
        saveLands,
        setDefaultLands,
        removeLand,
      }}
    >
      {children}
    </LandsContext.Provider>
  )
}

export const useLandsContext = () => {
  const context = React.useContext(LandsContext)
  return context
}

export default LandsContext
