import React, { Component} from "react";
import { HashRouter as Router, Redirect, Route, NavLink } from "react-router-dom";
import TopPage from "./pages/TopPage";
import "./App.css";
import Navigation from "./navigation/index";
// import SignUpForm from "./pages/SignUpForm";
// import SignInForm from "./pages/SignInForm";
// import Header from "./components/Header";

import {SessionContext} from './session/session-context.js';
import {sessionState} from './session/session-state.js';

export default class App extends Component {

  // ここからA
  constructor() {
    super();

    const login = () => {
      this.setState(() => ({
        authenticated: true
      }));
      sessionState.login();
    };

    const logout = () => {
      this.setState(() => ({
        authenticated: false
      }));
      sessionState.logout();
    };

    this.state = {
      authenticated: sessionState.authenticated,
      login: login,
      logout: logout
    };
  }
  // ここまでA


  
  render() {    
    // if(!localStorage.getItem('jwt_token')) {
    //   return (    
    //     <Router basename="/signin/">
    //       <div className="App">
    //         <div className="appAside" />
    //         <div className="appForm">
    //           <div className="pageSwitcher">
    //             <NavLink

    //               activeClassName="pageSwitcherItem-active"
    //               className="pageSwitcherItem"
    //             >
    //               Sign In
    //             </NavLink>
    //             <NavLink
    //               exact
    //               to="/"
    //               activeClassName="pageSwitcherItem-active"
    //               className="pageSwitcherItem"
    //             >
    //               Sign Up
    //             </NavLink>
    //           </div>
  
    //           <div className="formTitle">
    //             <NavLink
    //               to="/signup"
    //               activeClassName="formTitleLink-active"
    //               className="formTitleLink"
    //             >
    //               Sign In
    //             </NavLink>{" "}
    //             or{" "}
    //             <NavLink
    //               exact
    //               to="/"
    //               activeClassName="formTitleLink-active"
    //               className="formTitleLink"
    //             >
    //               Sign Up
    //             </NavLink>
    //           </div>
  
    //           <Route exact path="/" component={SignUpForm} />
    //           <Route path="/" component={SignInForm} />
    //         </div>
    //       </div>
    //     </Router>
    //   );
    // }

    // If user already logged in, redirect to top page
    return (
      <Router basename="/">
        <SessionContext.Provider value={this.state}>
          <Navigation authenticated={this.state.authenticated} />
        </SessionContext.Provider>
        <TopPage />        
      </Router>
  )
}
}

