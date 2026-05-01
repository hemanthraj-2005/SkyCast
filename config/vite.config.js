import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')

// https://vite.dev/config/
export default defineConfig({
  root: resolve(projectRoot, 'app'),
  envDir: projectRoot,
  build: {
    outDir: resolve(projectRoot, 'dist'),
    emptyOutDir: true,
  },
  plugins: [react()],
})
