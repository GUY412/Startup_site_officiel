# OKNOK — site vitrine

Site vitrine / portfolio pour OKNOK (React + Vite), avec un panel admin pour recevoir les
demandes de devis envoyées depuis le formulaire de contact.

## Structure

- `src/` — le site (React + React Router, pas de framework CSS)
- `server/` — API Node/Express + SQLite qui reçoit les devis et sert le panel admin (voir
  [server/README.md](server/README.md) pour les détails)

## Démarrage en local

Deux process à lancer en parallèle :

```bash
# 1. L'API (une fois configurée — voir server/README.md)
cd server
npm install
npm run dev

# 2. Le site
npm install
npm run dev
```

Le site tourne sur `http://localhost:5173` (ou un port libre choisi automatiquement) et l'API sur
`http://localhost:4001`. L'URL de l'API utilisée par le site se configure dans `.env`
(`VITE_API_URL`, voir `.env.example`).

## Panel admin

Accessible sur `/admin` — protégé par connexion (email/mot de passe créés via
`npm run seed-admin` dans `server/`). Permet de consulter les demandes de devis, changer leur
statut (Nouveau / Contacté / Archivé) et les supprimer.

## Déploiement

Le site est une SPA statique (`npm run build` → dossier `dist/`), déployable sur Netlify, Vercel
ou tout hébergeur statique. L'API (`server/`) est un process Node séparé à déployer sur un
hébergeur Node (Render, Railway, VPS…) — pensez à un disque persistant pour la base SQLite.
