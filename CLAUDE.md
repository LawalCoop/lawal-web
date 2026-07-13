# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**IMPORTANT**: Do NOT set `NODE_OPTIONS=--openssl-legacy-provider`. Since the migration to Gatsby v5 this flag is no longer allowed and breaks the build (`ERR_WORKER_INVALID_EXEC_ARGV`). It was only required under Gatsby v3.

### Common Commands
- `npm run develop` - Start development server (localhost:8000)
- `npm run build` - Build static site for production
- `npm run serve` - Serve built site locally
- `npm run clean` - Clean Gatsby cache (run when having build issues)

### No Linting/Testing
This project currently has no configured linting or testing commands.

## Architecture Overview

### Technology Stack
- **Gatsby v5** - React-based static site generator
- **Styled Components** - CSS-in-JS styling
- **gatsby-plugin-react-i18next** - Internationalization (Spanish/English)
- **GraphQL** - Content queries through Gatsby's data layer
- **Lottie animations** - Using @lottiefiles/dotlottie-react

### Key Directories
- `/src/components/` - React components organized by:
  - `/common/` - Reusable UI components
  - `/layout/` - Page layout wrapper
  - `/modules/` - Page-specific sections
- `/src/content/` - Content and configuration:
  - `/intl/` - Translation files (es.json, en.json)
  - `/posts/` - Blog posts in Markdown (separate es/ and en/ folders)
  - `/labs/` - Project case studies
  - `content.json` - Theme config and service definitions
- `/src/pages/` - Gatsby page components
- `/src/blogTemplates/` - Blog post template

### Internationalization Structure
- Default language: Spanish (es)
- Supported languages: Spanish, English
- Route structure: `/` (Spanish), `/en/` (English)
- Translation files: `/src/content/intl/{lang}.json`
- Content files: Separate folders for each language in posts and labs

### Content Management
- **Blog posts**: Markdown files with frontmatter (author, date, tags, images)
- **Global content**: Configured in `/src/content/content.json`
- **Translations**: JSON files for UI text
- **GraphQL queries**: Used extensively for content fetching

### Styling Approach
- Styled Components for component-level styles
- Global CSS in `/src/styles/`
- Theme system configured in `content.json`
- Responsive design with mobile-first approach

### Deployment
- GitHub Actions workflow deploys to GitHub Pages
- Built files go to `/public/` directory (the workflow publishes `path: ./public`)
- Triggered on push to main branch
- Custom domain: lawal.coop (configured via CNAME)
- Note: the legacy `/docs/` directory is stale and no longer used by the deploy

## Development Notes

### Node.js / OpenSSL
Do NOT use `NODE_OPTIONS=--openssl-legacy-provider`. It was needed under Gatsby v3 but is rejected by Gatsby v5's worker processes and breaks the build. Run the commands with a plain environment.

### Keeping dependencies in sync
If the build fails loading a plugin (e.g. `gatsby-plugin-react-i18next`), the installed `node_modules` is likely out of sync with `package.json` (leftover from the Gatsby v3 → v5 migration). Run `npm install` to reconcile.

### Content Updates
- Blog posts: Add to `/src/content/posts/{lang}/`
- Labs/projects: Add to `/src/content/labs/{lang}/`
- UI translations: Update `/src/content/intl/{lang}.json`
- Services/theme: Modify `/src/content/content.json`

### Component Patterns
- Use styled-components for styling
- Import theme values from content.json
- Follow existing component structure in `/src/components/`
- Utilize Gatsby's GraphQL layer for content queries