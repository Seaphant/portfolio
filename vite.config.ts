import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * GitHub Pages project sites live at https://<user>.github.io/<repo>/
 * Set VITE_BASE_URL=/your-repo-name/ in CI. Vercel/Netlify use default "/".
 */
const base = process.env.VITE_BASE_URL?.trim() || '/'
const normalizedBase = base === '/' ? '/' : base.endsWith('/') ? base : `${base}/`

export default defineConfig({
  base: normalizedBase,
  plugins: [react(), tailwindcss()],
})
