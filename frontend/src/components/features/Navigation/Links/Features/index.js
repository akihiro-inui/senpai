import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import { FINDSENPAI } from "../../../../../constants/routes"
import Menu from "./Menu"

const FindSenpaiLink = () => {
    const [visible, setVisible] = useState(false)

    const displayMenu = () => {
        setVisible(true)
    }
    const hideMenu = () => {
        setVisible(false)
    }
    return <div className="block"
        onMouseLeave={hideMenu}>
        <NavLink
            to={FINDSENPAI.link}
            className="xl:mr-6 sm:mr-8 md:mr-8 mr-4"
            activeClassName="cursor-pointer text-orange-400"
            onMouseOver={displayMenu}
        >
            {FINDSENPAI.name}
        </NavLink>
        <Menu isVisible={visible} />
    </div>
}
export default FindSenpaiLink