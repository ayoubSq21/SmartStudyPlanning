import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectAllSubjects } from '../redux/slices/subjectsSlice';
import { selectAllSessions } from '../redux/slices/sessionsSlice';
import '../styles/Statistics.css';
import { FiBarChart2 } from 'react-icons/fi';



const Statistics = () => {
  const subjects = useSelector(selectAllSubjects);
  const sessions = useSelector(selectAllSessions);

  // Calcul des statistiques avec useMemo
  const stats = useMemo(() => {
  
    const totalSessions = sessions.length;
    const completedSessions = sessions.filter(s => s.completed).length;
    const pendingSessions = totalSessions - completedSessions;
    const completionRate = totalSessions > 0 
      ? Math.round((completedSessions / totalSessions) * 100)
      : 0;

    // Temps total et moyen
    const totalMinutes = sessions.reduce((sum, s) => sum + (s.duration || 0), 0);
    const totalHours = (totalMinutes / 60).toFixed(1);
    const avgSessionDuration = totalSessions > 0 
      ? Math.round(totalMinutes / totalSessions)
      : 0;

    // Stats par matière
    const subjectStats = subjects.map(subject => {
      const subjectSessions = sessions.filter(s => s.subjectId === subject.id);
      const completed = subjectSessions.filter(s => s.completed).length;
      const total = subjectSessions.length;
      const totalTime = subjectSessions.reduce((sum, s) => sum + (s.duration || 0), 0);

      return {
        id: subject.id,
        name: subject.name,
        color: subject.color,
        totalSessions: total,
        completedSessions: completed,
        completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
        totalHours: (totalTime / 60).toFixed(1),
        examDate: subject.examDate
      };
    }).sort((a, b) => b.totalSessions - a.totalSessions);

    // Sessions par jour de la semaine
    const dayStats = Array(7).fill(0);
    sessions.forEach(session => {
      const day = new Date(session.date).getDay();
      dayStats[day]++;
    });

    const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const sessionsByDay = daysOfWeek.map((day, index) => ({
      day,
      count: dayStats[index]
    }));

    return {
      general: {
        totalSessions,
        completedSessions,
        pendingSessions,
        completionRate,
        totalHours,
        avgSessionDuration
      },
      bySubject: subjectStats,
      byDay: sessionsByDay
    };
  }, [subjects, sessions]);

  return (
    <div className="statistics-page">
      <div className="page-header">
      <h1><FiBarChart2 /> Statistiques</h1>
      </div>

      {/* Vue d'ensemble */}
      <div className="stats-overview">
      <h2>Vue d'ensemble</h2>
      <div className="stats-grid">
        <div className="stat-box">
        <div className="stat-value">{stats.general.totalSessions}</div>
        <div className="stat-label">Sessions totales</div>
        </div>
        <div className="stat-box success">
        <div className="stat-value">{stats.general.completedSessions}</div>
        <div className="stat-label">Complétées</div>
        </div>
        <div className="stat-box warning">
        <div className="stat-value">{stats.general.pendingSessions}</div>
        <div className="stat-label">En attente</div>
        </div>
        <div className="stat-box info">
        <div className="stat-value">{stats.general.completionRate}%</div>
        <div className="stat-label">Taux de complétion</div>
        </div>
        <div className="stat-box">
        <div className="stat-value">{stats.general.totalHours}h</div>
        <div className="stat-label">Temps total</div>
        </div>
        <div className="stat-box">
        <div className="stat-value">{stats.general.avgSessionDuration} min</div>
        <div className="stat-label">Durée moyenne</div>
        </div>
      </div>
      </div>

      {/* Stats par matière */}
      {stats.bySubject.length > 0 && (
      <div className="stats-section">
        <h2>Progression par matière</h2>
        <div className="subjects-stats">
        {stats.bySubject.map(subject => (
          <div key={subject.id} className="subject-stat-card">
          <div className="subject-stat-header">
            <div 
            className="subject-color-dot" 
            style={{ backgroundColor: subject.color }}
            />
            <h3>{subject.name}</h3>
          </div>
          <div className="subject-stat-body">
            <div className="stat-row">
            <span>Sessions:</span>
            <strong>{subject.completedSessions} / {subject.totalSessions}</strong>
            </div>
            <div className="stat-row">
            <span>Temps total:</span>
            <strong>{subject.totalHours}h</strong>
            </div>
            <div className="stat-row">
            <span>Progression:</span>
            <strong>{subject.completionRate}%</strong>
            </div>
            <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ 
              width: `${subject.completionRate}%`,
              backgroundColor: subject.color 
              }}
            />
            </div>
            {subject.examDate && (
            <div className="exam-info">
              Examen: {new Date(subject.examDate).toLocaleDateString('fr-FR')}
            </div>
            )}
          </div>
          </div>
        ))}
        </div>
      </div>
      )}

      {/* Stats par jour */}
      {sessions.length > 0 && (
      <div className="stats-section">
        <h2>Répartition par jour de la semaine</h2>
        <div className="day-stats">
        {stats.byDay.map((day, index) => {
          const maxCount = Math.max(...stats.byDay.map(d => d.count), 1);
          const height = (day.count / maxCount) * 100;
          
          return (
          <div key={index} className="day-stat">
            <div className="day-bar-container">
            <div 
              className="day-bar" 
              style={{ height: `${height}%` }}
            />
            </div>
            <div className="day-count">{day.count}</div>
            <div className="day-label">{day.day}</div>
          </div>
          );
        })}
        </div>
      </div>
      )}

      {sessions.length === 0 && (
      <div className="empty-state">
        <p>Pas encore de statistiques</p>
        <p className="empty-hint">Créez des sessions pour voir vos statistiques</p>
      </div>
      )}
    </div>
    );
};

export default Statistics;
