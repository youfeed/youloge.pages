export async function onRequestPost(context) {
  const functionPath = context.functionPath;
  const params = context.params
  const request = context.request
  const method = request.method
  const json =  await request.json()
  const contentType = request.headers.get("content-type") || "";
  return new Response(JSON.stringify([params,method,contentType,json], null, 2),{headers:{'content-type':'application/json;charset=UTF-8'}});
  return new Response(JSON.stringify(data, null, 2),{headers:{'content-type':'application/json;charset=UTF-8'}});
}
