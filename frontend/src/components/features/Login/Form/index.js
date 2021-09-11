import React from "react"
import { withRouter } from "react-router-dom";
import Email from "./Email"
import Password from "./Password"
import LoginButton from "./Submit"
import { loginUser } from "../../../../api/login"


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.setState({isAuth: false});
        this.state = {
          email: "",
          password: "",
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

      // Try to log in
      try {
          // Try to get jwt token by logging in
          loginUser({email: event.target[0].value, password: event.target[1].value}).then(data => {
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
              this.props.history.push("/findmentor");
            }
          }
          );
      }
      catch(error) {
        console.log("Failed to log in " + error);
      }
    }
    render () {
        return (<form className="xs:w-11/12 xs:mt-2 xs:pb-4 
                                sm:w-1/2 sm:mt-10 sm:pb-6
                                md:w-2/5 md:mt-12 md:pb-8
                                lg:w-1/3 lg:mt-12 lg:pb-8
                                block-inline bg-gray-100 rounded-lg mx-auto w-1/4 pb-16 px-8 pt-4 mt-24"
                                onSubmit={this.handleSubmit}
                                onChange={this.handleChange}>
            <Email />
            <Password />
            <LoginButton />
        </form>
        )
    }
}

export default withRouter(LoginForm)