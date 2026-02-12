import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
  fr: {
    welcome: 'Bienvenue',
    subjects: 'Matières',
    sessions: 'Sessions',
    statistics: 'Statistiques',
    addSubject: 'Ajouter une matière',
    addSession: 'Ajouter une session',
    login: 'Connexion',
    logout: 'Déconnexion',
    register: 'Inscription',
    username: 'Nom d\'utilisateur',
    password: 'Mot de passe',
    email: 'Email'
  },
  en: {
    welcome: 'Welcome',
    subjects: 'Subjects',
    sessions: 'Sessions',
    statistics: 'Statistics',
    addSubject: 'Add Subject',
    addSession: 'Add Session',
    login: 'Login',
    logout: 'Logout',
    register: 'Register',
    username: 'Username',
    password: 'Password',
    email: 'Email'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('fr');

  const t = (key) => translations[language][key] || key;

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'fr' ? 'en' : 'fr');
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage doit être utilisé dans LanguageProvider');
  }
  return context;
};
