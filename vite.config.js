import { defineConfig } from 'vite'
import { version } from './package.json'
import vue from '@vitejs/plugin-vue'
import externalGlobals from 'rollup-plugin-external-globals'
import UnoCSS from 'unocss/vite'
const TYPE = 'SPA'
export default defineConfig({
  appType:'mpa',
  define:{
    'import.meta.env.VERSION':`"${version}"`,
  },
  plugins: [vue(),UnoCSS()],
  build:{
    // cssCodeSplit:true,
    modulePreload:{ polyfill:false },
    rollupOptions: {
      ...{
        'SPA':{
          input:{
            article: 'article.html',
          },
          output:{
            format: 'umd',
            entryFileNames:'assets/[name].js',
          },
        },
        'MPA':{
          input:{
            index: 'index.html',
            drive: 'drive.html',
            search: 'search.html',
            article: 'article.html'
          },
          output:{},
        }
      }[TYPE],
      external: ['vue','youloge'],
      plugins:[
        externalGlobals({
          vue: 'Vue',
          youloge: 'youloge',
        })
      ],
    }
  },
})
