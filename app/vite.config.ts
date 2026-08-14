import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 构建产物直接落到仓库根目录（GitHub Pages 从 master 根目录发布）。
// assetsDir 用 app-assets/，避开仓库里已有的 assets/（旧 VuePress 站点）。
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: "../dist-site",
    emptyOutDir: true,
    assetsDir: "app-assets",
  },
});
