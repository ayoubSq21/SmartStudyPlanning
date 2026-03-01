import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSession, toggleSessionComplete, deleteSession, selectAllSessions } from '../redux/slices/sessionsSlice';
import { selectAllSubjects } from '../redux/slices/subjectsSlice';
import { validators, validateForm } from '../utils/validators';
import '../styles/Sessions.css';
import { FiCheck, FiTrash2 , FiCalendar , FiEdit , FiRefreshCw,FiMapPin } from 'react-icons/fi';
import { FaMapPin } from "react-icons/fa"

const Sessions = () => {
  const dispatch = useDispatch();
  const sessions = useSelector(selectAllSessions);
  const subjects = useSelector(selectAllSubjects);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    subjectId: '',
    title: '',
    date: '',
    duration: '60',
    notes: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const resetForm = () => {
    setFormData({
      subjectId: '',
      title: '',
      date: '',
      duration: '60',
      notes: ''
    });
    setFormErrors({});
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationRules = {
      subjectId: validators.required,
      title: validators.required,
      date: [validators.required, validators.futureDate],
      duration: [validators.required, validators.positiveNumber]
    };

    const { errors, isValid } = validateForm(formData, validationRules);

    if (!isValid) {
      setFormErrors(errors);
      return;
    }

    dispatch(addSession({
      ...formData,
      subjectId: Number(formData.subjectId),
      duration: Number(formData.duration)
    }));

    resetForm();
  };

  const handleToggleComplete = (sessionId) => {
    dispatch(toggleSessionComplete(sessionId));
  };

  const handleDelete = (sessionId) => {
    if (window.confirm('Supprimer cette session ?')) {
      dispatch(deleteSession(sessionId));
    }
  };

  const getSubjectById = (id) => subjects.find(s => s.id === id);

  // Grouper les sessions par statut
  const upcomingSessions = sessions.filter(s => !s.completed && new Date(s.date) >= new Date());
  const completedSessions = sessions.filter(s => s.completed);

  return (
    <div className="sessions-page">
      <div className="page-header">
        <h1><FiCalendar /> Mes Sessions de Révision</h1>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Annuler' : '+ Nouvelle session'}
        </button>
      </div>

      {subjects.length === 0 && (
        <div className="warning-banner">
          ⚠️ Vous devez d'abord ajouter des matières avant de créer des sessions
        </div>
      )}

      {showForm && subjects.length > 0 && (
        <div className="session-form-card">
          <h3>Planifier une session</h3>
          <form onSubmit={handleSubmit} className="session-form">
            <div className="form-group">
              <label htmlFor="subjectId">Matière *</label>
              <select
                id="subjectId"
                name="subjectId"
                value={formData.subjectId}
                onChange={handleChange}
                className={formErrors.subjectId ? 'error' : ''}
              >
                <option value="">Sélectionner une matière</option>
                {subjects.map(subject => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
              {formErrors.subjectId && (
                <span className="error-message">{formErrors.subjectId}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="title">Titre de la session *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ex: Révision chapitre 3"
                className={formErrors.title ? 'error' : ''}
              />
              {formErrors.title && (
                <span className="error-message">{formErrors.title}</span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Date et heure *</label>
                <input
                  type="datetime-local"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={formErrors.date ? 'error' : ''}
                />
                {formErrors.date && (
                  <span className="error-message">{formErrors.date}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="duration">Durée (minutes) *</label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  min="15"
                  step="15"
                  className={formErrors.duration ? 'error' : ''}
                />
                {formErrors.duration && (
                  <span className="error-message">{formErrors.duration}</span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="notes">Notes (optionnel)</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Objectifs, chapitres à revoir..."
                rows="3"
              />
            </div>

            <div className="form-actions">
              <button type="button" onClick={resetForm} className="btn-secondary">
                Annuler
              </button>
              <button type="submit" className="btn-primary">
                Créer la session
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Sessions à venir */}
        {upcomingSessions.length > 0 && (
          <div className="sessions-section">
            <h2><FaMapPin /> À venir ({upcomingSessions.length})</h2>
            <div className="sessions-list">
              {upcomingSessions.map(session => {
              const subject = getSubjectById(session.subjectId);
              // Then replace the selection with:
                      return (
                        <div key={session.id} className="session-item">
                          <div 
                            className="session-color" 
                            style={{ backgroundColor: subject?.color }}
                          />
                          <div className="session-details">
                            <h4>{session.title}</h4>
                            <p className="session-subject">{subject?.name}</p>
                            <p className="session-datetime">
                              <FiCalendar size={16} /> {new Date(session.date).toLocaleString('fr-FR')} • {session.duration} min
                            </p>
                            {session.notes && <p className="session-notes"><FiEdit size={16} /> {session.notes}</p>}
                          </div>
                          <div className="session-actions">
                            <button
                              onClick={() => handleToggleComplete(session.id)}
                              className="btn-complete"
                              title="Marquer comme fait"
                            >
                              <FiCheck size={20} />
                            </button>
                            <button
                              onClick={() => handleDelete(session.id)}
                              className="btn-delete"
                              title="Supprimer"
                            >
                              <FiTrash2 size={20} />
                            </button>
                          </div>
                        </div>
                      );
            })}
          </div>
        </div>
      )}

        
        {completedSessions.length > 0 && (
          <div className="sessions-section">
            <h2><FiCheck /> Complétées ({completedSessions.length})</h2>
            <div className="sessions-list">
          {completedSessions.map(session => {
              const subject = getSubjectById(session.subjectId);
              return (
                <div key={session.id} className="session-item completed">
                  <div 
                    className="session-color" 
                    style={{ backgroundColor: subject?.color }}
                  />
                  <div className="session-details">
                    <h4>{session.title}</h4>
                    <p className="session-subject">{subject?.name}</p>
                    <p className="session-datetime">
                      <FiCalendar size={16} /> {new Date(session.date).toLocaleString('fr-FR')} • {session.duration} min
                    </p>
                  </div>
                  <div className="session-actions">
                    <button
                      onClick={() => handleToggleComplete(session.id)}
                      className="btn-undo"
                      title="Marquer comme non fait"
                    >
                      <FiRefreshCw size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(session.id)}
                      className="btn-delete"
                      title="Supprimer"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {sessions.length === 0 && (
        <div className="empty-state">
          <p>📅 Aucune session planifiée</p>
          <p className="empty-hint">Créez votre première session de révision</p>
        </div>
      )}
    </div>
  );
};

export default Sessions;
