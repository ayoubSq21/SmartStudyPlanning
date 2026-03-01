import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fonction utilitaire pour générer un faux JWT (simulation)
// En vrai projet, le serveur te renvoie ce token automatiquement
const generateFakeJWT = (payload) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = btoa(JSON.stringify({ ...payload, exp: Date.now() + 3600000 })); // expire dans 1h
  const signature = btoa('fake-signature-' + payload.id);
  return `${header}.${body}.${signature}`;
};

//  Fonction pour décoder le JWT et lire les infos dedans
export const decodeJWT = (token) => {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
};

// Fonction pour vérifier si le token est encore valide (pas expiré)
export const isTokenValid = (token) => {
  const decoded = decodeJWT(token);
  if (!decoded) return false;
  return decoded.exp > Date.now();
};

// Thunk asynchrone pour la connexion
export const loginAsync = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (username && password.length >= 4) {
        const user = {
          id: Date.now(),
          username,
          email: `${username}@student.com`,
        };

        //  Générer le JWT après connexion réussie
        const token = generateFakeJWT(user);

        return { user, token };
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
        const user = {
          id: Date.now(),
          username,
          email,
        };

        // Générer le JWT après inscription réussie
        const token = generateFakeJWT(user);

        return { user, token };
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
    // Charger le token depuis localStorage au démarrage
    // mais vérifier qu'il est encore valide
    token: (() => {
      const savedToken = localStorage.getItem('token');
      if (savedToken && isTokenValid(savedToken)) return savedToken;
      // Si token expiré, on nettoie
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return null;
    })(),
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null; // 
      localStorage.removeItem('user');
      localStorage.removeItem('token'); // ✅
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
        state.user = action.payload.user;
        state.token = action.payload.token; 
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
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
        state.user = action.payload.user;
        state.token = action.payload.token; 
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token); 
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;