import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        // 內置遊戲圖片令主 bundle 超過 workbox 預設 2MB precache 上限，
        // 調高上限確保離線都載入到（bundle 內含 base64 遊戲圖）。
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
      },
      manifest: {
        name: '親子遊戲樂園',
        short_name: '遊戲樂園',
        description: '專為 1–2 歲幼兒設計的親子拖拉配對小遊戲，內置遊戲，離線都玩得。',
        lang: 'zh-Hant',
        start_url: '.',
        scope: '.',
        display: 'standalone',
        orientation: 'landscape',
        background_color: '#ecfdf5',
        theme_color: '#10b981',
        icons: [
          {
            src: 'icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
        ],
      },
    }),
  ],
});
