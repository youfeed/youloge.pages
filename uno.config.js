import {defineConfig,presetAttributify,presetIcons,presetTypography,presetUno,presetWebFonts,} from 'unocss'

export default defineConfig({
  shortcuts:[
    ['f-c-c', 'flex justify-center items-center'],
    ['f-c-b', 'flex justify-between items-center'],
  ],
  theme:{},
  presets: [
    presetUno({ attributifyPseudo: true,}),presetAttributify(),
    presetIcons({ scale: 1.2, warn: true}),
    presetTypography(),
    presetWebFonts({
      provider: 'none',
      fonts: {
        sans: 'Roboto',
        script: 'Homemade Apple',
      },
    }),
  ],
})