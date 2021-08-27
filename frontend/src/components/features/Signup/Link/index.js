import React from "react"
import { Link } from "react-router-dom"
import * as ROUTES from "../../../../constants/routes"
import { BrandButtonDefault } from "../../../library/Button"

const SignUp = () => (
    
    <Link
        className="text-white font-helvetica text-base-14 font-medium tracking-wider"
        to={ROUTES.SIGNUP.link} >
        <BrandButtonDefault
            type="button"
            value="Sign up"
        />
    </Link >)

export default SignUp