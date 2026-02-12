/**
 * Utilitaires de validation pour les formulaires
 * ✅ Validation d'email
 * ✅ Validation de mot de passe
 * ✅ Validation de champs requis
 */

export const validators = {
  required: (value) => {
    return value && value.trim() !== '' ? null : 'Ce champ est requis';
  },

  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : 'Email invalide';
  },

  minLength: (min) => (value) => {
    return value && value.length >= min 
      ? null 
      : `Minimum ${min} caractères requis`;
  },

  maxLength: (max) => (value) => {
    return value && value.length <= max 
      ? null 
      : `Maximum ${max} caractères`;
  },

  password: (value) => {
    if (!value || value.length < 4) {
      return 'Le mot de passe doit contenir au moins 4 caractères';
    }
    return null;
  },

  futureDate: (value) => {
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return selectedDate >= today 
      ? null 
      : 'La date doit être aujourd\'hui ou dans le futur';
  },

  positiveNumber: (value) => {
    const num = Number(value);
    return num > 0 ? null : 'Doit être un nombre positif';
  }
};

/**
 * Fonction pour valider un objet avec plusieurs validateurs
 */
export const validateForm = (values, rules) => {
  const errors = {};

  Object.keys(rules).forEach(field => {
    const fieldRules = Array.isArray(rules[field]) ? rules[field] : [rules[field]];
    
    for (const rule of fieldRules) {
      const error = rule(values[field]);
      if (error) {
        errors[field] = error;
        break; // On s'arrête à la première erreur
      }
    }
  });

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
