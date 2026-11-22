# Infovedy — initialize and publish the static site

## Purpose and scope

This file is an executable task specification for a coding agent, not a shell
script. When the user asks you to perform the initial setup described here,
carry it through: prepare the local project, initialize Git, add the remote,
verify the site, commit, and push. Report the result in Slovak.

For later work, follow the user's current request. This initial setup does not
authorize automatically pushing every future edit.

## Fixed project settings

| Setting | Value |
| --- | --- |
| GitHub owner | `bb-stef` |
| Repository name | `infovedy` |
| Repository URL | `https://github.com/bb-stef/infovedy` |
| HTTPS remote | `https://github.com/bb-stef/infovedy.git` |
| Equivalent SSH remote | `git@github.com:bb-stef/infovedy.git` |
| Initial branch for a new repository | `main` |
| Expected Pages URL | `https://bb-stef.github.io/infovedy/` |
| Stack | Astro, TypeScript, plain CSS, npm |
| Runtime | Latest supported Node.js 24 LTS patch |

The user has explicitly confirmed that a period is **not** part of the
repository name. Do not append a period to any of these values.

The requested new Git repository is local. The hosted GitHub repository must
already exist, or the human can create it using `NAVOD_GITHUB_SK.md`. Do not
change an existing repository's visibility or recreate it.

## 1. Inspect the workspace and GitHub access

1. Identify the intended project directory. Work at the project root. If the
   current directory is already the intended `infovedy` directory, do not create
   another nested `infovedy` directory.
2. Read existing project instructions and inspect existing files, Git status,
   the Git root, remotes, and history before changing them. If the directory is
   inside an unrelated parent repository, use a separate project directory.
3. Preserve these instruction and manual files and all unrelated user changes.
   A folder containing `AGENTS.md` is not empty: create the small starter files
   below directly instead of blindly scaffolding into `.`.
4. Verify Git, Node.js, and npm are available. Use the latest Node.js 24 LTS
   patch locally and the same major in CI. If the current Astro release needs
   a newer supported LTS, select a compatible version and update `.nvmrc`,
   `package.json`, the workflow, and documentation together.
5. Use existing GitHub authentication. If GitHub CLI is installed, check
   `gh auth status` and inspect the intended repository with
   `gh repo view bb-stef/infovedy --json nameWithOwner,url,defaultBranchRef,viewerPermission`.
   GitHub CLI is optional; authenticated Git over HTTPS or SSH is sufficient.
6. Check remote history with `git ls-remote --heads --tags` against the selected
   remote. A successful command with no refs means an empty remote. An error
   means access or connectivity is unresolved, not that the repository is empty.
7. Check that Git has a configured commit name and email. Reuse the user's
   existing identity; do not invent an author or change global Git settings.

If authentication is missing, prepare and verify everything possible locally,
then request the specific login step. The human can use `gh auth login` with
the browser flow, or their existing SSH setup. Never ask for a GitHub account
password or token to be pasted into chat or a project file.

## 2. Establish the repository without losing history

### Fresh local directory and empty remote

Run from the intended project directory:

```bash
git init -b main
git remote add origin https://github.com/bb-stef/infovedy.git
```

Use the equivalent SSH URL from the table when that is the user's existing
authenticated transport.

### Existing local repository or nonempty remote

- Reuse a matching existing `origin`; do not add it twice.
- If `origin` points to another project, resolve the workspace/remote mismatch
  before pushing. Do not silently repoint an unrelated repository.
- If the remote has commits, fetch and build on that history, or clone it into
  a clean project directory and bring the supplied instruction/manual files
  across after reviewing collisions. Do not create an unrelated initial
  history and force it over the remote.
- For an existing project, preserve its default branch unless the user asks
  to rename it. If it is not `main`, adapt the workflow trigger, push command,
  and human manual to that branch consistently.
- Reuse an existing compatible Astro project. Review and merge these settings
  into it instead of overwriting its source files.

## 3. Create the minimal Astro project

For a fresh project, create the following files. Use UTF-8. Keep the site a
small, responsive Slovak placeholder headed **Infovedy**, with a short
`Stránku pripravujeme.` message. Do not invent institutional information,
contacts, articles, or other project claims.

### `package.json`

```json
{
  "name": "infovedy",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "engines": {
    "node": ">=24.0.0 <25.0.0"
  },
  "scripts": {
    "dev": "astro dev --host 127.0.0.1",
    "check": "astro check",
    "build": "npm run check && astro build",
    "preview": "astro preview --host 127.0.0.1"
  }
}
```

