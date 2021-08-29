import React from "react"
import { OutlineField as EmailField } from "../../../../library/Textfield"
import Label from "../../../../library/Label"

const Email = () => {

    const email = {
        type: "email",
        id: "email",
        placeholder: "You@example.com",
        isFocused: true
    };

    return <div className="flex flex-col" >
        <Label value="Email" />
        <EmailField {...email} />
    </div >
}

export default Email