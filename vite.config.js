import { defineConfig } from 'vite'
import { version } from './package.json'
import vue from '@vitejs/plugin-vue'
import externalGlobals from 'rollup-plugin-external-globals'
import UnoCSS from 'unocss/vite'
export default defineConfig({
  appType:'mpa',
  define:{
    'import.meta.env.VERSION':`"${version}"`,
  },
  plugins: [vue(),UnoCSS()],
  build:{
    cssCodeSplit:true,
    rollupOptions: {
      input:{
        index: 'index.html',
        drive: 'drive.html',
        search: 'search.html',
        article: 'article.html'
      },
      external: ['vue','youloge'],
      plugins:[
        externalGlobals({
          vue: 'Vue',
          youloge: 'youloge',
        })
      ],
      output:{},
    }
  },
})
