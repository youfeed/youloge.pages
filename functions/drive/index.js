// const Decrypt = ()=>{
//   const secret = context.env.secret;
//   const encoder = new TextEncoder();
// }
export function onRequest(context) {
  const secret = context.env.secret
  let data = {secret:secret,context:context}
  return new Response(JSON.stringify(data, null, 2),{headers:{'content-type':'application/json;charset=UTF-8'}});
}