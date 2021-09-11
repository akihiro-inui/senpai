import React from "react"
import { withRouter } from "react-router-dom";
import Name from "./Name"
import Email from "./Email"
import Password from "./Password"
import SignUpButton from "./Submit"
import { createUser }  from "../../../../api/users"
import { loginUser } from "../../../../api/login"


class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.setState({isAuth: false});
    this.state = {
      email: "",
      password: "",
      name: "",
      hasAgreed: false,
      jwt_token: null
    };


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Function to ne executed when SignUp from value is changed
  handleChange = (event) => {
    let target = event.target;
  }

  // Function to be executed when SignUp button was pressed
  handleSubmit = (event) => {
      event.preventDefault()

      // Retrieve username, email and password, send information to backend API
      try {
        createUser({name: event.target[0].value,
                    email: event.target[1].value,
                    password: event.target[2].value})
          }
      catch(error) {
        console.log("Failed to create user " + error);

        // TODO: Show error popup and terminate the process
          }

      // If user is created, try to log in
      try {
          // Try to get jwt token by logging in
          loginUser({email: event.target[1].value, password: event.target[2].value}).then(data => {
            const jwt_token = data['jwt_token']
            
            // Check jwt token is returned from serverside
            if(jwt_token==null){
              console.log("jwt token is null")
            }
            else{
              localStorage.setItem('jwt_token', jwt_token);
              console.log("Successfully logged in");
              this.setState({isAuth: true})

              // Redirect the user to mypage
              this.props.history.push("/mypage");
            }
          }
          );
      }
      catch(error) {
        console.log("Failed to log in " + error);
      }
    }

    // SignUp page
    render() {
      return (
        
          <form className="xs:w-11/12 xs:mt-2 xs:pb-4 
                              sm:w-1/2 sm:mt-10 sm:pb-6
                              md:w-2/5 md:mt-12 md:pb-8
                              lg:w-1/3 lg:mt-12 lg:pb-8
                              block-inline bg-gray-100 rounded-lg mx-auto w-1/4 pb-16 px-8 pt-4 mt-24"
                          onSubmit={this.handleSubmit}
                          onChange={this.handleChange}>
          <Name />
          <Email />
          <Password />
          <SignUpButton />
        </form>
      )
    }
    
}

export default withRouter(SignUpForm);