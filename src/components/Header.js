import React from "react"

export const Header = (props) => {
  return (
    <div className="header p-3 d-flex align-items-end justify-content-center text-center">
      <div>
        <div className="text-light header__title">Field Notes</div>
        <div className="text-light header__tagline">
          Crop Scouting notes made easy
        </div>
      </div>
    </div>
  )
}

export default Header
