const Decrypt = async()=>{
  const rawKey = crypto.getRandomValues(new Uint8Array(16));
  const importKey  = crypto.subtle.importKey("raw", rawKey, "AES-CBC", true, ["encrypt","decrypt",]);
  // crypto.subtle.importKey({name:'AES-CBC'})
  const one = crypto.subtle.decrypt({ name: "AES-CBC", iv }, key, ciphertext);
  const two = crypto.subtle.decrypt({ name: "AES-CBC", iv }, key, ciphertext);
}
export function onRequest({request,env}) {
  const secret = env.secret;
  const encode = new TextEncoder().encode(secret)
  // const request = context.request;
  const cf = request.cf;
  const Signature = request.headers.get("Signature");
  const algorithm = 'aes-128-cbc';
  let data = {secret:secret,request:request,signature:Signature,encode:encode.length}
  return new Response(JSON.stringify(data, null, 2),{headers:{'content-type':'application/json;charset=UTF-8'}});
}