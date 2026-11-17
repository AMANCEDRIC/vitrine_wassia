# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projet

Site vitrine du GROUPE WASSIA SARL HOLDING (holding ivoirienne, 5 pôles d'activités), en Angular 22 (standalone, signals, zoneless) + Angular SSR sur Express + Tailwind CSS v4. Toutes les pages sont pré-rendues au build.

- **Branche `fusion-v2-conformite` (créée depuis `conformite-2026` le 2026-11-15) : fusion de style-v2 et de conformite-2026.** Elle garde tout le contenu des 11 documents (5 pôles + 2 services, pages `ActivitePage`, siège Treichville + RCCM, texte d'accueil du client, garanties adoucies) **et** l'inclusion financière de style-v2 : pôle 1 « Services financiers et inclusion » (`/services-financiers`, page `features/poles/finance` de style-v2 : épargne par carte QR, crédit, FAQ, IOB ; le tableau de la grille tarifaire (2026-11-16), le comparatif avec les autres prêteurs (remplacé par un bandeau « 1 % par mois ») et la section « En cas de retard » avec ses mentions dans la FAQ (2026-11-17) ont été retirés à la demande de Cédric ; « Pièces à fournir » est gardée ; la section Contact propose un choix par boutons radio entre « Devenir membre » et « Faire accompagner mon dossier » au lieu de deux formulaires) complété par les sections « Accompagnement de dossiers » (`PAGES_ACTIVITES.finance`) et deux formulaires (`devenir-membre`, `dossier-financement`) ; accueil avec étapes de la carte, simulateur et bouton « Devenir membre » ; `content/credit.ts`, `simulateur.ts`, `faq.ts`, `shared/ui/member-card` restaurés. La phrase du dossier officiel « ne collecte pas l'épargne / n'octroie pas de prêts » est **retirée partout** (mention IOB `SITE.mentionIob` à la place) : contradiction à faire valider par le client. `/accompagnement-finance` redirige vers `/services-financiers`. **Pages d'activité (2026-11-16) : mises en page d'après les pages `Site-Pole-*` de la maquette Design** (bannière avec titre souligné d'or et illustration ou liste de zones, sections numérotées « 01 — … », cartes bordées sur fond sombre, carte mise en avant, notes de prudence dans les sections, contact texte + formulaire), en gardant nos règles : 5 pôles + 2 services (pas les 7 pôles de la maquette), pas de pourcentages de répartition ni de grille tarifaire, en-tête blanc, page À propos issue des documents. Modèle : `PageActivite` / `SectionActivite` dans `content/activites.ts` ; bannière : entrées `souligne`, `image`, `points` de `shared/ui/page-hero`. Ne pas fusionner dans `main` sans l'accord du client.
- **Branche `conformite-2026` (créée depuis `style-v2` le 2026-11-15) : contenus alignés sur les 11 documents officiels du client** (`F:\Projet_wassia\docs_wassia\doc_pols\` : dossier institutionnel + une fiche par pôle). Structure : **5 pôles** (Accompagnement Finance, Immobilier, Flottes et GPS, Import-export, Agrobusiness) + **2 autres services** (Voyage/Hadj/études, Énergie verte), une page chacun. WASSIA **ne collecte pas l'épargne du public et n'octroie pas de prêts** : épargne, carte membre, crédit, simulateur et FAQ finance sont retirés. On suit les fiches « Pôle … » (prudentes) et non les « Fiches commerciales » : aucune promesse « garanti », aucun pourcentage de répartition immobilière, aucune mention de compte d'épargne WASSIA. Siège : Treichville, Avenue 21 / Rue 22 ; RCCM CI-ABJ-03-2026-B12-08942. Anciennes adresses `/services-financiers` et `/immobilier-mobilite` redirigées (route `redirectTo` + pages statiques `public/<adresse>/index.html`). **Accueil : texte final validé par le client (2026-11-15), recopié mot pour mot dans `content/accueil.ts` (`BANNIERE`, `PRESENTATION`, `TEXTES_ACCUEIL`, `CONFIANCE`, `CONTACT_ACCUEIL`) : ne pas le reformuler.** Il est affiché dans la mise en page d'origine (carrousel, bandeau défilant, 4 engagements, lignes de pôles, « Pourquoi WASSIA », actualités) : choix de Cédric, qui préfère l'ancien style. Ordre et noms des pôles imposés par le client, appliqués partout : Accompagnement Finance, Immobilier, Agrobusiness, Import-Export & Commerce Général, Flottes & GPS ; « Nos autres services » : Voyage, Hadj, Oumrah & Mobilité, Énergie Verte. Devise : « Votre Référence, Notre Engagement ». Ne pas fusionner sans l'accord du client.
- **Branche `style-v2` : nouvelle maquette de style** (artefact Design « Wassia — Site vitrine », https://claude.ai/artifact/MTr7qrzYBU83A3K33XVY8b, pages `Main`, `Site-A-propos`, `Site-Pole-*`, `Site-Merci`). Même contenu que `main`, seul le style change : fonds nuit, angles droits, boutons à balayage oblique, barres or penchées (`skewX(23.7deg)`). Ne pas fusionner dans `main` sans l'accord du client (le site en ligne est déployé depuis `main`).
- **Référence visuelle (version 1, branche `main`) : la maquette** https://princeaman007.github.io/wassia-maquette/Main.html (pages `Site-*.html`). Les écrans mobiles sont dans https://claude.ai/artifact/7rJ9ezfg8wm8hFPnvpGEtM (`Site-Accueil-Mobile`, `Site-Merci-Mobile`). Les écrans `App-*`, `Page-QR-*` et `Notifications` concernent la plateforme de microfinance (Flutter + Quarkus), un projet séparé hors de ce dépôt.
- Le site ne contient aucune fonction financière ni donnée client : « Espace agents » n'est qu'un lien externe (`ESPACE_AGENTS.url` dans `content/site.ts`, masqué tant qu'il vaut `null`).

## Commandes

- `npm start` (`ng serve`) : serveur de développement sur http://localhost:4200
- `npm run build` : build de production + pré-rendu dans `dist/wassia-vitrine/`
- `npm run build:pages` : build pour GitHub Pages (base `/vitrine_wassia/`). Le déploiement est automatique à chaque envoi sur `main` (`.github/workflows/deploy-pages.yml`) vers https://amancedric.github.io/vitrine_wassia/. C'est une version statique, sans serveur Express : le formulaire de contact y affiche un message « version de démonstration » (réponse 404 ou 405).
- `npm run serve:ssr:wassia-vitrine` : serveur Express compilé (port `PORT`, 4000 par défaut). **Le redémarrer après chaque build**, sinon il sert d'anciens fichiers CSS/JS supprimés.
- `npm test` (`ng test`) : Vitest + jsdom. Un fichier : `ng test --include src/app/content/content.spec.ts` ; par nom : `ng test --filter "simuler"` ; une passe sans watch : `ng test --watch=false`
- `npm run lint` (angular-eslint, règles d'accessibilité des templates incluses)
- `npm run format` (Prettier + `prettier-plugin-tailwindcss`, qui trie les classes)

## Architecture

```
src/app/
  core/layout/      en-tête (menu déroulant des pôles), menu mobile plein écran, barre utilitaire, pied de page
  core/services/    seo.service : meta description depuis route.data.description (le titre vient de route.title)
  shared/ui/        icon, page-hero, page-cta, faq, contact-form (générique)
  shared/data/      modèle des demandes de contact, validation partagée navigateur/serveur, appel HTTP
  features/         une page par dossier, chargée à la demande (home et ses sections, about, actualites, contact, poles/activite (gabarit unique des 7 activités), merci, legal, not-found). Actualités (`/actualites`) et Contact (`/contact`) ont leur propre page ; l'accueil garde le carrousel et le formulaire en aperçu, et tous les boutons « Nous contacter » mènent à `/contact`
  content/          TOUS les textes et données (pôles et services, pages d'activité, groupe, accueil, formulaires, pages légales, coordonnées)
src/server/            contact-handler.ts (traitement commun : validation, Turnstile, mail), mailer.ts (SMTP, nodemailer), turnstile.ts,
                       contact.ts (route Express POST /api/contact, montée dans src/server.ts avant le rendu Angular)
api/contact.ts         même traitement en fonction Vercel (api/tsconfig.json : compilée en CommonJS par Vercel, imports relatifs uniquement)
```

- Alias TypeScript : `@core/*`, `@shared/*`, `@features/*`, `@content/*`. `shared` n'importe ni `core` ni `features`.
- **Formulaires** : les 8 formulaires (un par activité + le formulaire général) sont des configurations de `content/formulaires.ts` rendues par `shared/ui/contact-form`. La même config sert à la validation serveur (`shared/data/contact-validation.ts`) : ajouter un champ = le déclarer dans la config, rien d'autre. Le serveur refuse les champs inconnus. Le champ piège `website` filtre les robots. **Envoi des formulaires** : `traiterDemande` (`src/server/contact-handler.ts`) valide la demande, vérifie le jeton Cloudflare Turnstile (si `TURNSTILE_SECRET` est défini), puis envoie un e-mail en texte simple à `CONTACT_TO` (par défaut `contact@wassia-holding.com`) par SMTP Infomaniak. Réponses : 200 envoyé, 400 données invalides, 403 anti-robots refusé, 502 envoi échoué, 503 envoi non configuré (le formulaire affiche alors « version de démonstration »). Réglages par variables d'environnement, voir `.env.example` (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO`, `TURNSTILE_SECRET`) : jamais de mot de passe dans le dépôt. La clé publique du widget Turnstile est `TURNSTILE_SITE_KEY` dans `content/site.ts` (`null` = pas de widget). Le code partagé (`contact-handler.ts`, `content/formulaires.ts`, `shared/data/contact-*.ts`) n'utilise que des imports relatifs, pour que Vercel compile `api/contact.ts`. GitHub Pages reste statique : le formulaire y affiche « version de démonstration ». SMTP ne marche que sur un hébergeur Node (Vercel Functions, serveur Express) : sur Cloudflare Pages, remplacer `mailer.ts` par un service d'e-mail HTTP.
- **Routes** : `app.routes.ts` (titre et description par route) et `app.routes.server.ts` (liste des pages pré-rendues ; `**` est rendu côté serveur avec un code 404). Une nouvelle page doit être ajoutée aux deux fichiers. Les liens vers des sections utilisent `routerLink` + `fragment` (défilement géré par `withInMemoryScrolling`).
- **Ordinateur et mobile** : une seule page responsive, point de rupture `nav:` = 860 px (`xs:` = 520 px). Exception : l'en-tête bascule sur le menu complet à `lg:` (1024 px), car le menu ne tient pas sur une ligne en dessous (tablettes, pliables) ; le bouton « Monter mon dossier » (`ACTION_PRINCIPALE`, `core/layout/nav-links.ts`) apparaît à côté du bouton Menu dès `md:` (768 px). Les textes courts du mobile sont des champs dédiés (`resumeCourt`, `texteMobile`), affichés avec `nav:hidden` / `hidden nav:block`.
- `security.allowedHosts` dans `angular.json` : `localhost` et `wassia-holding.com` (domaine officiel retenu par le client). À ajuster si le domaine final change, sinon le serveur répond 400.

## Styles (Tailwind v4)

- Pas de Sass : tout est dans `src/styles.css` (`@theme`, couches `base`/`components`, animations). Les composants n'ont pas de fichier CSS.
- Couleurs de la charte en tokens : `marine`, `roi`, `nuit`, `or`, `or-clair`, `emeraude`, `sapin`, `vert-fonce`, plus les couleurs d'interface de la maquette (`encre`, `ardoise`, `brume`, `fond`, `trait`, `champ`…). Polices : `font-display` (Poppins), `font-sans` (Open Sans).
- Classes partagées : `container-site`, `eyebrow`, `section-title`, `section-lead`, `btn-or`, `btn-sapin`, `btn-contour-clair`, `btn-contour-marine`, `field-input`, `card`.
- Style v2 : les arrondis `rounded-sm` à `rounded-3xl` valent 2px (tokens `--radius-*`) ; seule la carte membre garde ses angles arrondis. `eyebrow` affiche une barre penchée (verte ; `eyebrow-or` pour l'or, `eyebrow-nue` sans barre). Autres classes : `skew-bar` (barre penchée), `btn-fleche` (flèche qui glisse au survol du parent), `balayage` (+ `bl-titre`, `bl-texte`, `bl-num`, `bl-fleche` : lignes de pôles remplies en marine au survol), `hero-panel` / `hero-filet` (+ `-etroit`) pour le panneau diagonal des bannières, `marquee` / `marquee-track` (bandeau défilant des pôles), `escalier` (étapes de la carte décalées dès 1024px).
- Charte : l'or et l'émeraude ne servent jamais de couleur de texte sur fond blanc (contraste insuffisant) ; utiliser `or-fonce` ou `sapin`. Le logo ne se pose pas sur une photo.
- Effets globaux, montés dans `app.html` / `app.ts` :
  - `core/services/reveal.service.ts` : apparition progressive au défilement. Il pose automatiquement `reveal-init` / `reveal-visible` sur les blocs des `section .container-site` à chaque navigation. Un nouveau bloc placé dans ce gabarit est donc animé sans rien ajouter.
  - `core/layout/page-loader` : écran de chargement à l'arrivée et à chaque changement de page, pas pour une simple ancre. Il est masqué en CSS après 4 s si le JavaScript ne se charge pas.
  - `core/layout/scroll-button` : bouton flottant descendre / remonter, avec un anneau de progression.
  - La barre utilitaire défile en continu, et le carrousel des actualités avance tout seul (`features/home/sections/news`).
- Toutes les animations sont coupées avec `prefers-reduced-motion`.

## Contenus à faire valider par le client

Les textes viennent des documents officiels 2026 du client (`F:\Projet_wassia\docs_wassia\doc_pols\`). Pages des pôles et services : `content/activites.ts` (une seule page générique `features/poles/activite`, choisie par `route.data.activite`) ; liste et couleurs : `content/poles.ts` (`POLES`, `SERVICES`, `ACTIVITES`) ; À propos : `content/groupe.ts`. Ne pas les présenter comme définitifs : téléphone `+225 07 98 01 25 91`, mentions légales marquées `[À COMPLÉTER]` dans `content/legal.ts` (capital, directeur de la publication, hébergeur), couleurs des pôles Import-export et Énergie verte. Logos et illustrations dans `public/images/` : extraits provisoirement de la maquette, à remplacer par les fichiers officiels (pas encore d'illustration pour Finance et Import-export).

Contradictions relevées dans les documents (tranchées par Cédric le 2026-11-15, à confirmer par le client) : les fiches Flottes, Import-export et Voyage parlent d'un « compte d'épargne WASSIA » alors que le dossier officiel dit que WASSIA ne collecte pas l'épargne (mentions retirées) ; Voyage et Énergie verte se présentent comme « Pôles » dans leurs fiches mais comme « autres services » dans le dossier officiel (site : autres services) ; l'ancienne fiche d'enrôlement (siège à Akoupé, épargne, crédit à 1 %/mois) n'est plus utilisée sur cette branche. Les montants et pourcentages des textes utilisent l'espace insécable pour ne pas être coupés en fin de ligne.

Éléments prêts mais masqués tant que le client n'a pas fourni les données (ne jamais inventer de valeurs) :
- `CHIFFRES_CLES` (`content/accueil.ts`) : bandeau de compteurs animés sous la bannière, affiché seulement quand toutes les valeurs sont renseignées.
- `RESEAUX_SOCIAUX` (`content/site.ts`) : icônes du pied de page, une par adresse renseignée.
- La carte du siège (accueil, `#contact`) est centrée sur le quartier de Treichville (Avenue 21 / Rue 22) : à recentrer sur l'adresse exacte quand elle sera connue.

## Partenaire bancaire (consigne du client)

Ne citer AUCUN nom de banque ni de partenaire financier tant que les accords ne sont pas signés. Le site affiche la phrase « En cours de conventionnement avec des établissements bancaires agréés APBEF-CI. » et un emplacement vide sur la page Services financiers (section `#statut`). Après signature, renseigner uniquement `PARTENAIRE_BANCAIRE` (nom + numéro de convention) dans `content/site.ts` : le pied de page, la page Finance et la phrase se mettent à jour. Penser aussi à `content/legal.ts` (mentions légales).

## Conventions

- Prettier : `printWidth: 100`, guillemets simples. TypeScript strict (`process.env['X']`).
- Composants en `ChangeDetectionStrategy.OnPush`, `input()`/`output()`/`inject()`, `@if`/`@for`. Pas d'accès à `window`/`document` hors `afterNextRender` (SSR).
- Budgets de production : bundle initial 500 kB (avertissement) / 1 MB (erreur).
