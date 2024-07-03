import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const ProtectedRoute = ({ element, ...rest }) => {
  const [cookies] = useCookies(['accessToken']);

  return (
    <Route
      {...rest}
      element={cookies.accessToken ? element : <Navigate to="/signin" replace />}
    />
  );
};

export default ProtectedRoute;
