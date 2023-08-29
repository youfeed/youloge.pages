import { defineConfig } from 'vite'
import { version } from './package.json'
import vue from '@vitejs/plugin-vue'
import externalGlobals from 'rollup-plugin-external-globals'

export default defineConfig({
  define:{
    'import.meta.env.VERSION':version,
  'process.env':{
    NODE_ENVS:'11111'
    }
  },
  plugins: [vue()],
  build:{
    cssCodeSplit:true,
    rollupOptions: {
      external: ['vue','youloge'],
      plugins:[
        externalGlobals({
          vue: 'Vue',
          youloge: 'youloge',
        })
      ],
      input:{
        index: 'index.html',
        // drive: 'drive.html',
        article: 'article.html'
      },
      output:{},
    }
  },
})
