import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Stav rozpracovanosti každého textu. Zobrazuje se v bočním obsahu
 * a u nadpisu, aby koordinátorka viděla, co chybí.
 *   chybi   – zatím jen šablona
 *   koncept – první verze, čeká na úpravy
 *   hotovo  – zkontrolováno
 */
const stav = z.enum(['chybi', 'koncept', 'hotovo']).default('chybi');

/** Samostatné textové stránky: kapitoly 1, 2, 4, 6, workshop, verze. */
const stranky = defineCollection({
  loader: glob({ pattern: '[^_]*.md', base: './src/content/stranky' }),
  schema: z.object({
    title: z.string(),
    popis: z.string().optional(),
    autori: z.array(z.string()).default([]),
    stav,
    aktualizovano: z.coerce.date().optional(),
    /** Osnova workshopu (jen pro workshop.md). */
    osnova: z
      .array(
        z.object({
          minuty: z.number(),
          nazev: z.string(),
          popis: z.string().optional(),
        }),
      )
      .optional(),
  }),
});

/** Kapitola 3: sondy. Jeden soubor = jedna sonda. */
const sondy = defineCollection({
  loader: glob({ pattern: '[^_]*.md', base: './src/content/sondy' }),
  schema: z.object({
    title: z.string(),
    poradi: z.number(),
    perex: z.string().optional(),
    autori: z.array(z.string()).default([]),
    stav,
  }),
});

/** Kapitola 4: anotovaná literatura (5–7 textů). */
const anotace = defineCollection({
  loader: glob({ pattern: '[^_]*.md', base: './src/content/anotace' }),
  schema: z.object({
    title: z.string(),
    poradi: z.number(),
    /** Úplná citace podle ČSN ISO 690. */
    citace: z.string(),
    odkaz: z.url().optional(),
    autori: z.array(z.string()).default([]),
    stav,
  }),
});

/** Kapitola 5: testové otázky (20 otázek, 4 možnosti, jedna správná). */
const otazky = defineCollection({
  loader: file('./src/data/otazky.json'),
  schema: z.object({
    otazka: z.string(),
    moznosti: z.array(z.string()).length(4),
    /** Index správné možnosti 0–3. */
    spravna: z.number().int().min(0).max(3),
    vysvetleni: z.string().optional(),
  }),
});

/** Workshop: aktivita „Hádanky“. */
const hadanky = defineCollection({
  loader: glob({ pattern: '[^_]*.md', base: './src/content/hadanky' }),
  schema: z.object({
    title: z.string(),
    poradi: z.number(),
    situace: z.string(),
    otazka: z.string().default('Proč data vedla k chybnému závěru?'),
    zdroje: z.array(z.object({ nazev: z.string(), odkaz: z.url() })).default([]),
    autori: z.array(z.string()).default([]),
    stav,
  }),
});

/** Workshop: aktivita „Big data, nebo ne?“ */
const karticky = defineCollection({
  loader: file('./src/data/karticky.json'),
  schema: z.object({
    text: z.string(),
    poznamka: z.string().optional(),
  }),
});

export const collections = { stranky, sondy, anotace, otazky, hadanky, karticky };
