import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isTokenValid } from '../redux/slices/authSlice'; // ✅ importer la fonction

/**
 * Route protégée - redirige vers login si non authentifié
 * ✅ Vérifie maintenant le JWT en plus de l'user
 */
const ProtectedRoute = ({ children }) => {
  const { user, token } = useSelector((state) => state.auth); // ✅ récupérer aussi le token

  // ✅ Double vérification : user existe ET token est valide
  if (!user || !token || !isTokenValid(token)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;