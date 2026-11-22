# Infovedy

Statický web Infovedy postavený na [Astro](https://astro.build/) (TypeScript,
čisté CSS). Zatiaľ ide o úvodnú stránku „Stránku pripravujeme.“

- Repozitár: <https://github.com/bb-stef/infovedy>
- Zverejnený web (GitHub Pages): <https://bb-stef.github.io/infovedy/>
- Návod na nastavenie GitHubu: [NAVOD_GITHUB_SK.md](NAVOD_GITHUB_SK.md)

## Požiadavky

- Node.js 24 LTS (verzia je uvedená v súbore `.nvmrc`)
- npm (dodáva sa s Node.js)

## Inštalácia

```bash
npm ci
```

## Lokálny vývoj

```bash
npm run dev
```

Web beží na <http://127.0.0.1:4321/infovedy/>.

## Kontrola a zostavenie

```bash
npm run build
```

Príkaz spustí kontrolu typov (`astro check`) a vygeneruje statický web do
priečinka `dist/`.

## Náhľad produkčnej verzie

```bash
npm run preview
```

Náhľad beží na <http://127.0.0.1:4321/infovedy/>.

## Nasadenie

Každý push do vetvy `main` spustí workflow
`.github/workflows/deploy.yml`, ktorý web zostaví a zverejní na GitHub Pages.
Jednorazové nastavenie popisuje [NAVOD_GITHUB_SK.md](NAVOD_GITHUB_SK.md).

## Poznámka k adresám

Web beží pod cestou `/infovedy/`. Pre odkazy v rámci webu používaj
`import.meta.env.BASE_URL` a obrázky či iné súbory importuj, aby sa prefix
doplnil automaticky.
