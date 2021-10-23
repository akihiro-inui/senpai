import React from 'react';
import { AuthenticatedMenus, NotAuthenticatedMenus, AuthenticatedRouting, NotAuthenticatedRouting } from './Auth_route/index'
import PropTypes from 'prop-types';
import Switcher from './Switcher';


const Navigation = (props) => {
        return (
            <div>
                { props.isAuth ? <AuthenticatedMenus /> : <NotAuthenticatedMenus /> }            
                { props.isAuth ? <AuthenticatedRouting /> : <NotAuthenticatedRouting /> }
            </div>
        );        
      };

Navigation.propTypes = {isAuth: PropTypes.bool};

export default Navigation
export { Switcher }

// import React from 'react';
// import Switcher from './Switcher';
// import Linker from "./Linker"

// const Navigation = () => (
//     <div>
//         <Linker />
//     </div>)

// export default Navigation
// export { Switcher }