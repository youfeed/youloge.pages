import { createApp } from "vue"
import Youloge from 'youloge'
import App from './drive.vue'
import {config} from '../config.js'
console.log('YoulogeYoulogeYouloge',Youloge)
createApp(App).use(Youloge,config).mount('#app')