Then install the current compatible stable packages, recording exact versions:

```bash
npm install --save-exact astro@latest
npm install --save-dev --save-exact @astrojs/check@latest typescript@latest
```

Commit the resulting `package.json` and `package-lock.json`. Use npm throughout.
Check the packages' runtime requirements rather than ignoring engine errors.

### `.nvmrc`

```text
24
```

### `astro.config.mjs`

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://bb-stef.github.io',
  base: '/infovedy',
  output: 'static',
  trailingSlash: 'always',
});
```

### `tsconfig.json`

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

### `.gitignore`

```gitignore
node_modules/
dist/
.astro/
.env
.env.*
!.env.example
*.log
.DS_Store
```

Merge these patterns into an existing `.gitignore` if applicable.

### `src/layouts/BaseLayout.astro`

```astro
---
import '../styles/global.css';

interface Props {
  title?: string;
  description?: string;
}

const {
  title = 'Infovedy',
  description = 'Web Infovedy. Stránku pripravujeme.',
} = Astro.props;
const homeUrl = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/`;
---

<!doctype html>
<html lang="sk">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={description} />
    <title>{title}</title>
  </head>
  <body>
    <a class="skip-link" href="#obsah">Preskočiť na obsah</a>
    <header class="site-header">
      <a class="brand" href={homeUrl}>Infovedy</a>
    </header>
    <main id="obsah" tabindex="-1"><slot /></main>
    <footer class="site-footer">Infovedy</footer>
  </body>
</html>
```

### `src/pages/index.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout>
  <section class="intro" aria-labelledby="page-title">
    <p class="eyebrow">Vitajte</p>
    <h1 id="page-title">Infovedy</h1>
    <p class="lead">Stránku pripravujeme.</p>
  </section>
