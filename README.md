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

## Kam vkládat texty

Obsah je oddělený od kódu. Texty se píšou v Markdownu (`.md`), data v JSON.
Soubory začínající podtržítkem (`_sablona.md`) jsou šablony a na webu se
neukazují.

| Část webu | Soubor(y) |
| --- | --- |
| 01 Úvod a subtémata | `src/content/stranky/uvod.md` |
| 02 Literatura a přístupy | `src/content/stranky/pristupy.md` |
| 03 Sondy | `src/content/sondy/*.md` (jeden soubor = jedna sonda) |
| 04 Anotace klíčových textů | `src/content/anotace/*.md` (šablona `_sablona.md`) |
| 04 Seznam použité literatury | `src/content/stranky/literatura.md` |
| 05 Testové otázky | `src/data/otazky.json` (`spravna` = index 0–3) |
| 06 Kdo co dělal | `src/content/stranky/autori.md` |
| Workshop – osnova a cíle | `src/content/stranky/workshop.md` |
| Workshop – hádanky | `src/content/hadanky/*.md` |
| Workshop – kartičky | `src/data/karticky.json` |
| Úpravy po zpětné vazbě | `src/content/stranky/verze.md` |
| Odkaz na Mentimeter, termíny, tým | `src/lib/site.ts` |

V hlavičce každého souboru (mezi `---`) se vyplňuje:

- `autori: [Jméno, Jméno]` – z toho se automaticky skládá přehled v kapitole 06,
- `stav: chybi | koncept | hotovo` – zobrazuje se jako tečka v obsahu a na úvodní stránce.

Stav rozpracovanosti a pracovní poznámky vidí jen tým: při `npm run dev` vždy,
na zveřejněném webu po otevření adresy s `?stav`
(<https://bb-stef.github.io/infovedy/?stav>). Volba se pamatuje v prohlížeči;
vypne se adresou s `?stav=0`.

Citace se píšou jako poznámky pod čarou: v textu `[^klic]`, na konci souboru
`[^klic]: PŘÍJMENÍ, Jméno. Název…`. Web je automaticky očísluje a vypíše
v sekci „Zdroje a poznámky“.

## Nasadenie

Každý push do vetvy `main` spustí workflow
`.github/workflows/deploy.yml`, ktorý web zostaví a zverejní na GitHub Pages.
Jednorazové nastavenie popisuje [NAVOD_GITHUB_SK.md](NAVOD_GITHUB_SK.md).

## Poznámka k adresám

Web beží pod cestou `/infovedy/`. Pre odkazy v rámci webu používaj
`import.meta.env.BASE_URL` a obrázky či iné súbory importuj, aby sa prefix
doplnil automaticky.
