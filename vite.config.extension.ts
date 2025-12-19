import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Chrome拡張機能用ビルド設定
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'extension',
    emptyOutDir: false, // manifest.jsonとiconsを保持
    rollupOptions: {
      output: {
        // ファイル名にハッシュを付けない（拡張機能用）
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
})
