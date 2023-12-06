import {AESCBC_decrypt} from '../_util.js'
export async function onRequest(context) {
  const functionPath = context.functionPath;
  const params = context.params
  const request = context.request
  const method = request.method
  const body = await request.body
  const contentType = context.headers.get("content-type") || "ss";
  return new Response(JSON.stringify([body,params,method,request,contentType], null, 2),{headers:{'content-type':'application/json;charset=UTF-8'}});
  // {request,env}
  const secret = env.secret;
  const signature = request.headers.get("Signature");
  const {uuid,signer,expire} = await AESCBC_decrypt(secret,signature);
  
  const text = await fetch('https://vip.youloge.com', {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
      'signer': signer
    },
    body: JSON.stringify({
      "method": 'list',
      "params": {}
    })
  }).then(r => r.json());
  let data = {signature:signature,text:text,request:request}
  return new Response(JSON.stringify(data, null, 2),{headers:{'content-type':'application/json;charset=UTF-8'}});
} 