import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/birthday-surprise/', // ชื่อ repo ของคุณ ต้องมี / ข้างหน้าและข้างหลัง
  plugins: [react()],
})