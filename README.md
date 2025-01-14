# Projet React Native avec Backend Node.js

Ce projet est une application React Native utilisant Expo pour le frontend et un backend Node.js connecté à une base de données MongoDB.

## Table des matières

- [Prérequis](#prérequis)
- [Installation](#installation)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Configuration des variables d'environnement](#configuration-des-variables-denvironnement)
- [Lancement du projet](#lancement-du-projet)
  - [Lancer le backend](#lancer-le-backend)
  - [Lancer le frontend](#lancer-le-frontend)
- [Technologies utilisées](#technologies-utilisées)

---

## Prérequis

Assurez-vous d'avoir installé les outils suivants :

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://expo.dev/)
- [MongoDB](https://www.mongodb.com/try/download/community)

---

## Installation

### Backend
1. Accédez au dossier backend :
```bash
cd backend
```
2. Installez les dépendances :
```bash
npm install
```
3. Configurez MongoDB :
>Assurez-vous que MongoDB est installé et en cours d'exécution sur votre machine.
>Par défaut, le backend utilise l'URL locale de MongoDB (mongodb://localhost:27017).

---

### Frontend
1. Accédez au dossier frontend :
```bash
cd frontend
```
2. Installez les dépendances :
```bash
npm install
```
3. Installez les plugins nécessaires :
```bash
expo install react-native-dotenv
```

---

## Configuration des variables d'environnement

### Backend
Aucune configuration spécifique des variables d'environnement n'est nécessaire pour MongoDB si vous utilisez une instance locale.

### Frontend
1. Créez un fichier .env à la racine du dossier frontend.

2. Ajoutez l'URL de votre backend dans le fichier .env :

```env
BACKEND_URL=http://192.168.1.100:5000
```
Remarque : Remplacez 192.168.1.100 par l'adresse IP locale de votre machine.

3. Assurez-vous que le fichier .env est bien configuré et que les variables sont accessibles dans le code. Exemple dans frontend :

```javascript
import { BACKEND_URL } from '@env';

console.log(BACKEND_URL); // Devrait afficher l'URL du backend
```
4. Ajoutez le fichier .env à votre .gitignore pour éviter de le partager sur des plateformes publiques :

```bash
echo ".env" >> .gitignore
```

---

## Lancement du projet

### Lancer le backend
1. Accédez au dossier backend :
```bash
cd backend
```
2. Lancez le serveur Node.js :
```bash
node server.js
```
3. Le serveur écoute par défaut sur le port 5000.

---

### Lancer le frontend
1. Accédez au dossier frontend :
```bash
cd frontend
```
2. Lancez le projet Expo :
```bash
expo start
```
3. Scannez le QR code généré avec l'application Expo Go sur votre iPhone pour lancer l'application.

---

## Technologies utilisées

- Frontend :
    - React Native
    - Expo
    - Axios
    - react-native-dotenv
- Backend :
    - Node.js
    - Express.js
    - MongoDB
    - Mongoose
    - CORS