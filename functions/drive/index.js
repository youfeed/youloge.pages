export function onRequest(context) {
  let data = {}
  return new Response(JSON.stringify(data, null, 2),{headers:{'content-type':'application/json;charset=UTF-8'}});
}