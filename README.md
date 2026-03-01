## Smart Study Planner - Application React Complète

## 🎯 Description du Projet

**Smart Study Planner** est une application web complète développée en React qui aide les étudiants à organiser leurs révisions de manière intelligente. L'application permet de gérer des matières, planifier des sessions de révision, et suivre sa progression avec des statistiques détaillées.

## ✨ Fonctionnalités Principales

### 🔐 Authentification
- **Connexion** avec validation de formulaire
- **Inscription** avec vérification des mots de passe
- **Déconnexion** sécurisée
- Routes protégées (accès uniquement si connecté)
- **JWT (JSON Web Token)** pour la gestion sécurisée des sessions
- Token stocké dans le `localStorage` et vérifié à chaque accès
- Expiration automatique du token (1h)
  
### 📚 Gestion des Matières
- Ajouter/modifier/supprimer des matières
- Assigner une couleur à chaque matière
- Définir une date d'examen
- Définir une priorité (faible, moyenne, haute)

### 📅 Planning de Révision
- Créer des sessions de révision
- Associer chaque session à une matière
- Définir date, heure et durée
- Ajouter des notes personnelles
- Marquer les sessions comme complétées

### 📊 Statistiques
- Vue d'ensemble des révisions
- Statistiques par matière
- Taux de complétion
- Temps total d'étude
- Répartition par jour de la semaine

### 🎨 Interface Utilisateur
- **Dark/Light Mode** avec changement en temps réel
- **Multilingue** (Français/Anglais)
- Design responsive (mobile, tablette, desktop)
- Animations fluides
- Interface intuitive

---

## 🧠 Notions React Couvertes

### ✅ Hooks React
1. **useState** - Gestion d'état local
   - Formulaires (Login, Register, Subjects, Sessions)
   - Affichage conditionnel (modales, formulaires)
   
2. **useEffect** - Effets de bord
   - Sauvegarde dans localStorage
   - Mise à jour du thème (body className)

3. **useContext** - Contexte global
   - `ThemeContext` pour le thème (dark/light)
   - `LanguageContext` pour la langue (FR/EN)

4. **useMemo** - Optimisation des calculs
   - Statistiques complexes (Dashboard.js, Statistics.js)
   - Filtrage et tri des données

5. **useCallback** - Optimisation des fonctions
   - Handlers de formulaires
   - Fonctions d'authentification (useAuth hook)

6. **Custom Hooks**
   - `useLocalStorage` - Persistance des données
   - `useAuth` - Logique d'authentification

### ✅ Redux Toolkit
1. **Store Configuration**
   - Configuration avec `configureStore`
   - Middleware intégré
   - DevTools automatique

2. **Slices**
   - `authSlice` - Authentification
   - `subjectsSlice` - Matières
   - `sessionsSlice` - Sessions

3. **Actions Asynchrones**
   - `createAsyncThunk` pour simuler des appels API
   - Gestion du loading et des erreurs

4. **Selectors**
   - Sélecteurs simples et dérivés
   - Optimisation des performances

### ✅ React Router v6
1. **Navigation**
   - `BrowserRouter` pour le routing
   - `Routes` et `Route` pour définir les routes
   - `NavLink` pour la navigation active

2. **Protection des Routes**
   - `ProtectedRoute` component
   - Redirection automatique si non authentifié

3. **Hooks de Navigation**
   - `useNavigate` pour la navigation programmatique

### ✅ Validation de Formulaires
- Validation personnalisée (validators.js)
- Messages d'erreur dynamiques
- Validation en temps réel
- Règles de validation réutilisables

### ✅ LocalStorage
- Persistance des données utilisateur
- Sauvegarde automatique
- Récupération au chargement

---

## 📁 Structure du Projet

```
smart-study-planner/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js              # Barre de navigation
│   │   └── ProtectedRoute.js      # Route protégée
│   ├── contexts/
│   │   ├── ThemeContext.js        # Context pour le thème
│   │   └── LanguageContext.js     # Context pour la langue
│   ├── hooks/
│   │   ├── useLocalStorage.js     # Hook personnalisé localStorage
│   │   └── useAuth.js             # Hook personnalisé authentification
│   ├── pages/
│   │   ├── Login.js               # Page de connexion
│   │   ├── Register.js            # Page d'inscription
│   │   ├── Dashboard.js           # Tableau de bord
│   │   ├── Subjects.js            # Gestion des matières
│   │   ├── Sessions.js            # Gestion des sessions
│   │   └── Statistics.js          # Statistiques
│   ├── redux/
│   │   ├── store.js               # Configuration du store Redux
│   │   └── slices/
│   │       ├── authSlice.js       # Slice authentification
│   │       ├── subjectsSlice.js   # Slice matières
│   │       └── sessionsSlice.js   # Slice sessions
│   ├── styles/
│   │   ├── Auth.css
│   │   ├── Dashboard.css
│   │   ├── Navbar.css
│   │   ├── Sessions.css
│   │   ├── Statistics.css
│   │   └── Subjects.css
│   ├── utils/
│   │   └── validators.js          # Utilitaires de validation
│   ├── App.js                     # Composant racine
│   ├── App.css                    # Styles globaux
│   ├── index.js                   # Point d'entrée
│   └── index.css
├── package.json
└── README.md
```

