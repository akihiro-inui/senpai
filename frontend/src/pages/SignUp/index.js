import React, { Component} from "react";
import SignUpForm from "../../components/features/Signup";

const SignUp = () => (
    <div className="xs:pt-8 flex items-center align-center justify-center" >
        <SignUpForm />
    </div>
)
// import Navigation from "./navigation";

// class SignUpPage extends Component {
//   render() {

//     if(!localStorage.getItem('jwt_token')) {
//       return (
//         <Router basename="/signin/">
//           <div className="App">
//             <div className="appAside" />
//             <div className="appForm">
//               <div className="pageSwitcher">
//                 <NavLink

//                   activeClassName="pageSwitcherItem-active"
//                   className="pageSwitcherItem"
//                 >
//                   Sign In
//                 </NavLink>
//                 <NavLink
//                   exact
//                   to="/"
//                   activeClassName="pageSwitcherItem-active"
//                   className="pageSwitcherItem"
//                 >
//                   Sign Up
//                 </NavLink>
//               </div>
  
//               <div className="formTitle">
//                 <NavLink
//                   to="/signup"
//                   activeClassName="formTitleLink-active"
//                   className="formTitleLink"
//                 >
//                   Sign In
//                 </NavLink>{" "}
//                 or{" "}
//                 <NavLink
//                   exact
//                   to="/"
//                   activeClassName="formTitleLink-active"
//                   className="formTitleLink"
//                 >
//                   Sign Up
//                 </NavLink>
//               </div>
  
//               <Route exact path="/" component={SignUpForm} />
//               <Route path="/" component={SignInForm} />
//             </div>
//           </div>
//         </Router>
//       );
//     }

//     // If user already logged in, redirect to top page
//     return (
//       <Router basename="/">
//         <TopPage />
//       </Router>
//   )
//   }
// }

export default SignUp