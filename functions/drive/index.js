// const Decrypt = ()=>{
//   const secret = context.env.secret;
//   const encoder = new TextEncoder();
// }
export function onRequest(context) {
  const secret = context.env.secret;
  const request = context.request;
  const cf = request.cf;
  const Signature = request.headers.get("Signature");
  let data = {secret:secret,request:request,Signature:Signature,cf:cf}
  return new Response(JSON.stringify(data, null, 2),{headers:{'content-type':'application/json;charset=UTF-8'}});
}