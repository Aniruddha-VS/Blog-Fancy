import { defineConfig } from "astro/config"
import tailwindcss from "@tailwindcss/vite"

import sitemap from "@astrojs/sitemap"
import mdx from "@astrojs/mdx"

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["alpinejs"],
          },
        },
      },
      target: "esnext",
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
        mangle: {
          properties: {
            regex: /^_/,
          },
        },
      },
    },
    optimizeDeps: {
      include: ["alpinejs"],
    },
    ssr: {
      noExternal: ["@astrolib/seo"],
    },
  },
  markdown: {
    drafts: true,
    shikiConfig: {
      theme: "css-variables",
    },
  },
  shikiConfig: {
    wrap: true,
    skipInline: false,
    drafts: true,
  },
  site: "https://avsblogs.netlify.app",
  integrations: [
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
      serialize: (item) => {
        return {
          ...item,
          lastmod: new Date().toISOString(),
        }
      },
      filter: (page) => {
        // Exclude 404 page from sitemap
        return !page.includes("404")
      },
    }),
    mdx(),
  ],
  build: {
    inlineStylesheets: "auto",
  },
  output: "static",
})
