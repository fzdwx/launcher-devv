import {defineConfig} from 'vite'
import UnoCSS from 'unocss/vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 35678,
    },
    plugins: [react(), UnoCSS(),],
})
