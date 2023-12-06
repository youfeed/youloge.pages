import {AESCBC_decrypt} from './_util.js'
export async function onRequestPost(context) {
  const path = context.functionPath;
  const secret = context.env.secret;
  const params = context.params;
  const body = context.body;
  const request = context.request;
  const method = request.method;
  const timer = new Date().getTime() / 1000 >> 0;
  const json =  await request.text();
  const contentType = request.headers.get("content-type") || "";
  const signature = request.headers.get("Signature");
  const {uuid,signer,expire} = await AESCBC_decrypt(secret,signature);
  if(timer > expire){
    new Response(JSON.stringify({code:401,msg:'签名已过期'},null,2),{headers:{'content-type':'application/json;charset=UTF-8'}})
  }
  const text = await fetch(`https://vip.youloge.com${path}`, {
    method: 'POST',
    headers: {'content-Type': 'application/json','signer': signer},
    body: json
  }).then(r => r.json());
  return new Response(JSON.stringify([path,params,body,method,contentType,json,uuid,timer,expire,text], null, 2),{headers:{'content-type':'application/json;charset=UTF-8'}});
}
