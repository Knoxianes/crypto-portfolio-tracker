import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            input: {
                verification_token_reset: new URL('./verification_token_reset.html', import.meta.url).pathname,
            },
        },
    },
})
