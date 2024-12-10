import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ["src/**/*.ts", "src/**/*.tsx"], // Include all TypeScript and TSX files
      insertTypesEntry: true, // Insert a types entry in package.json
      outDir: path.join(__dirname, "dist"), // Output directory for the .d.ts files
      copyDtsFiles: true, // Copy other .d.ts files from dependencies
      tsconfigPath: path.join(__dirname, "tsconfig.app.json"), // Path to your tsconfig file
      exclude: ["**/*.test.ts", "**/*.test.tsx"], // Exclude test files from the declaration files
    }),
  ],
  build: {
    minify: "esbuild",
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "react-util-hooks",
      fileName: (format) => `react-util-hooks-${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
