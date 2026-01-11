# Lectures london

[![Deploy Status](https://api.netlify.com/api/v1/badges/098b9ec2-9b77-4917-989e-244a158b7b93/deploy-status)](https://app.netlify.com/sites/lectures-london/deploys)

## Contributing

Welcome! We appreciate your interest in contributing to lectures.london.

### Prerequisites and installation

This project uses **pnpm** with workspaces enabled.

**Setup:**
1.  Clone the repository.
2.  Install dependencies (this automatically applies the `unfluffjs` patch):
    ```bash
    pnpm install
    ```

### Project structure

*   **[`@client`](@client)**: The frontend application built with Astro and SolidJS.
    *   `www/`: Contains Astro pages and static assets.
    *   `src/`: The SolidJS application logic.
*   **[`@package`](@package)**: Backend tools and utilities.
    *   `scrapers/`: Definitions for all lecture scrapers.
    *   `scripts/`: CLI tools (including `collect.ts` and social bots).
    *   `shears/`: Utility library for scraping.

### Astro Dev infrastructure

The site is built on a foundation of **Astro** + **SolidJS**.

*   **Entry Point:** [`@client/www/pages/index.astro`](@client/www/pages/index.astro) mounts the main SolidJS `Page` component.
*   **Routing:** We use a custom client-side router located in [`@client/src/util/router.tsx`](@client/src/util/router.tsx) (using `history.pushState`), rather than Astro's View Transitions.
*   **Search:** Search functionality is offloaded to a web worker ([`@client/src/worker/search.worker.ts`](@client/src/worker/search.worker.ts)) and utilizes Fuse.js.

### Data collection

The core data for the site is aggregated into a `lectures.json` file.

**Command:**
```bash
pnpm collect
```
(This is an alias for `script-collect` in [`@package/scripts`](@package/scripts)).

**Process:**
This command runs all scrapers defined in [`@package/scrapers`](@package/scrapers) concurrently. It then deduplicates the results, filters for free and future events, and sorts them.