</BaseLayout>
```

### `src/styles/global.css`

```css
:root {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: #18302c;
  background: #f7f9f5;
  line-height: 1.6;
  font-synthesis: none;
}
* { box-sizing: border-box; }
body { margin: 0; }
a { color: #196248; text-underline-offset: 0.2em; }
a:focus-visible { outline: 3px solid #196248; outline-offset: 5px; }
.site-header, main, .site-footer {
  width: min(100% - 2.5rem, 66rem);
  margin-inline: auto;
}
.site-header { padding-block: 1.5rem; border-bottom: 1px solid #d7e2d6; }
.brand { color: inherit; font-size: 1.2rem; font-weight: 750; text-decoration: none; }
.intro { padding-block: clamp(4rem, 12vw, 8rem); }
.eyebrow { color: #286449; font-weight: 650; }
h1 { margin: 0; font-size: clamp(2.8rem, 10vw, 5.5rem); line-height: 1.1; }
.lead { font-size: 1.25rem; }
.site-footer { padding-block: 1.5rem; border-top: 1px solid #d7e2d6; }
.skip-link { position: absolute; top: -8rem; left: 1rem; }
.skip-link:focus { top: 1rem; z-index: 1; padding: 0.75rem; background: white; }
```

Create `README.md` in Slovak with the project purpose, Node/npm prerequisites,
installation (`npm ci`), local development (`npm run dev`), checks/build
(`npm run build`), production preview (`npm run preview`), repository URL,
Pages URL, and a link to `NAVOD_GITHUB_SK.md`. Use the actual local address
printed by Astro, normally `http://127.0.0.1:4321/infovedy/`.

Preserve the supplied `NAVOD_GITHUB_SK.md` in the repository. If it was not
supplied, create a short Slovak manual covering the one-time Pages setting,
manual workflow run, and published URL described in section 6 below.

For all future links and public assets, respect `/infovedy/`. Use imports for
bundled assets and `import.meta.env.BASE_URL` for site-relative URLs. Do not
assume `/` is this project's home. No server adapter, database, CMS, React,
custom domain, or client router is needed for this starter.

## 4. Add GitHub Pages deployment

Create `.github/workflows/deploy.yml` with the following contents. These action
majors follow Astro's official GitHub Pages guide as checked on 2026-11-22.
If a referenced major is unavailable when you execute this task, verify the
maintained release in the official action repository and use a compatible
published version. Do not guess version numbers.

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read

concurrency:
  group: github-pages
  cancel-in-progress: false

jobs:
  build:
    name: Build static site
    runs-on: ubuntu-latest
    steps:
      - name: Check out source
        uses: actions/checkout@v7
      - name: Install, check, build, and upload
        uses: withastro/action@v6
        with:
          node-version: '24'
          build-cmd: npm run build

  deploy:
    name: Publish site
    needs: build
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy generated artifact
        id: deployment
        uses: actions/deploy-pages@v5
```

The Astro action detects npm from `package-lock.json`, installs dependencies,
runs the specified build command, and uploads the Pages artifact. Deployment
uses GitHub's automatically supplied workflow authentication. Do not add a
personal token to repository secrets for this workflow.

Do not create a second deployment workflow or a generated `gh-pages` branch.
The committed source stays on `main`; generated output is deployed as an
artifact. GitHub Pages must have **GitHub Actions** selected as its source.

## 5. Verify locally, commit, and push

1. Run `npm ci`, then `npm run build`. The build must pass both Astro's checks
   and static generation. Confirm `dist/index.html` exists. A source folder
   named `dist/infovedy` is not required: Pages supplies the URL prefix.
2. Run `npm run preview` in a managed background terminal. Open the exact
   preview address, including `/infovedy/`. Confirm the Slovak heading and
   message, mobile layout, keyboard focus, home link, and stylesheet loading.
   Confirm the page and emitted CSS return successful HTTP responses. If a
   browser is unavailable, check the returned HTML and referenced assets over
   HTTP and report the visual check as not performed.
3. Leave a local development server running only if the environment supports
   a persistent preview and the user needs it. Report its exact address; do
   not claim a temporary validation server is still available after stopping it.
4. Inspect the diff and staged files. Stage the project source, configuration,
   lockfile, workflow, README, and the two supplied Markdown files explicitly.
   Do not stage unrelated changes, dependencies, generated output, or credentials.
5. Create a commit, for example `Initialize Infovedy Astro site and Pages deployment`.
   If the desired setup is already committed, do not create an empty commit.
6. Push the new repository with `git push -u origin main` (or the preserved
   existing branch described in section 2).
7. Verify the remote branch commit equals the local commit, for example by
   comparing `git rev-parse HEAD` with `git ls-remote origin refs/heads/main`.
   An attempted push is not a verified successful push.

If a push is rejected because the remote advanced, fetch and integrate that
history after reviewing it, then retry a normal push. Never force push. If a
branch rule requires a pull request, preserve the rule: push a setup branch
and open a draft PR when authorized by the environment, or report the concrete
remaining approval/merge step. Do not claim the main branch or website is live
until the corresponding operations have actually succeeded.

## 6. Verify deployment and hand off in Slovak

After a successful push, inspect the workflow if access permits. GitHub CLI
can list runs for this exact repository and `.github/workflows/deploy.yml`.
Track the run corresponding to the pushed commit; do not report an older
green run as verification of the new version.

The human manages the GitHub website settings in this task. If Pages is not
yet enabled, give this exact instruction and the supplied Slovak manual:

> Otvor repozitár **bb-stef/infovedy → Settings → Pages → Build and deployment
> → Source** a vyber **GitHub Actions**. Potom otvor **Actions → Deploy to
> GitHub Pages → Run workflow**, vyber **main** a potvrď **Run workflow**.

If GitHub Actions is already the publishing source and deployment succeeds,
there is no further mandatory GitHub website setup. When the run completes,
check the deployment URL and its CSS, preferably the URL returned by GitHub.
If deployment is blocked by a missing setting, authentication, or repository
policy, report that specific blocker while keeping completed local work intact.

The final report must distinguish:

- local project created and local checks performed;
- commit SHA and the branch actually pushed;
- GitHub deployment status (succeeded, pending, or blocked);
- the local preview URL only if it is still running;
- the published URL only as verified live, otherwise the expected URL;
- any remaining human action, with a link to `NAVOD_GITHUB_SK.md`.

Do not stop at a plan when the requested setup can be completed. Do not report
push or deployment success without evidence.

## Official references

- [Astro installation](https://docs.astro.build/en/install-and-setup/)
- [Astro TypeScript checks](https://docs.astro.build/en/guides/typescript/)
- [Astro deployment to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
- [GitHub Pages publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [GitHub Pages custom workflow permissions](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Run a workflow manually](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/manually-run-a-workflow)
