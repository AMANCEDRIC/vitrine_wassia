# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projet

Site vitrine du GROUPE WASSIA SARL HOLDING (holding ivoirienne, 5 pôles d'activités), en Angular 22 (standalone, signals, zoneless) + Angular SSR sur Express + Tailwind CSS v4. Toutes les pages sont pré-rendues au build.

- **Référence visuelle : la maquette** https://princeaman007.github.io/wassia-maquette/Main.html (pages `Site-*.html`). Les écrans mobiles sont dans https://claude.ai/artifact/7rJ9ezfg8wm8hFPnvpGEtM (`Site-Accueil-Mobile`, `Site-Merci-Mobile`). Les écrans `App-*`, `Page-QR-*` et `Notifications` concernent la plateforme de microfinance (Flutter + Quarkus), un projet séparé hors de ce dépôt.
- Le site ne contient aucune fonction financière ni donnée client : « Espace agents » n'est qu'un lien externe (`ESPACE_AGENTS.url` dans `content/site.ts`, masqué tant qu'il vaut `null`).

## Commandes

- `npm start` (`ng serve`) : serveur de développement sur http://localhost:4200
- `npm run build` : build de production + pré-rendu dans `dist/wassia-vitrine/`
- `npm run serve:ssr:wassia-vitrine` : serveur Express compilé (port `PORT`, 4000 par défaut). **Le redémarrer après chaque build**, sinon il sert d'anciens fichiers CSS/JS supprimés.
- `npm test` (`ng test`) : Vitest + jsdom. Un fichier : `ng test --include src/app/content/content.spec.ts` ; par nom : `ng test --filter "simuler"` ; une passe sans watch : `ng test --watch=false`
- `npm run lint` (angular-eslint, règles d'accessibilité des templates incluses)
- `npm run format` (Prettier + `prettier-plugin-tailwindcss`, qui trie les classes)

## Architecture

```
src/app/
  core/layout/      en-tête (menu déroulant des pôles), menu mobile plein écran, barre utilitaire, pied de page
  core/services/    seo.service : meta description depuis route.data.description (le titre vient de route.title)
  shared/ui/        icon, page-hero, contact-form (générique), member-card (carte membre recto/verso)
  shared/data/      modèle des demandes de contact, validation partagée navigateur/serveur, appel HTTP
  features/         une page par dossier, chargée à la demande (home et ses sections, about, poles/*, merci, legal, not-found)
  content/          TOUS les textes et données (pôles, accueil, formulaires, simulateur, pages légales, coordonnées)
src/server/contact.ts   POST /api/contact, monté dans src/server.ts avant le rendu Angular
```

- Alias TypeScript : `@core/*`, `@shared/*`, `@features/*`, `@content/*`. `shared` n'importe ni `core` ni `features`.
- **Formulaires** : les 6 formulaires de la maquette sont des configurations de `content/formulaires.ts` rendues par `shared/ui/contact-form`. La même config sert à la validation serveur (`shared/data/contact-validation.ts`) : ajouter un champ = le déclarer dans la config, rien d'autre. Le serveur refuse les champs inconnus. Le champ piège `website` filtre les robots. L'envoi d'e-mail n'est pas branché (accès SMTP à fournir) : la route valide, journalise sans données personnelles, puis répond 202.
- **Routes** : `app.routes.ts` (titre et description par route) et `app.routes.server.ts` (liste des pages pré-rendues ; `**` est rendu côté serveur avec un code 404). Une nouvelle page doit être ajoutée aux deux fichiers. Les liens vers des sections utilisent `routerLink` + `fragment` (défilement géré par `withInMemoryScrolling`).
- **Ordinateur et mobile** : une seule page responsive, point de rupture `nav:` = 860 px (`xs:` = 520 px). Les textes courts du mobile sont des champs dédiés (`resumeCourt`, `texteMobile`), affichés avec `nav:hidden` / `hidden nav:block`.
- `security.allowedHosts` dans `angular.json` : `localhost` et `wassia-holding.com` (domaine officiel retenu par le client). À ajuster si le domaine final change, sinon le serveur répond 400.

## Styles (Tailwind v4)

- Pas de Sass : tout est dans `src/styles.css` (`@theme`, couches `base`/`components`, animations). Les composants n'ont pas de fichier CSS.
- Couleurs de la charte en tokens : `marine`, `roi`, `nuit`, `or`, `or-clair`, `emeraude`, `sapin`, `vert-fonce`, plus les couleurs d'interface de la maquette (`encre`, `ardoise`, `brume`, `fond`, `trait`, `champ`…). Polices : `font-display` (Poppins), `font-sans` (Open Sans).
- Classes partagées : `container-site`, `eyebrow`, `section-title`, `section-lead`, `btn-or`, `btn-sapin`, `btn-contour-clair`, `btn-contour-marine`, `field-input`, `card`.
- Charte : l'or et l'émeraude ne servent jamais de couleur de texte sur fond blanc (contraste insuffisant) ; utiliser `or-fonce` ou `sapin`. Le logo ne se pose pas sur une photo.
- Effets globaux, montés dans `app.html` / `app.ts` :
  - `core/services/reveal.service.ts` : apparition progressive au défilement. Il pose automatiquement `reveal-init` / `reveal-visible` sur les blocs des `section .container-site` à chaque navigation. Un nouveau bloc placé dans ce gabarit est donc animé sans rien ajouter.
  - `core/layout/page-loader` : écran de chargement à l'arrivée et à chaque changement de page, pas pour une simple ancre. Il est masqué en CSS après 4 s si le JavaScript ne se charge pas.
  - `core/layout/scroll-button` : bouton flottant descendre / remonter, avec un anneau de progression.
  - La barre utilitaire défile en continu, et le carrousel des actualités avance tout seul (`features/home/sections/news`).
- Toutes les animations sont coupées avec `prefers-reduced-motion`.

## Contenus à faire valider par le client

Les textes viennent des documents client et de la maquette. Ne pas les présenter comme définitifs : garanties chiffrées (loyer, recette, pannes), montants et taux de crédit du simulateur et de la page Finance, statut IOB, téléphone `+225 07 07 07 07 07` (probablement fictif), mentions légales marquées `[À COMPLÉTER]` dans `content/legal.ts`, couleurs des pôles Voyage et Agrobusiness. Logos et illustrations dans `public/images/` : extraits provisoirement de la maquette, à remplacer par les fichiers officiels.

Éléments prêts mais masqués tant que le client n'a pas fourni les données (ne jamais inventer de valeurs) :
- `CHIFFRES_CLES` (`content/accueil.ts`) : bandeau de compteurs animés sous la bannière, affiché seulement quand toutes les valeurs sont renseignées.
- `RESEAUX_SOCIAUX` (`content/site.ts`) : icônes du pied de page, une par adresse renseignée.
- La carte du siège (accueil, `#contact`) est centrée sur la commune de Yopougon : à recentrer sur l'adresse exacte quand elle sera connue.

## Partenaire bancaire (consigne du client)

Ne citer AUCUN nom de banque ni de partenaire financier tant que les accords ne sont pas signés. Le site affiche la phrase « En cours de conventionnement avec des établissements bancaires agréés APBEF-CI. » et un emplacement vide sur la page Services financiers (section `#statut`). Après signature, renseigner uniquement `PARTENAIRE_BANCAIRE` (nom + numéro de convention) dans `content/site.ts` : le pied de page, la page Finance et la phrase se mettent à jour. Penser aussi à `content/legal.ts` (mentions légales).

## Conventions

- Prettier : `printWidth: 100`, guillemets simples. TypeScript strict (`process.env['X']`).
- Composants en `ChangeDetectionStrategy.OnPush`, `input()`/`output()`/`inject()`, `@if`/`@for`. Pas d'accès à `window`/`document` hors `afterNextRender` (SSR).
- Budgets de production : bundle initial 500 kB (avertissement) / 1 MB (erreur).
