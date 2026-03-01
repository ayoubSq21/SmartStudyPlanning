import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAllSubjects } from '../redux/slices/subjectsSlice';
import { selectAllSessions, selectUpcomingSessions } from '../redux/slices/sessionsSlice';
import { useLanguage } from '../contexts/LanguageContext';
import { FiBook, FiCheckSquare, FiClock, FiTrendingUp, FiPlus, FiCalendar, FiBarChart2 } from 'react-icons/fi';
import '../styles/Dashboard.css';


const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const user = useSelector((state) => state.auth.user);
  const subjects = useSelector(selectAllSubjects);
  const sessions = useSelector(selectAllSessions);
  const upcomingSessions = useSelector(selectUpcomingSessions);

  // useMemo pour optimiser le calcul des statistiques
  const statistics = useMemo(() => {
    const totalSessions = sessions.length;
    const completedSessions = sessions.filter(s => s.completed).length;
    const totalHours = sessions.reduce((sum, s) => sum + (s.duration || 0), 0) / 60;
    const completionRate = totalSessions > 0 
      ? Math.round((completedSessions / totalSessions) * 100)
      : 0;

    return {
      totalSubjects: subjects.length,
      totalSessions,
      completedSessions,
      totalHours: totalHours.toFixed(1),
      completionRate
    };
  }, [subjects, sessions]);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>{t('welcome')}, {user?.username}!</h1>
        <p>Voici un résumé de vos révisions</p>
      </div>

      {/* Cartes de statistiques */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FiBook size={32} />
          </div>
          <div className="stat-content">
            <h3>{statistics.totalSubjects}</h3>
            <p>Matières</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FiCalendar size={32} />
          </div>
          <div className="stat-content">
            <h3>{statistics.totalSessions}</h3>
            <p>Sessions totales</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon success">
            <FiCheckSquare size={32} />
          </div>
          <div className="stat-content">
            <h3>{statistics.completedSessions}</h3>
            <p>Sessions complétées</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon warning">
            <FiClock size={32} />
          </div>
          <div className="stat-content">
            <h3>{statistics.totalHours}h</h3>
            <p>Temps d'étude</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon info">
            <FiTrendingUp size={32} />
          </div>
          <div className="stat-content">
            <h3>{statistics.completionRate}%</h3>
            <p>Taux de complétion</p>
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="quick-actions">
        <h2>Actions rapides</h2>
        <div className="action-buttons">
          <button 
            className="action-btn"
            onClick={() => navigate('/subjects')}
          >
            <FiPlus className="btn-icon" size={24} />
            <span>Ajouter une matière</span>
          </button>
          <button 
            className="action-btn"
            onClick={() => navigate('/sessions')}
          >
            <FiCalendar className="btn-icon" size={24} />
            <span>Planifier une session</span>
          </button>
          <button 
            className="action-btn"
            onClick={() => navigate('/statistics')}
          >
            <FiBarChart2 className="btn-icon" size={24} />
            <span>Voir les statistiques</span>
          </button>
        </div>
      </div>

      {/* Sessions à venir */}
      {upcomingSessions.length > 0 && (
        <div className="upcoming-sessions">
          <h2>Sessions à venir</h2>
          <div className="sessions-list">
            {upcomingSessions.slice(0, 3).map(session => {
              const subject = subjects.find(s => s.id === session.subjectId);
              return (
                <div key={session.id} className="session-preview">
                  <div 
                    className="session-color" 
                    style={{ backgroundColor: subject?.color || '#ccc' }}
                  />
                  <div className="session-info">
                    <h4>{session.title}</h4>
                    <p className="session-meta">
                      <span className="subject-name">{subject?.name}</span>
                      <span className="separator">•</span>
                      <span>{session.duration} min</span>
                    </p>
                    <p className="session-date">
                      {new Date(session.date).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long'
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
