# Poodle - A Dog Breed App 🐶

Discover various dog breeds, find your favorites, and explore the world of our furry friends.

## Features

- Authenticate and manage user sessions.
- Fetch and display a list of dog breeds.
- Allow users to like and manage their favorite breeds.

## Installation Guide

### 1. Clone the repository

```bash
git  clone  https://github.com/frsmlk/poodle.git
cd  dog-breed-app
```

### 2. Install dependencies

Using npm:

```bash
npm  install
```

### 3. Setup Firebase Configuration

- Navigate to your Firebase Console.
- Set up Firebase Authentication and Firestore.
- In the Project Settings, find the "Your apps" card. This section has your app's Firebase SDK configuration details.

### 4. Environment Variables Setup

- Rename `.env.example` to `.env`.
- Populate the `.env` with your Firebase SDK details

```bash
VITE_REACT_APP_FIREBASE_API_KEY=your_api_key_here VITE_REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain_here VITE_REACT_APP_FIREBASE_PROJECT_ID=your_project_id_here ... # And so on
```

### 5. Run the Application

```bash
npm run dev
```
