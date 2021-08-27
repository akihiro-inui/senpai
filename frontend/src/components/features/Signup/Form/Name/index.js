import React from "react"
import { OutlineField as NameField } from "../../../../library/Textfield"
import Label from "../../../../library/Label"


const Name = () => {

    const name = {
        type: "name",
        id: "name",
        placeholder: "Your Name",
        isFocused: false
    };

    return < div className="mt-3 flex flex-col" >
        <div className="flex items-baseline">
            <Label value="Name" />
        </div>
        <NameField {...name} />
    </div >
}

export default Name