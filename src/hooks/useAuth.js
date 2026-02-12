import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

/**
 * Custom Hook pour gérer l'authentification
 * ✅ useCallback pour optimiser les performances
 * ✅ Gestion du localStorage
 */
export const useAuth = () => {
  const [user, setUser] = useLocalStorage('currentUser', null);
  const [isLoading, setIsLoading] = useState(false);

  // useCallback pour éviter de recréer la fonction à chaque render
  const login = useCallback((username, password) => {
    setIsLoading(true);
    
    // Simulation d'une API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Validation simple (pour l'exemple)
        if (username && password.length >= 4) {
          const userData = {
            id: Date.now(),
            username,
            email: `${username}@student.com`,
            createdAt: new Date().toISOString()
          };
          setUser(userData);
          setIsLoading(false);
          resolve(userData);
        } else {
          setIsLoading(false);
          reject(new Error('Identifiants invalides'));
        }
      }, 1000);
    });
  }, [setUser]);

  const register = useCallback((username, email, password) => {
    setIsLoading(true);
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username && email && password.length >= 4) {
          const userData = {
            id: Date.now(),
            username,
            email,
            createdAt: new Date().toISOString()
          };
          setUser(userData);
          setIsLoading(false);
          resolve(userData);
        } else {
          setIsLoading(false);
          reject(new Error('Données invalides'));
        }
      }, 1000);
    });
  }, [setUser]);

  const logout = useCallback(() => {
    setUser(null);
  }, [setUser]);

  return {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };
};
