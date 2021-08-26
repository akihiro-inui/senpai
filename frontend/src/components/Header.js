import React, { Component } from "react"

class Header extends Component {
    constructor() {
      super();
    }
  
    render() {
        return (
            <header className="xs:px-2 sm:py-2
            sm:px-6 sm:py-3
            md:px-8 sm:py-4
            flex justify-start bg-brand-dark py-4 px-10 items-center ">
            </header>
        )
      }
}

export default {Header};