import { getCollection, getEntry } from 'astro:content';

/** Odkaz v rámci webu, který respektuje prefix /infovedy/. */
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.replace(/^\//, '');
  return `${base}/${clean}`;
}

export const SITE = {
  nazev: 'Big Data',
  predmet: 'ISKM01 Informační vědy',
  predmetKod: 'ISKM01',
  instituce: 'KISK FF MU',
  instituceUrl: 'https://kisk.phil.muni.cz',
  semestr: 'podzim 2026',
  /** Doplnit odkaz na prezentaci v Mentimetru, až bude připravená. */
  mentimeterUrl: '',
  terminyWorkshopu: ['4. 12. 2026', '11. 12. 2026'],
  tym: ['Adéla', 'Barbora', 'Blanka', 'David', 'Filip', 'Kamil', 'Olha'],
} as const;

export const CILE = { sondy: 5, otazky: 20, anotaceMin: 5, anotaceMax: 7 } as const;

export type Stav = 'chybi' | 'koncept' | 'hotovo';

export const STAV_POPIS: Record<Stav, string> = {
  chybi: 'chybí',
  koncept: 'koncept',
  hotovo: 'hotovo',
};

/** Souhrnný stav skupiny textů (např. všech sond). */
export function souhrnnyStav(stavy: Stav[], pocet: number, cil: number): Stav {
  if (stavy.length === 0 || stavy.every((s) => s === 'chybi')) return 'chybi';
  if (pocet >= cil && stavy.every((s) => s === 'hotovo')) return 'hotovo';
  return 'koncept';
}

export interface Kapitola {
  cislo: string;
  nazev: string;
  href: string;
  stav: Stav;
}

/** Šest povinných částí učebního materiálu se stavem rozpracovanosti. */
export async function getKapitoly(): Promise<Kapitola[]> {
  const [uvod, pristupy, literatura, autori] = await Promise.all(
    (['uvod', 'pristupy', 'literatura', 'autori'] as const).map((id) =>
      getEntry('stranky', id),
    ),
  );
  const sondy = await getCollection('sondy');
  const anotace = await getCollection('anotace');
  const otazky = await getCollection('otazky');

  const otazkyStav: Stav =
    otazky.length === 0 ? 'chybi' : otazky.length >= CILE.otazky ? 'hotovo' : 'koncept';

  return [
    { cislo: '01', nazev: 'Úvod a subtémata', href: url('material/'), stav: uvod?.data.stav ?? 'chybi' },
    { cislo: '02', nazev: 'Literatura a přístupy', href: url('material/pristupy/'), stav: pristupy?.data.stav ?? 'chybi' },
    {
      cislo: '03',
      nazev: 'Sondy',
      href: url('material/sondy/'),
      stav: souhrnnyStav(sondy.map((s) => s.data.stav), sondy.length, CILE.sondy),
    },
    {
      cislo: '04',
      nazev: 'Anotovaná literatura',
      href: url('material/literatura/'),
      stav: souhrnnyStav(
        [...anotace.map((a) => a.data.stav), literatura?.data.stav ?? 'chybi'],
        anotace.length,
        CILE.anotaceMin,
      ),
    },
    { cislo: '05', nazev: 'Testové otázky', href: url('material/test/'), stav: otazkyStav },
    { cislo: '06', nazev: 'Kdo co dělal', href: url('material/autori/'), stav: autori?.data.stav ?? 'chybi' },
  ];
}
