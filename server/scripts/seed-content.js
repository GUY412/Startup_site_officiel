// One-off migration: copies the placeholder projects/posts that used to live in the
// frontend's static data files into the database, so the site doesn't go blank the
// moment it switches to admin-managed content. Safe to re-run — it skips if rows exist.
import { db } from '../src/db.js'

const projectCount = db.prepare('SELECT COUNT(*) AS n FROM projects').get().n
if (projectCount === 0) {
  const insertProject = db.prepare(
    'INSERT INTO projects (title, category, description, display_order) VALUES (?, ?, ?, ?)',
  )
  const projects = [
    ['Réalisation à venir', 'Développement numérique', 'Un projet client sera présenté ici prochainement : contexte, solution apportée et résultats obtenus.'],
    ['Réalisation à venir', 'Cybersécurité', 'Audit de sécurité ou mission de pentesting — étude de cas détaillée à venir.'],
    ['Réalisation à venir', 'Design & Communication', 'Identité visuelle et campagne de communication digitale — étude de cas à venir.'],
    ['Réalisation à venir', 'Marketing & Croissance', 'Stratégie de prospection et de développement commercial — étude de cas à venir.'],
  ]
  projects.forEach(([title, category, description], i) => insertProject.run(title, category, description, i))
  console.log(`Seeded ${projects.length} projects.`)
} else {
  console.log('Projects table already has data, skipping.')
}

const postCount = db.prepare('SELECT COUNT(*) AS n FROM blog_posts').get().n
if (postCount === 0) {
  db.prepare(
    'INSERT INTO blog_posts (title, excerpt, published_at) VALUES (?, ?, ?)',
  ).run(
    'Bienvenue sur le blog OKNOK',
    'Retrouvez ici nos actualités, retours d’expérience sur nos projets, participations à des hackathons et réflexions sur l’innovation numérique en Afrique.',
    '2026-08-27 00:00:00',
  )
  console.log('Seeded 1 blog post.')
} else {
  console.log('Blog posts table already has data, skipping.')
}

const serviceCount = db.prepare('SELECT COUNT(*) AS n FROM services').get().n
if (serviceCount === 0) {
  const insertService = db.prepare(
    'INSERT INTO services (icon, title, description, items, tools, display_order) VALUES (?, ?, ?, ?, ?, ?)',
  )
  const services = [
    {
      icon: 'shield',
      title: 'Cybersécurité & réseaux',
      description: "Sécurisation des infrastructures numériques, audit et tests d'intrusion pour protéger vos systèmes.",
      items: ['Sécurité informatique et réseaux', 'Audit de sécurité Web', 'Analyse de vulnérabilités Web', 'Tests de sécurité / Pentesting', 'OSINT — reconnaissance et collecte d’informations', 'Analyse d’infrastructures réseau', 'CTF / challenges de cybersécurité'],
      tools: ['Kali Linux', 'VirtualBox', 'VMware', 'Nmap', 'NetDiscover', 'WHOIS', 'WhatWeb', 'Metasploit'],
    },
    {
      icon: 'palette',
      title: 'Design & multimédia',
      description: 'Création graphique et supports visuels pour donner une identité forte à votre marque.',
      items: ['Infographie', 'Création de visuels pour les réseaux sociaux', 'Retouche et modification d’images', 'Création de supports de communication', 'Conception de présentations', 'Multimédia et arts numériques'],
      tools: ['Photoshop', 'GIMP', 'Canva'],
    },
    {
      icon: 'megaphone',
      title: 'Communication digitale',
      description: 'Gestion et animation de vos réseaux sociaux avec une stratégie de contenu cohérente.',
      items: ['Community management', 'Gestion de pages Facebook, Instagram, TikTok, LinkedIn', 'Création de contenu digital', 'Rédaction de publications', 'Élaboration de calendriers éditoriaux', 'Stratégie de communication digitale', 'Animation de communautés', 'Veille digitale', 'Communication de marque', 'Création de campagnes de communication'],
      tools: [],
    },
    {
      icon: 'trending',
      title: 'Marketing & commercial',
      description: 'Prospection et développement commercial pour accélérer votre croissance.',
      items: ['Prospection commerciale et digitale', 'Recherche de prospects', 'Prise de contact avec des professionnels', 'Rédaction d’e-mails de prospection', 'Présentation de produits et services', 'Relation client', 'Téléprospection', 'Suivi commercial', 'Création de contenus promotionnels', 'Élaboration d’offres commerciales'],
      tools: [],
    },
    {
      icon: 'briefcase',
      title: 'Communication d’entreprise & B2B',
      description: 'Mise en valeur de vos produits et services auprès d’une clientèle professionnelle.',
      items: ['Promotion et mise en valeur de produits', 'Création de contenus produits', 'Rédaction de descriptifs commerciaux', 'Préparation de contenus pour devis', 'Communication B2B', 'Prospection d’architectes et promoteurs immobiliers', 'Communication sur les réseaux sociaux pour entreprises'],
      tools: [],
    },
    {
      icon: 'file',
      title: 'Bureautique',
      description: 'Production de documents professionnels clairs et bien structurés.',
      items: ['Création de documents professionnels', 'Mise en forme de documents', 'Création de présentations', 'Gestion et organisation de données'],
      tools: ['Microsoft Word', 'Microsoft Excel', 'Microsoft PowerPoint'],
    },
    {
      icon: 'rocket',
      title: 'Gestion de projets & entrepreneuriat',
      description: 'Accompagnement de projets numériques de l’idée à la réalisation.',
      items: ['Conception de projets numériques', 'Élaboration de projets startup', 'Participation à des hackathons', 'Présentation de projets', 'Recherche de solutions innovantes', 'Élaboration de stratégies de communication', 'Gestion de projets digitaux', 'Création d’idées et de solutions numériques'],
      tools: [],
    },
  ]
  services.forEach((s, i) =>
    insertService.run(s.icon, s.title, s.description, s.items.join('\n'), s.tools.join('\n'), i),
  )
  console.log(`Seeded ${services.length} services.`)
} else {
  console.log('Services table already has data, skipping.')
}

