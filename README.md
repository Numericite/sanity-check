# Sanity Check

Sanity Check est une application web permettant d’évaluer si un outil ou service en ligne respecte la conformité RGPD ainsi que d’autres critères éthiques liés au traitement des données utilisateurs.

L’objectif est d’apporter plus de transparence sur la manière dont les données personnelles sont collectées, stockées et utilisées par des services numériques.

## Technologie

- **[Next.js](https://nextjs.org/)**
- **[Chakra UI](https://chakra-ui.com/)**
- **[Payload CMS](https://payloadcms.com/)**
- **[tRPC](https://trpc.io/)**
- **[PostgreSQL](https://www.postgresql.org/)**

## Installation

### Prérequis

- **[NodeJS](https://nodejs.org/)**
- **[Yarn](https://yarnpkg.com/)**

### Installation

1. Cloner le dépôt

```bash
git clone https://github.com/Numericite/sanity-check.git
cd sanity-check
```

2. Copier le fichier .env.example et renomme-le en .env :

```bash
cp .env.example .env
```

3. Renseigner ensuite les variables nécessaires

4. Installer les dépendances

```bash
yarn
```

5. Exécuter les migrations Payload

```bash
npx payload migrate
```

6. Lancer le projet

```bash
yarn dev
```
