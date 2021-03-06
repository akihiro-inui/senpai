import React, { Component } from "react";
import { Router, Link } from "react-router-dom";
import {
  FacebookLoginButton,
  InstagramLoginButton
} from "react-social-login-buttons";
import { loginUser } from "../api/login";
import TopPage from "./TopPage";
import Navigation from "../navigation";

class SignInForm extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    try {
        // Try to get jwt token by logging in
        loginUser(this.state).then(data => {
          const jwt_token = data['jwt_token']
        if(jwt_token==null){
          alert("Email or password is not correct");
          console.log("Email or password is not correct")
        }
        else{
          localStorage.setItem('jwt_token', jwt_token);
          console.log("Successfully logged in");

          // If user signed in, redirect to top page
          this.props.history.push('/top');
        }
        });
    }
    catch(error) {
      console.log("Unexpected Error");
    }
  }

  render() {
    return (
      <div className="formCenter">
        <form className="formFields" onSubmit={this.handleSubmit}>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="email">
              E-Mail Address
            </label>
            <input
              type="email"
              id="email"
              className="formFieldInput"
              placeholder="Enter your email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>

          <div className="formField">
            <label className="formFieldLabel" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="formFieldInput"
              placeholder="Enter your password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>

          <div className="formField">
            <button className="formFieldButton">Sign In</button>{" "}
            <Link to="/" className="formFieldLink">
              Create an account
            </Link>
          </div>

          {/* TODO: Implement this */}
          <div className="socialMediaButtons">
            <div className="facebookButton">
              <FacebookLoginButton onClick={() => alert("Hello")} />
            </div>

          {/* TODO: Implement this */}
            <div className="instagramButton">
              <InstagramLoginButton onClick={() => alert("Hello")} />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SignInForm;
