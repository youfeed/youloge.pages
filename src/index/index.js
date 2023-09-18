import { createApp } from 'vue'
import App from './index.vue'
import youloge from "youloge";
// import routes from '../routes'
/**
 * hash文件路由
 */
const modules = import.meta.glob(['/views/*.vue','/views/*/*.vue','/views/*/*/*.vue']);
const routes = []
for (const key in modules) {
  // const mod = await modules[key]();
  // const {name,icon} = mod.default;
  routes.push({
    path:key.replace(/^\/views|\.vue$/g, ''),
    component:modules[key],
  })
}
console.log(routes)
createApp(App).use(youloge,{
  ukey:'qRjE+HMLB8WcnAvdcon5Lx2BSGid7OdQUd5ozRV8QHj4sgP91+Y6xMfhrHZbONGpLErJGMZFZ8GAcEwINSE4VjwdEvna0DwHUJ3zzQNFlQg8s8nhqo4/I3y00q31eYi4',
  APIURL:'https://api.youloge.com',
  VIPURL:'https://www.youloge.com',
  size:'12px',
  route:{
    routes
  }
}).mount('#app')
