import {AESCBC_decrypt} from '../_util.js'
export async function onRequest({request,env}) {
  const secret = env.secret;
  const signature = request.headers.get("Signature");
  const {uuid,signer,expire} = await AESCBC_decrypt(secret,signature);
  
  const text = await fetch('https://vip.youloge.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'signer': signer
    },
    body: JSON.stringify({
      "method": 'list',
      "params": {}
    })
  })
  .then(response => response.json());
  let data = {secret:secret,signature:signature,text:JSON.parse(text)}
  return new Response(JSON.stringify(data, null, 2),{headers:{'content-type':'application/json;charset=UTF-8'}});
} 