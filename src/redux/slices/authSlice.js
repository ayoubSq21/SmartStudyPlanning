import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/**
 * Slice Redux pour l'authentification
 * ✅ createSlice (Redux Toolkit)
 * ✅ createAsyncThunk pour les actions asynchrones
 */

// Thunk asynchrone pour la connexion (simulation API)
export const loginAsync = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (username && password.length >= 4) {
        return {
          id: Date.now(),
          username,
          email: `${username}@student.com`,
        };
      } else {
        return rejectWithValue('Identifiants invalides');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk pour l'inscription
export const registerAsync = createAsyncThunk(
  'auth/register',
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (username && email && password.length >= 4) {
        return {
          id: Date.now(),
          username,
          email,
        };
      } else {
        return rejectWithValue('Données invalides');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isLoading: false,
    error: null,
  },
  reducers: {
    // Actions synchrones
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(registerAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
