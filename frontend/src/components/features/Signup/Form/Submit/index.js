import React from "react"
import { BrandButtonLarge as SignUp } from "../../../../library/Button"


const SignUpButton = () => {

    const signup = (e) => e.preventDefault()
    
    return <SignUp
        type="submit"
        value="Sign up"
        event={signup}
        classes="xs:py-3 sm:py-3 md:py-3 xl:py-3 lg:py-3 mt-8" />
}

export default SignUpButton