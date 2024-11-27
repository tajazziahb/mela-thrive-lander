// vite.config.js
import {resolve} from 'path'
import {defineConfig} from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                mentor: resolve(__dirname, 'mentor/waitlist.html'),
                mentee: resolve(__dirname, 'mentee/waitlist.html'),

            },
        },
    },
})