import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const [cookies] = useCookies(['accessToken']);
  const isAuthenticated = !!cookies.accessToken;

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
