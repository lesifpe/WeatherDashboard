import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // ATENÇÃO: Tem que ser exatamente o nome do seu repositório entre as barras
  base: '/WeatherDashboard/' 
})
