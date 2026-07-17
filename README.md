# Angular-Portfolio

Personal portfolio site of Nikita Jakimovs — AI/ML engineer working on GenAI (RAG, LLM agents, Azure OpenAI) and computer vision (YOLO).

Live site: https://nobodyf.github.io/Angular-Portfolio/

## Stack

- Angular 17 (NgModule-based, prerendered static output)
- Deployed to GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`)

## Development

```bash
npm install
npm start          # dev server at http://localhost:4200/
npm test           # unit tests (Karma)
npm run build      # production build to dist/latest-app-with-module/browser
```

## Deployment

Pushing to `main` triggers the **Deploy to GitHub Pages** workflow, which builds the app
and publishes `dist/latest-app-with-module/browser` to GitHub Pages. No manual `gh-pages`
branch pushes are needed.

> Note: GitHub Pages must be configured to deploy from **GitHub Actions**
> (Settings → Pages → Source), not from the `gh-pages` branch.
