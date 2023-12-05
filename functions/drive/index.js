import {AESCBC_decrypt} from '../_util.js'
export async function onRequest({request,env}) {
  const secret = env.secret;
  const signature = request.headers.get("Signature");
  const text = await AESCBC_decrypt(secret,signature);
  
  // const encode = new TextEncoder().encode(secret)
  // const request = context.request;
  // const cf = request.cf;
  // const algorithm = 'aes-128-cbc';
  let data = {secret:secret,signature:signature,text:JSON.parse(text)}
  return new Response(JSON.stringify(data, null, 2),{headers:{'content-type':'application/json;charset=UTF-8'}});
} 