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
            },
        },
    },
});
