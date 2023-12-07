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
  UKEY:'8rR/lr0ugwqzUvBWGABJYRhTZnW+bDiS/1ha+mbat19zGuSX2hW8nHPkVxgaE1BguqDNiiCuSiVCvSk6bI21pqcOCJ50Mqd/9nOv9K4tNrjXx5J0HisriHHmv+2o25WQ',
  APIURL:'https://api.youloge.com',
  VIPURL:'https://www.youloge.com',
  OPENURL:'https://www.youloge.com',
  // 路由参数
  ROUTES:routes
}