import { createApp } from "vue"
import Youloge from 'youloge'
import App from './goods.vue'
import {config} from '../config.js'
createApp(App).use(Youloge,config).mount('#app')

