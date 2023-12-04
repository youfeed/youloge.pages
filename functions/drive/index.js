// const Decrypt = ()=>{
//   const secret = context.env.secret;
//   const encoder = new TextEncoder();
// }
export function onRequest(context) {
  // const secret = env.secret
  // const signature = request.headers.get('signature');
  let JSON = {request:context.request,env:context.env}
  return new Response(JSON.stringify(JSON, null, 2),{headers:{'content-type':'application/json;charset=UTF-8'}});
}