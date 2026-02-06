import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Blue Gardener",
  description:
    "Multi-platform AI agent management for Cursor, Claude Desktop, Codex, GitHub Copilot, Windsurf, and OpenCode",
  base: "/blue-gardener/",

  head: [["link", { rel: "icon", href: "/blue-gardener/favicon.ico" }]],

  themeConfig: {
    logo: "/logo.svg",

    nav: [
      { text: "Guide", link: "/guide/getting-started" },
      { text: "Agents", link: "/agents/" },
      { text: "Reference", link: "/reference/cli" },
    ],

    sidebar: {
      "/guide/": [
        {
          text: "Getting Started",
          items: [
            { text: "What is Blue Gardener?", link: "/guide/getting-started" },
            { text: "Installation", link: "/guide/installation" },
            { text: "First Steps", link: "/guide/first-steps" },
            { text: "Platforms", link: "/guide/platforms" },
          ],
        },
        {
          text: "Usage",
          items: [
            { text: "Adding Agents", link: "/guide/adding-agents" },
            { text: "Managing Agents", link: "/guide/managing-agents" },
            { text: "Orchestration Patterns", link: "/guide/orchestration" },
          ],
        },
      ],
      "/agents/": [
        {
          text: "Agent Catalog",
          items: [
            { text: "Overview", link: "/agents/" },
            { text: "Orchestrators", link: "/agents/orchestrators" },
            { text: "Development", link: "/agents/development" },
            { text: "Quality", link: "/agents/quality" },
            { text: "Infrastructure", link: "/agents/infrastructure" },
            { text: "Configuration", link: "/agents/configuration" },
            { text: "Blockchain", link: "/agents/blockchain" },
          ],
        },
      ],
      "/reference/": [
        {
          text: "Reference",
          items: [{ text: "CLI Commands", link: "/reference/cli" }],
        },
      ],
    },

    search: {
      provider: "local",
    },

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/bluegardenproject/blue-gardener",
      },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024-present Philipp Trentmann",
    },

    editLink: {
      pattern:
        "https://github.com/bluegardenproject/blue-gardener/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },
  },
});
