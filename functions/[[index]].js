import {AESCBC_decrypt} from './_util.js'
export async function onRequestPost(context) {
  const path = context.functionPath;
  const params = context.params
  const body = context.body
  const request = context.request
  const method = request.method
  const json =  await request.json()
  const contentType = request.headers.get("content-type") || "";
  const signature = request.headers.get("Signature");
  const secret = env.secret;
  const {uuid,signer,expire} = await AESCBC_decrypt(secret,signature);
  return new Response(JSON.stringify([path,params,body,method,contentType,json,uuid,signer,expire], null, 2),{headers:{'content-type':'application/json;charset=UTF-8'}});
    // {request,env}
    // const secret = env.secret;
    // const signature = request.headers.get("Signature");
    // const {uuid,signer,expire} = await AESCBC_decrypt(secret,signature);
    
    // const text = await fetch(`https://vip.youloge.com${path}`, {
    //   method: 'POST',
    //   headers: {
    //     'content-Type': 'application/json',
    //     'signer': signer
    //   },
    //   body: JSON.stringify({
    //     "method": 'list',
    //     "params": {}
    //   })
    // }).then(r => r.json());
    // let data = {signature:signature,text:text,request:request}
    // return new Response(JSON.stringify(data, null, 2),{headers:{'content-type':'application/json;charset=UTF-8'}});
}
