import React from 'react';
import Switcher from './Switcher';
import Linker from "./Linker"
import { AuthenticatedMenus, NotAuthenticatedMenus, AuthenticatedRouting, NotAuthenticatedRouting } from './Auth_route/index'
import PropTypes from 'prop-types';


const Navigation = (props) => {
        return (
            <div>
                {/* <Linker /> */}
                <BrowserRouter>
                    <div>
                        { props.authenticated ? <AuthenticatedMenus /> : <NotAuthenticatedMenus /> }            
                        { props.authenticated ? <AuthenticatedRouting /> : <NotAuthenticatedRouting /> }
                    </div>
                </BrowserRouter>
                
            </div>
        );        
      };

Routing.propTypes = {authenticated: PropTypes.bool};

export default Navigation
export { Switcher }