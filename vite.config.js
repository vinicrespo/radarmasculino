import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                upsell1_completopopup: resolve(__dirname, 'upsell1-completopopup/index.html'),
                upsell1_completo: resolve(__dirname, 'upsell1-completo/index.html'),
                downsell1_completopopup: resolve(__dirname, 'downsell1-completopopup/index.html'),
                downsell1_completo: resolve(__dirname, 'downsell1-completo/index.html'),
                thanks: resolve(__dirname, 'thanks/index.html'),
                politica_privacidad: resolve(__dirname, 'politica-de-privacidad.html'),
                terminos_uso: resolve(__dirname, 'terminos-de-uso.html'),
                politica_reembolso: resolve(__dirname, 'politica-de-reembolso.html'),
                disclaimer: resolve(__dirname, 'disclaimer.html'),
            },
        },
    },
});
