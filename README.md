# 📝 TaskMaster - Application TODO Full Stack

> Application de gestion de tâches moderne avec authentification JWT, backend Node.js/Express et frontend React/Tailwind CSS.

**Auteur:** Assane Oumazize  
**Repository:** https://github.com/oumazizefeveo/Todo_App

![React](https://img.shields.io/badge/React-18.3-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue?logo=tailwindcss)

---

## ✨ Fonctionnalités

### 🔐 Authentification
- Inscription et connexion avec JWT
- Routes protégées
- Déconnexion automatique
- Gestion de session persistante (localStorage)

### 📋 Gestion des tâches
- Créer, modifier, supprimer des tâches
- Marquer comme complétée
- Filtrer par statut (toutes, actives, complétées)
- Recherche en temps réel
- Priorités (basse, moyenne, haute)
- Dates d'échéance

### 🎨 Interface moderne
- Design responsive (mobile, tablet, desktop)
- Thème sombre élégant
- Animations fluides
- 100% Tailwind CSS (sans DaisyUI)

---

## 🚀 Installation

### Prérequis
- Node.js (v16+)
- MongoDB (local ou Atlas)
- npm ou yarn

### 1️⃣ Backend

```bash
# Installer les dépendances
npm install

# Créer le fichier .env
cp .env.example .env

# Configurer les variables d'environnement
# .env:
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/api_todo
JWT_SECRET=votre_secret_super_securise
FRONTEND_URL=http://localhost:5173

# Démarrer MongoDB (Windows)
net start MongoDB

# Lancer le serveur
npm run dev
```

**Backend accessible sur:** http://localhost:3000

### 2️⃣ Frontend

```bash
# Aller dans le dossier client
cd client

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

**Frontend accessible sur:** http://localhost:5173

---

## 📡 API Routes

### Authentification
| Méthode | Route | Description | Auth |
|---------|-------|-------------|------|
| POST | `/api/auth/register` | Inscription | ❌ |
| POST | `/api/auth/login` | Connexion (retourne JWT) | ❌ |
| GET | `/api/auth/me` | Profil utilisateur | ✅ |

### Tâches
| Méthode | Route | Description | Auth |
|---------|-------|-------------|------|
| GET | `/api/tasks` | Liste des tâches | ✅ |
| GET | `/api/tasks/:id` | Détail d'une tâche | ✅ |
| POST | `/api/tasks` | Créer une tâche | ✅ |
| PUT | `/api/tasks/:id` | Modifier une tâche | ✅ |
| DELETE | `/api/tasks/:id` | Supprimer une tâche | ✅ |

---

## 🛠️ Technologies

### Backend
- **Node.js** + **Express.js** - Serveur API REST
- **MongoDB** + **Mongoose** - Base de données NoSQL
- **JWT** (jsonwebtoken) - Authentification
- **bcryptjs** - Hashage des mots de passe
- **CORS** - Gestion des requêtes cross-origin
- **dotenv** - Variables d'environnement

### Frontend
- **React 18** - Bibliothèque UI
- **Vite** - Build tool ultra-rapide
- **React Router DOM** - Navigation
- **Axios** - Requêtes HTTP
- **Tailwind CSS** - Framework CSS utility-first
- **Context API** - Gestion d'état globale

---

## 📁 Structure du projet

```
api_rest_final/
├── 📂 client/                    # Frontend React
│   ├── 📂 src/
│   │   ├── 📂 components/
│   │   │   ├── 📂 Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── 📂 context/
│   │   │   └── AuthContext.jsx
│   │   ├── 📂 services/
│   │   │   └── api.js
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
├── 📂 controllers/               # Logique métier
│   ├── authController.js
│   └── taskController.js
├── 📂 middleware/                # Middlewares Express
│   └── authMiddleware.js
├── 📂 models/                    # Modèles Mongoose
│   ├── User.js
│   └── Task.js
├── 📂 routes/                    # Routes API
│   ├── authRoutes.js
│   └── taskRoutes.js
├── 📂 scripts/                   # Scripts utilitaires
│   ├── dump.js
│   └── restore.js
├── app.js                        # Point d'entrée backend
├── .env.example
├── package.json
└── README.md
```

---

## 🎨 Palette de couleurs

- **Fond principal:** `#1a202c` (gray-900)
- **Cards/Containers:** `#2d3748` (gray-800)
- **Inputs:** `#4a5568` (gray-700)
- **Primary:** `#3b82f6` (blue-500)
- **Success:** `#10b981` (green-500)
- **Warning:** `#f59e0b` (yellow-500)
- **Error:** `#ef4444` (red-500)

---

## 🧪 Tests

Importer le fichier `Postman_test` dans Postman pour tester l'API.

---

## 💾 Base de données

```bash
# Créer un dump de la base de données
npm run db:dump

# Restaurer un dump
npm run db:restore
```

---

## 🚀 Déploiement

### Option recommandée (Gratuit)

**Backend:** Render.com  
**Frontend:** Vercel  
**Database:** MongoDB Atlas

### Variables d'environnement

**Backend (.env):**
```env
PORT=3000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/todo
JWT_SECRET=secret_super_fort_123
FRONTEND_URL=https://votre-app.vercel.app
NODE_ENV=production
```

**Frontend (.env.production):**
```env
VITE_API_URL=https://votre-api.onrender.com/api
```

---

## ✅ Conformité

✅ Exercice 2.2 - Authentification JWT  
✅ Exercice 2.3 - MongoDB  
✅ Exercice 3.1 - Interface TODO React
✅ Exercice 3.2 - Authentification Frontend
✅ Frontend React avec Tailwind CSS  
✅ Routes protégées  
✅ CRUD complet  
✅ Design responsive

---

## 📝 Licence

Projet pédagogique Feveo - 2025

---

## 👤 Auteur

**Assane Oumazize**  
GitHub: [@oumazizefeveo](https://github.com/oumazizefeveo)
