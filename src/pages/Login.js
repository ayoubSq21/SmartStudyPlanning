import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAsync } from '../redux/slices/authSlice';
import { validators, validateForm } from '../utils/validators';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/Auth.css';


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Effacer l'erreur du champ modifié
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const validationRules = {
      username: validators.required,
      password: [validators.required, validators.minLength(4)]
    };

    const { errors, isValid } = validateForm(formData, validationRules);

    if (!isValid) {
      setFormErrors(errors);
      return;
    }

    try {
      await dispatch(loginAsync(formData)).unwrap();
      navigate('/dashboard');
    } catch (err) {
      console.error('Erreur de connexion:', err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{t('login')}</h2>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">{t('username')}</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={formErrors.username ? 'error' : ''}
            />
            {formErrors.username && (
              <span className="error-message">{formErrors.username}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">{t('password')}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={formErrors.password ? 'error' : ''}
            />
            {formErrors.password && (
              <span className="error-message">{formErrors.password}</span>
            )}
          </div>

          {error && <div className="error-banner">{error}</div>}

          <button type="submit" disabled={isLoading} className="btn-primary">
            {isLoading ? 'Connexion...' : t('login')}
          </button>
        </form>

        <p className="auth-link">
          Pas de compte ? <a href="/register">{t('register')}</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