const settingsDefaults = {
  home_hero_eyebrow: 'Solutions numériques & innovation digitale',
  home_hero_title: 'Innover.\nTransformer.\nCroître.',
  home_hero_lead: 'OKNOK accompagne entreprises, organisations et entrepreneurs dans leur transformation digitale : cybersécurité, design, communication, marketing et gestion de projets innovants.',
  main_categories: 'Cybersécurité\nCommunication digitale\nMarketing digital\nDesign & Multimédia\nMarketing & Commercial\nGestion de projets',
  about_lead: 'OKNOK est une startup spécialisée dans les solutions numériques, la cybersécurité, la communication digitale, le marketing, le design multimédia et l’innovation technologique.',
  about_mission: 'Notre mission est d’accompagner les entreprises, les organisations et les entrepreneurs dans leur transformation digitale en leur proposant des solutions adaptées à leurs besoins. Nous intervenons dans plusieurs domaines, notamment la cybersécurité, le développement de solutions numériques, la communication digitale, le marketing, le design graphique et la gestion de projets innovants.',
  about_description: 'Grâce à une équipe pluridisciplinaire, OKNOK combine technologie, créativité et stratégie pour concevoir des solutions à forte valeur ajoutée. Nous croyons que l’innovation doit être accessible et contribuer au développement des talents, des entreprises et des communautés.',
  about_vision: 'Faire d’OKNOK un acteur de référence dans les solutions numériques et l’innovation en Afrique, en mettant la technologie, la créativité et la stratégie au service du développement des entreprises et des communautés.',
  soft_skills: 'Esprit d’équipe\nCréativité\nCommunication\nAdaptabilité\nRésolution de problèmes\nEsprit d’initiative\nAutonomie\nApprentissage rapide\nRecherche d’informations\nPrésentation orale\nOrganisation\nGestion de projets',
  contact_email: 'contact@oknok.africa',
  contact_intro: 'Décrivez-nous votre besoin — cybersécurité, design, communication, marketing ou gestion de projet — et nous reviendrons vers vous rapidement avec une proposition adaptée.',
  footer_description: 'Startup de solutions numériques, cybersécurité, communication digitale, design et innovation technologique.',
}

const existingSettings = db.prepare('SELECT COUNT(*) AS n FROM site_settings').get().n
if (existingSettings === 0) {
  const insertSetting = db.prepare('INSERT INTO site_settings (key, value) VALUES (?, ?)')
  for (const [key, value] of Object.entries(settingsDefaults)) {
    insertSetting.run(key, value)
  }
  console.log(`Seeded ${Object.keys(settingsDefaults).length} settings.`)
} else {
  console.log('Settings table already has data, skipping.')
}
