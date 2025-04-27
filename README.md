# Portfolio Ingénierie du Web - ESGI 5IW2
# Nom de projet : Studolio

---

## Membres du Groupe
- **DA SILVA SOUSA Pedro**
- **MAGANGA Inès**

---

## Description
Ce projet vise à développer un **portfolio interactif** pour la filière Ingénierie du Web de l'ESGI. L'objectif est de présenter les projets des étudiants lors des salons et JPO.

Le projet est divisé en **deux parties** :
- **Un portfolio** accessible au public pour voir et liker les projets.
- **Une interface administrateur** permettant de gérer les projets et visualiser les statistiques.

---

## Fonctionnalités

### Portfolio
- Voir la liste des projets publiés.
- Voir le détail d'un projet (nom, description, technos, lien, images, promotion, étudiants, catégorisation).
- Liker un projet.
- Rechercher un projet via mots-clés.

### Interface Administrateur
- **Gérer les projets** :
  - Créer, modifier, cacher un projet.
  - Ajouter des commentaires visibles uniquement par les administrateurs.
- **Recherche avancée** : Trouver un projet par mots-clés.
- **Visualisation des statistiques** :
  - Nombre de projets.
  - Nombre de likes.
  - Répartition des projets par catégorie.
- **Sécurisation** :
  - Authentification des administrateurs.
  - Gestion des droits d'accès.
  - Hashage des mots de passe.

---

## Technologies Utilisées

### Backend
- **FastAPI** (API pour interagir avec Airtable)
- **JWT + bcrypt + Jose** (authentification et sécurité des mots de passe)

### Base de Données
- **Airtable** (Stockage des projets et interactions API)

### Frontend
- **React (React Router v7)** (Portfolio et Interface admin)
- **TailwindCSS** (Design moderne et responsive)
- **Chart.js** (Dashboard et statistiques)

### Autres
- **.env.local** (Gestion des clés API en variables d'environnement)
- **docker** (Conteneurisation des différents services Front-End / Back-End)

---

## Installation et Lancement

### Prérequis
```bash
# Cloner le projet.
git clone git@github.com:PedroDSS/studolio.git
```

### Installation
```bash
docker compose build || docker compose up --build -d
```

### Configuration
```bash
# Remplir un .env en se basant sur le .env.local
```

### Lancer le projet
```bash
docker compose up || docker compose up --build -d
```

### Remplir la base de données
```bash
# NOTE: il est possible qu'il ne soit plus fonctionnel.
docker exec -it backend python3 -m seeders.seeds
```
---

**Projet réalisé dans le cadre du cours Airtable Avancée - ESGI 5IW2**