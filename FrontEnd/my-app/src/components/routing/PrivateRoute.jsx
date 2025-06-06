/*
import React from 'react';
import { Route, Navigate } from 'react-router-dom'; // Update the import statement
//import authService from '../services/authService';
import authService from '../../services/authService';

const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const role = authService.getRole();
      if (!role) {
        return <Navigate to="/login" />; // Update Redirect to Navigate
      }

      if (roles && !roles.includes(role)) {
        return <Navigate to="/unauthorized" />; // Update Redirect to Navigate
      }

      return <Component {...props} />;
    }}
  />
);

export default PrivateRoute;
*/
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authService from '../../services/authService';

const PrivateRoute = ({ roles }) => {
  const isLoggedIn = authService.isLoggedIn();
  const role = authService.getUserRole();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
