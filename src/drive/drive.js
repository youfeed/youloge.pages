import { createApp } from "vue"
import youloge from 'youloge'
import App from './drive.vue'
import {config} from '../config.js'

createApp(App).use(youloge,config).mount('#app')

