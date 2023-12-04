const Decrypt = async()=>{
  const importKey  = crypto.subtle.importKey("raw", rawKey, "AES-CBC", true, ["encrypt","decrypt",]);
  const rawKey = crypto.getRandomValues(new Uint8Array(16));
  // crypto.subtle.importKey({name:'AES-CBC'})
  const one = crypto.subtle.decrypt({ name: "AES-CBC", iv }, key, ciphertext);
  const two = crypto.subtle.decrypt({ name: "AES-CBC", iv }, key, ciphertext);
}
export function onRequest({request,env}) {
  const signature = request.headers.get("Signature");
  const secret = env.secret;
  const atobs = atob(secret);
  const signatures = atob(signature);
  const iv = atobs.slice(0,16);
  const text = atobs.slice(16,);
  const one = atobs.slice(0,32);
  const two = atobs.slice(32,64);
  const Key_one  = crypto.subtle.importKey("raw", one, "AES-CBC", true, ["encrypt","decrypt",]);
  const Key_two  = crypto.subtle.importKey("raw", two, "AES-CBC", true, ["encrypt","decrypt",]);
  const de_one = crypto.subtle.decrypt({ name: "AES-CBC", iv }, Key_one, text);
  const de_two = crypto.subtle.decrypt({ name: "AES-CBC", iv }, Key_two, de_one);
  // const encode = new TextEncoder().encode(secret)
  // const request = context.request;
  const cf = request.cf;
  const algorithm = 'aes-128-cbc';
  let data = {secret:secret,request:request,signature:signature,de_two:de_two}
  return new Response(JSON.stringify(data, null, 2),{headers:{'content-type':'application/json;charset=UTF-8'}});
} 