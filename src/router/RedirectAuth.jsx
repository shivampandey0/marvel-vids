import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context';

export const RedirectAuth = ({ children }) => {
  const {
    authState: { token },
  } = useAuth();

  const location = useLocation();

  return token ? (
    <Navigate to={'/'} state={{ from: location }} replace />
  ) : (
    children
  );
};

