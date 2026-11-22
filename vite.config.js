import { defineConfig } from 'vite';

// Relative base: the built site works at a domain root and inside a sub-folder alike (GitHub Pages serves it
// from /<repository>/), without having to know the folder's name.
export default defineConfig({ base: './' });
