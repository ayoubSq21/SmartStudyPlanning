import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSubject, updateSubject, deleteSubject, selectAllSubjects } from '../redux/slices/subjectsSlice';
import { validators, validateForm } from '../utils/validators';
import { FiBook, FiPlus, FiEdit2, FiTrash2, FiCalendar } from 'react-icons/fi';
import '../styles/Subjects.css';

/**
 * Page de gestion des matières
 * ✅ useCallback pour optimiser les handlers
 * ✅ CRUD complet
 */
const Subjects = () => {
  const dispatch = useDispatch();
  const subjects = useSelector(selectAllSubjects);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    color: '#3498db',
    examDate: '',
    priority: 'medium'
  });
  const [formErrors, setFormErrors] = useState({});

  const resetForm = useCallback(() => {
    setFormData({
      name: '',
      color: '#3498db',
      examDate: '',
      priority: 'medium'
    });
    setFormErrors({});
    setEditingId(null);
    setShowForm(false);
  }, []);

  const handleEdit = useCallback((subject) => {
    setFormData({
      name: subject.name,
      color: subject.color,
      examDate: subject.examDate,
      priority: subject.priority
    });
    setEditingId(subject.id);
    setShowForm(true);
  }, []);

  const handleDelete = useCallback((id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette matière ?')) {
      dispatch(deleteSubject(id));
    }
  }, [dispatch]);

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
      name: validators.required,
      examDate: [validators.required, validators.futureDate],
    };

    const { errors, isValid } = validateForm(formData, validationRules);

    if (!isValid) {
      setFormErrors(errors);
      return;
    }

    if (editingId) {
      dispatch(updateSubject({ id: editingId, ...formData }));
    } else {
      dispatch(addSubject(formData));
    }

    resetForm();
  };

  const priorityConfig = {
    low: { label: 'Faible', color: '#27ae60' },
    medium: { label: 'Moyenne', color: '#f39c12' },
    high: { label: 'Haute', color: '#e74c3c' }
  };

  return (
    <div className="subjects-page">
      <div className="page-header">
        <h1><FiBook /> Mes Matières</h1>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          <FiPlus />
          <span>{showForm ? 'Annuler' : 'Ajouter une matière'}</span>
        </button>
      </div>

      {showForm && (
        <div className="subject-form-card">
          <h3>{editingId ? 'Modifier la matière' : 'Nouvelle matière'}</h3>
          <form onSubmit={handleSubmit} className="subject-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Nom de la matière *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ex: Mathématiques"
                  className={formErrors.name ? 'error' : ''}
                />
                {formErrors.name && (
                  <span className="error-message">{formErrors.name}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="color">Couleur</label>
                <input
                  type="color"
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="examDate">Date d'examen *</label>
                <input
                  type="date"
                  id="examDate"
                  name="examDate"
                  value={formData.examDate}
                  onChange={handleChange}
                  className={formErrors.examDate ? 'error' : ''}
                />
                {formErrors.examDate && (
                  <span className="error-message">{formErrors.examDate}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="priority">Priorité</label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="low">Faible</option>
                  <option value="medium">Moyenne</option>
                  <option value="high">Haute</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={resetForm} className="btn-secondary">
                Annuler
              </button>
              <button type="submit" className="btn-primary">
                {editingId ? 'Mettre à jour' : 'Ajouter'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="subjects-grid">
        {subjects.length === 0 ? (
          <div className="empty-state">
            <FiBook size={64} color="var(--text-secondary)" />
            <p>Aucune matière ajoutée</p>
            <p className="empty-hint">Cliquez sur "Ajouter une matière" pour commencer</p>
          </div>
        ) : (
          subjects.map(subject => (
            <div key={subject.id} className="subject-card">
              <div 
                className="subject-color-bar" 
                style={{ backgroundColor: subject.color }}
              />
              <div className="subject-content">
                <h3>{subject.name}</h3>
                <div className="subject-priority" style={{ color: priorityConfig[subject.priority].color }}>
                  <span className="priority-dot" style={{ backgroundColor: priorityConfig[subject.priority].color }}></span>
                  {priorityConfig[subject.priority].label}
                </div>
                <p className="subject-exam">
                  <FiCalendar size={14} />
                  <span>Examen: {new Date(subject.examDate).toLocaleDateString('fr-FR')}</span>
                </p>
                <div className="subject-actions">
                  <button 
                    onClick={() => handleEdit(subject)}
                    className="btn-icon-edit"
                    title="Modifier"
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(subject.id)}
                    className="btn-icon-delete"
                    title="Supprimer"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Subjects;
