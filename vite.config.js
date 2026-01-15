import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                upsell1_basico: resolve(__dirname, 'upsell1-basico/index.html'),
                upsell1_completo: resolve(__dirname, 'upsell1-completo/index.html'),
            },
        },
    },
});
