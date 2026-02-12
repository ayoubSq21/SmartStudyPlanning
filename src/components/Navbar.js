import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { FiHome, FiBook, FiCalendar, FiBarChart2, FiMoon, FiSun, FiLogOut, FiUser } from 'react-icons/fi';
import '../styles/Navbar.css';

/**
 * Barre de navigation
 * ✅ React Router pour la navigation
 * ✅ useContext (via useTheme et useLanguage)
 */
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <img src="/favicon.svg" alt="Smart Study Planner" className="logo-icon" style={{ width: '40px', height: '40px' }} />
          <span className="brand-name">Smart Study Planner</span>
        </div>

        {user && (
          <div className="navbar-links">
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              <FiHome className="nav-icon" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink 
              to="/subjects"
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              <FiBook className="nav-icon" />
              <span>{t('subjects')}</span>
            </NavLink>
            <NavLink 
              to="/sessions"
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              <FiCalendar className="nav-icon" />
              <span>{t('sessions')}</span>
            </NavLink>
            <NavLink 
              to="/statistics"
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              <FiBarChart2 className="nav-icon" />
              <span>{t('statistics')}</span>
            </NavLink>
          </div>
        )}

        <div className="navbar-actions">
          <button 
            onClick={toggleTheme}
            className="icon-btn"
            title={theme === 'light' ? 'Mode sombre' : 'Mode clair'}
          >
            {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
          </button>

          <button 
            onClick={toggleLanguage}
            className="icon-btn lang-btn"
            title="Changer de langue"
          >
            {language === 'fr' ? 'EN' : 'FR'}
          </button>

          {user && (
            <>
              <div className="user-info">
                <FiUser size={16} />
                <span className="user-name">{user.username}</span>
              </div>
              <button onClick={handleLogout} className="btn-logout">
                <FiLogOut size={16} />
                <span>{t('logout')}</span>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
