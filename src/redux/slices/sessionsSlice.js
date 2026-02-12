import { createSlice } from '@reduxjs/toolkit';

/**
 * Slice Redux pour les sessions de révision
 * ✅ Gestion des sessions d'étude
 * ✅ Suivi de progression
 */

const loadSessions = () => {
  try {
    const sessions = localStorage.getItem('sessions');
    return sessions ? JSON.parse(sessions) : [];
  } catch {
    return [];
  }
};

const saveSessions = (sessions) => {
  localStorage.setItem('sessions', JSON.stringify(sessions));
};

const sessionsSlice = createSlice({
  name: 'sessions',
  initialState: {
    items: loadSessions(),
  },
  reducers: {
    addSession: (state, action) => {
      const newSession = {
        id: Date.now(),
        subjectId: action.payload.subjectId,
        title: action.payload.title,
        date: action.payload.date,
        duration: action.payload.duration, // en minutes
        completed: false,
        notes: action.payload.notes || '',
        createdAt: new Date().toISOString(),
      };
      state.items.push(newSession);
      saveSessions(state.items);
    },
    
    updateSession: (state, action) => {
      const index = state.items.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
        saveSessions(state.items);
      }
    },
    
    toggleSessionComplete: (state, action) => {
      const session = state.items.find(s => s.id === action.payload);
      if (session) {
        session.completed = !session.completed;
        session.completedAt = session.completed ? new Date().toISOString() : null;
        saveSessions(state.items);
      }
    },
    
    deleteSession: (state, action) => {
      state.items = state.items.filter(s => s.id !== action.payload);
      saveSessions(state.items);
    },
    
    clearSessions: (state) => {
      state.items = [];
      saveSessions([]);
    },
  },
});

export const { 
  addSession, 
  updateSession, 
  toggleSessionComplete, 
  deleteSession, 
  clearSessions 
} = sessionsSlice.actions;

export default sessionsSlice.reducer;

// Selecteurs
export const selectAllSessions = (state) => state.sessions.items;

export const selectSessionsBySubject = (state, subjectId) =>
  state.sessions.items.filter(s => s.subjectId === subjectId);

export const selectCompletedSessions = (state) =>
  state.sessions.items.filter(s => s.completed);

export const selectUpcomingSessions = (state) => {
  const now = new Date();
  return state.sessions.items
    .filter(s => !s.completed && new Date(s.date) >= now)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
};
