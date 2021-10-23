// import { React, useState } from 'react';
// import Navigation from "../navigation/index";
// import { sessionState } from '../session/session-state';
// import { SessionContext } from '../session/session-context.js';

// export function State() {

//   const [authenticated, setAuthenticated] = useState(sessionState.authenticated);
//   const [login, setLogin] = useState(login);
//   const [logout, setLogout] = useState(logout);

//   setLogin(() => {
//     setAuthenticated(() => ({
//       authenticated: true
//     }));
//     sessionState.login();
//   })

//   setLogout(() => {
//     setAuthenticated(() => ({
//       authenticated: false
//     }));
//     sessionState.logout();
//   })

//   return (
//     <SessionContext.Provider value={authenticated, login, logout}>
//       <Navigation authenticated={authenticated} />
//     </SessionContext.Provider>
//   );
// }

// export default State
