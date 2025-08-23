import path from "path";
import react from "@vitejs/plugin-react";
// import babel from "vite-plugin-babel";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(
	fileURLToPath(import.meta.url),
);

export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: ["babel-plugin-react-compiler"],
			},
		}),
	],
	css: {
		plugins: [tailwindcss()],
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		port: 3344,
		open: true,
		historyApiFallback: true,
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: undefined,
			},
		},
	},
});