---

## 🚀 Installation et Lancement

### Prérequis
- Node.js (version 14+)
- npm ou yarn

### Installation

```bash
# Cloner ou télécharger le projet
cd smart-study-planner

# Installer les dépendances
npm install

# Lancer l'application en mode développement
npm start
```

L'application s'ouvrira automatiquement sur `http://localhost:3000`

### Scripts Disponibles

```bash
npm start      # Lance l'application en mode développement
npm build      # Compile l'application pour la production
npm test       # Lance les tests
```

---

## 📝 Guide d'Utilisation

### 1. Inscription/Connexion
- Créez un compte avec un nom d'utilisateur, email et mot de passe (min 4 caractères)
- Ou connectez-vous avec vos identifiants

### 2. Ajouter des Matières
- Cliquez sur "Ajouter une matière"
- Remplissez le nom, choisissez une couleur, la date d'examen et la priorité
- Validez le formulaire

### 3. Planifier des Sessions
- Allez dans "Sessions"
- Cliquez sur "Nouvelle session"
- Sélectionnez la matière, donnez un titre, définissez date/heure et durée
- Ajoutez des notes si nécessaire

### 4. Suivre sa Progression
- Marquez les sessions comme complétées (✓)
- Consultez les statistiques dans l'onglet "Statistiques"
- Visualisez votre progression par matière

### 5. Personnalisation
- Changez le thème (🌙/☀️)
- Changez la langue (🇫🇷/🇬🇧)

---

## 🎨 Thèmes et Design

### Light Mode
- Fond clair et épuré
- Excellent contraste pour la lecture
- Idéal pour le jour

### Dark Mode
- Réduit la fatigue oculaire
- Idéal pour les sessions d'étude nocturnes
- Interface moderne et élégante

---

## 📊 Démonstration des Concepts


### Redux Toolkit - Slice
```javascript
const subjectsSlice = createSlice({
  name: 'subjects',
  initialState: { items: [] },
  reducers: {
    addSubject: (state, action) => {
      state.items.push(action.payload);
    }
  }
});
```

### Async Thunk
```javascript
export const loginAsync = createAsyncThunk(
  'auth/login',
  async ({ username, password }) => {
    // Simulation API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { id: Date.now(), username };
  }
);
```

---


### ✅ Architecture Propre
- Séparation des responsabilités
- Code organisé et modulaire
- Réutilisabilité des composants

### ✅ Bonnes Pratiques
- Custom Hooks pour la logique réutilisable
- Validation de formulaires robuste
- Gestion d'erreurs
- LocalStorage pour la persistance

### ✅ Performance
- useMemo pour optimiser les calculs
- useCallback pour éviter les re-renders
- Lazy loading potentiel (peut être ajouté)

### ✅ UX/UI
- Design responsive
- Animations fluides
- Feedback utilisateur (loading, erreurs)
- Accessibilité

### ✅ État Global
- Redux Toolkit bien structuré
- Context API pour les préférences UI
- Synchronisation avec localStorage


## 📚 Dépendances Utilisées

```json
{
  "@reduxjs/toolkit": "^2.0.1",      // State management
  "react": "^18.2.0",                 // Framework
  "react-dom": "^18.2.0",             // DOM rendering
  "react-redux": "^9.0.4",            // Redux bindings
  "react-router-dom": "^6.21.0"      // Routing
}
```

---


---

## 🎯 Conclusion

Ce projet **Smart Study Planner** démontre une maîtrise complète de l'écosystème React moderne :
- ✅ Tous les hooks React essentiels
- ✅ Redux Toolkit complet
- ✅ React Router v6
- ✅ Custom Hooks
- ✅ Context API
- ✅ Validation de formulaires
- ✅ LocalStorage
- ✅ Dark/Light mode
- ✅ Responsive design


