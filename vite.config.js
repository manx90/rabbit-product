import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(
	fileURLToPath(import.meta.url),
);

export default defineConfig({
	plugins: [react()],
	css: {
		plugins: [tailwindcss()],
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});

