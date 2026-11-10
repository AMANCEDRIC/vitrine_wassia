// Après `ng build` : prépare le dossier statique pour Vercel.
// Les pages pré-rendues sont servies telles quelles ; pour toute adresse inconnue, Vercel renvoie 404.html
// (la version « navigateur » de l'appli, qui affiche la page 404 du site).
import { copyFileSync } from 'node:fs';

const dossier = 'dist/wassia-vitrine/browser';
copyFileSync(`${dossier}/index.csr.html`, `${dossier}/404.html`);
console.log('404.html créé dans', dossier);
