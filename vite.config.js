import { defineConfig } from 'vite'
import { version } from './package.json'
import vue from '@vitejs/plugin-vue'
import externalGlobals from 'rollup-plugin-external-globals'
import UnoCSS from 'unocss/vite'
const TYPE = 'MPA'
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
            profile: 'profile.html',
          },
          output:{
            format: 'umd',
            entryFileNames:'assets/[name].js',
          },
        },
        'MPA':{
          input:{
            404: '404.html',
            link: 'link.html',
            index: 'index.html',
            video: 'video.html',
            drive: 'drive.html',
            goods: 'goods.html',
            search: 'search.html',
            profile: 'profile.html',
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
