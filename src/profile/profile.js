import { createApp } from 'vue'
import App from './profile.vue'
import youloge from "youloge";
import {config} from '../config.js'
createApp(App).use(youloge,config).mount('#app')
