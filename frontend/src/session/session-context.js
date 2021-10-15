import React from 'react';

export const SessionContext = React.createContext({
  authenticated: false,
  login: () => {},
  logout: () => {}
});