import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';

export default defineConfig({
  site: 'https://bb-stef.github.io',
  base: '/infovedy',
  output: 'static',
  trailingSlash: 'always',
  markdown: {
    processor: satteri({
      features: {
        gfm: {
          footnotes: {
            label: 'Zdroje a poznámky',
            backLabel: 'Zpět do textu k odkazu {reference}',
          },
        },
      },
    }),
  },
});
