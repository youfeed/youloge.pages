import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'

const modules = import.meta.glob(['/views/*.vue','/views/*/*.vue','/views/*/*/*.vue']);
const routes = []
for (const key in modules) {
  routes.push({
    path:key.replace(/^\/views|\.vue$/g, ''),
    component:modules[key],
  })
}
export const config = {
  // 配置参数
  UKEY:'qRjE+HMLB8WcnAvdcon5Lx2BSGid7OdQUd5ozRV8QHj4sgP91+Y6xMfhrHZbONGpLErJGMZFZ8GAcEwINSE4VjwdEvna0DwHUJ3zzQNFlQg8s8nhqo4/I3y00q31eYi4',
  APIURL:'https://api.youloge.com',
  VIPURL:'https://www.youloge.com',
  OPENURL:'https://www.youloge.com',
  // 路由参数
  ROUTES:routes
}