import { createApp } from "vue"
import youloge from 'youloge'
import App from './article.vue'
import {config} from '../config.js'
createApp(App).use(youloge,config).mount('#app')

