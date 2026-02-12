import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import subjectsReducer from './slices/subjectsSlice';
import sessionsReducer from './slices/sessionsSlice';

/**
 * Store Redux avec Redux Toolkit
 * ✅ Configuration simplifiée
 * ✅ DevTools intégrés
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    subjects: subjectsReducer,
    sessions: sessionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Pour permettre les dates
    }),
});

export default store;
