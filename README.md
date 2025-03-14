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

**Base de données** : AirTable
**Back End** : Bun (ou Node.js si ça fonctionne pas)
**Front End | PortFolio** : Nuxt.JS
**Front End | Admin** : React (React Router v7)
**Docker**

### Backend
- **Bun ou Node.js + Express** (API pour interagir avec Airtable)
- **JWT + bcrypt** (authentification et sécurité des mots de passe)

### Base de Données
- **Airtable** (Stockage des projets et interactions API)

### Frontend
- **React (React Router v7)** (Interface admin)
- **Nuxt.JS** (Portfolio)
- **TailwindCSS** (Design moderne et responsive)
- **Recharts / Chart.js** (Dashboard et statistiques)

### Autres
- **.env.local** (Gestion des clés API en variables d'environnement)
- **docker** (Conteneurisation des différents services Front-End / Back-End)

---

## Installation et Lancement

### Prérequis
```bash
To be determined.
```

### Installation
```bash
To be determined.
```

### Configuration
```bash
To be determined.
```

### Lancer le projet
```bash
To be determined.
```

---

**Projet réalisé dans le cadre du cours Airtable Avancée - ESGI 5IW2**

