import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            input: {
                forgotpassword: new URL('./forgotpassword.html', import.meta.url).pathname,
            },
        },
    },
})
