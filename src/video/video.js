import { createApp } from "vue"
import Youloge from 'youloge'
import App from './video.vue'
import {config} from '../config.js'
createApp(App).use(Youloge,config).mount('#app')

