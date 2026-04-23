import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["directlydrop-icon.sv"],
      manifest: {
        name: "DirectlyDrop",
        short_name: "DirectlyDrop",
        description: "Browser-based universal peer-to-peer file transfer.",
        theme_color: "#06131b",
        background_color: "#06131b",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/directlydrop-icon.sv",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any maskable"
          }
        ]
      }
    })
  ],
  server: {
    host: true,
    port: 5173
  }
});
