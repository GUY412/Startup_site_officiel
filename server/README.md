# OKNOK — API devis & admin

Petit backend Node/Express + SQLite (base `node:sqlite`, native à Node — aucune dépendance à compiler).

## Démarrage

```bash
cd server
npm install
cp .env.example .env   # puis modifie JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
npm run seed-admin      # crée le compte admin à partir de .env
npm run dev             # démarre l'API sur http://localhost:4001
```

## Endpoints

| Méthode | Route              | Accès  | Description                          |
|---------|---------------------|--------|---------------------------------------|
| POST    | `/api/devis`         | public | Enregistre une demande de devis       |
| POST    | `/api/auth/login`    | public | Connexion admin (retourne un JWT)     |
| GET     | `/api/devis`          | admin  | Liste toutes les demandes             |
| PATCH   | `/api/devis/:id`      | admin  | Change le statut d'une demande        |
| DELETE  | `/api/devis/:id`      | admin  | Supprime une demande                  |

Les routes admin attendent un header `Authorization: Bearer <token>`.

## Déploiement

Ce serveur est un simple process Node — déployable sur Render, Railway, Fly.io ou un VPS.
La base SQLite vit dans `server/data/oknok.db` : pensez à un disque persistant si l'hébergeur
utilise un système de fichiers éphémère.
