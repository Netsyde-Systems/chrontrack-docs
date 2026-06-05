import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Chrontrack',
  tagline: 'Stay on track with Chrontrack',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://docs.chrontrack.com',
  baseUrl: '/',

  organizationName: 'netsyde-systems',
  projectName: 'chrontrack',

  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
      onBrokenMarkdownImages: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        indexDocs: true,
        indexPages: true,
        language: 'en',
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/netsyde-systems/chrontrack/tree/main/apps/docs/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/chrontrack-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Chrontrack',
      logo: {
        alt: 'Chrontrack Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/netsyde-systems/chrontrack',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Introduction', to: '/docs/intro'},
            {label: 'Getting Started', to: '/docs/getting-started/authentication'},
            {label: 'Time Tracking', to: '/docs/time-tracking/timer'},
          ],
        },
        {
          title: 'Features',
          items: [
            {label: 'Reports', to: '/docs/reports/filters'},
            {label: 'Goals', to: '/docs/goals/time-goals'},
            {label: 'Teams', to: '/docs/teams/creating-teams'},
            {label: 'Dependants', to: '/docs/dependants/overview'},
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/netsyde-systems/chrontrack',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Netsyde Systems. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
