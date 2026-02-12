import { useState, useEffect } from 'react';

/**
 * Custom Hook pour gérer le localStorage avec React
 * ✅ Synchronise automatiquement avec localStorage
 * ✅ Supporte les objets JSON
 */
export const useLocalStorage = (key, initialValue) => {
  // État initialisé avec la valeur du localStorage ou la valeur par défaut
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Erreur lors de la lecture de ${key}:`, error);
      return initialValue;
    }
  });

  // Fonction pour mettre à jour la valeur
  const setValue = (value) => {
    try {
      // Permet de passer une fonction comme avec useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Erreur lors de la sauvegarde de ${key}:`, error);
    }
  };

  return [storedValue, setValue];
};
