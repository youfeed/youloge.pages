const Decrypt = ()=>{
  const secret = context.env.secret;
  const encoder = new TextEncoder();
}
export function onRequest({request,env,params,data}) {
  // const signature = context.headers.get('signature');
  const secret = env.secret
  let JSON = {request:request,env:env,params:params,data:data}
  return new Response(JSON.stringify(JSON, null, 2),{headers:{'content-type':'application/json;charset=UTF-8'}});
}