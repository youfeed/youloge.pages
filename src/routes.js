const modules = import.meta.glob(['/views/*.vue','/views/*/*.vue','/views/*/*/*.vue']);
const routes = []
for (const key in modules) {
  const mod = await modules[key]();
  const {name,icon} = mod.default;
  routes.push({
    name: name|| 'name',
    path:key.replace(/^\/views|\.vue$/g, ''),
    icon:icon || 'icon',
    component:modules[key],
  })
}
// export.default(routes)
export default routes;
// export routes;
// export.default = routes;
console.log(routes)