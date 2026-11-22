# Návod: zverejnenie webu Infovedy na GitHub Pages

Repozitár: <https://github.com/bb-stef/infovedy>
Zverejnený web: <https://bb-stef.github.io/infovedy/>

Web sa zostavuje a zverejňuje automaticky cez GitHub Actions
(súbor `.github/workflows/deploy.yml`) pri každom odoslaní (push) do vetvy
`main`. Netreba žiadny osobný token ani vetvu `gh-pages`.

## 1. Jednorazové nastavenie GitHub Pages

1. Otvor repozitár **bb-stef/infovedy** na GitHube.
2. Choď do **Settings → Pages**.
3. V časti **Build and deployment → Source** vyber **GitHub Actions**.

Toto stačí urobiť iba raz.

## 2. Ručné spustenie nasadenia

Ak bol kód odoslaný ešte pred zapnutím Pages, alebo chceš web nasadiť znova:

1. Otvor záložku **Actions**.
2. Vľavo vyber workflow **Deploy to GitHub Pages**.
3. Klikni na **Run workflow**, vyber vetvu **main** a potvrď **Run workflow**.
4. Počkaj, kým beh skončí zelenou fajkou (obe úlohy *Build static site*
   a *Publish site*).

## 3. Kontrola zverejneného webu

Po úspešnom behu otvor <https://bb-stef.github.io/infovedy/>. Odkaz nájdeš aj
v detaile behu pri úlohe **Publish site**. Prvé zverejnenie môže trvať
niekoľko minút.

## Keď niečo zlyhá

- **Chyba pri úlohe Publish site / „Pages not enabled“** — skontroluj krok 1
  (Source musí byť **GitHub Actions**).
- **Chyba pri úlohe Build static site** — otvor log behu; rovnakú kontrolu
  spustíš lokálne príkazom `npm run build`.
