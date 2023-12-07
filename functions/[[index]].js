import {AESCBC_decrypt} from './_util.js'
export async function onRequestPost(context) {
  const path = context.functionPath;
  const secret = context.env.secret;
  const request = context.request;
  const timer = new Date().getTime() / 1000 >> 0;
  const json =  await request.text();
  const signature = request.headers.get("Signature");
  const decrypt = await AESCBC_decrypt(secret,signature);
  return new Response(JSON.stringify([context,decrypt]),{headers:{'content-type':'application/json;charset=UTF-8'}})
  if(signer === undefined){
    return new Response(JSON.stringify({err:403,msg:'签名错误'},null,2),{headers:{'content-type':'application/json;charset=UTF-8'}})
  }
  if(timer > expire){
    return new Response(JSON.stringify({err:401,msg:'签名已过期'},null,2),{headers:{'content-type':'application/json;charset=UTF-8'}})
  }
  const text = await fetch(`https://vip.youloge.com${path}`, {
    method: 'POST',
    headers: {'content-Type': 'application/json','signer': signer},
    body: json
  }).then(r => r.text());
  return new Response(text,{headers:{'content-type':'application/json;charset=UTF-8'}});
}
