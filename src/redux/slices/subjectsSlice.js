import { createSlice } from '@reduxjs/toolkit';

/**
 * Slice Redux pour les matières
 * ✅ CRUD complet
 * ✅ Gestion du localStorage
 */

const loadSubjects = () => {
  try {
    const subjects = localStorage.getItem('subjects');
    return subjects ? JSON.parse(subjects) : [];
  } catch {
    return [];
  }
};

const saveSubjects = (subjects) => {
  localStorage.setItem('subjects', JSON.stringify(subjects));
};

const subjectsSlice = createSlice({
  name: 'subjects',
  initialState: {
    items: loadSubjects(),
  },
  reducers: {
    addSubject: (state, action) => {
      const newSubject = {
        id: Date.now(),
        name: action.payload.name,
        color: action.payload.color,
        examDate: action.payload.examDate,
        priority: action.payload.priority || 'medium',
        createdAt: new Date().toISOString(),
      };
      state.items.push(newSubject);
      saveSubjects(state.items);
    },
    
    updateSubject: (state, action) => {
      const index = state.items.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
        saveSubjects(state.items);
      }
    },
    
    deleteSubject: (state, action) => {
      state.items = state.items.filter(s => s.id !== action.payload);
      saveSubjects(state.items);
    },
    
    clearSubjects: (state) => {
      state.items = [];
      saveSubjects([]);
    },
  },
});

export const { addSubject, updateSubject, deleteSubject, clearSubjects } = subjectsSlice.actions;
export default subjectsSlice.reducer;

// Selecteurs
export const selectAllSubjects = (state) => state.subjects.items;
export const selectSubjectById = (state, subjectId) => 
  state.subjects.items.find(s => s.id === subjectId);
