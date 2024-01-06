/*
* 支付通知
* 需要在10秒内消费掉
*/
const b64ToUint6 = (nChr)=>{
  return nChr > 64 && nChr < 91
    ? nChr - 65
    : nChr > 96 && nChr < 123
      ? nChr - 71
      : nChr > 47 && nChr < 58
        ? nChr + 4
        : nChr === 43
          ? 62
          : nChr === 47
            ? 63
            : 0;
}
const base64DecToArr = (sBase64, nBlocksSize) =>{
  // Remove any non-base64 characters, such as trailing "=", whitespace, and more.
  const sB64Enc = sBase64.replace(/[^A-Za-z0-9+/]/g, ""); 
  const nInLen = sB64Enc.length;
  const nOutLen = nBlocksSize
    ? Math.ceil(((nInLen * 3 + 1) >> 2) / nBlocksSize) * nBlocksSize
    : (nInLen * 3 + 1) >> 2;
  const taBytes = new Uint8Array(nOutLen);

  let nMod3;
  let nMod4;
  let nUint24 = 0;
  let nOutIdx = 0;
  for (let nInIdx = 0; nInIdx < nInLen; nInIdx++) {
    nMod4 = nInIdx & 3;
    nUint24 |= b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << (6 * (3 - nMod4));
    if (nMod4 === 3 || nInLen - nInIdx === 1) {
      nMod3 = 0;
      while (nMod3 < 3 && nOutIdx < nOutLen) {
        taBytes[nOutIdx] = (nUint24 >>> ((16 >>> nMod3) & 24)) & 255;
        nMod3++;
        nOutIdx++;
      }
      nUint24 = 0;
    }
  }

  return taBytes;
}
const AES_decrypt = async(secret,string)=>{
  try{
    const atobs = base64DecToArr(secret);
    const signature = base64DecToArr(string);
    const one = atobs.slice(0,32);
    const two = atobs.slice(32,64);
    const iv = signature.slice(0,16);
    const text = signature.slice(16,);
    const key_one  = await crypto.subtle.importKey("raw", one, "AES-CBC", true, ["encrypt","decrypt",]);
    const key_two  = await crypto.subtle.importKey("raw", two, "AES-CBC", true, ["encrypt","decrypt",]);
    const de_one = await crypto.subtle.decrypt({ name: "AES-CBC", iv }, key_one, text);
    const de_two = await crypto.subtle.decrypt({ name: "AES-CBC", iv }, key_two, de_one);
    return JSON.parse(new TextDecoder("utf-8").decode(de_two));
  } catch (error) {
    return {}
  }
}

export async function onRequestPost(context) {
  const path = context.functionPath;
  const secret = context.env.secret;
  const request = context.request;
  const timer = new Date().getTime() / 1000 >> 0;
  const json =  await request.text();
  const signature = request.headers.get("Signature");
  const {signer,expire} = await AES_decrypt(secret,signature) ;
  // AES_decrypt 需要try catch 包裹
  if(signer === undefined){
    return new Response(JSON.stringify({err:403,msg:'签名错误2'},null,2),{headers:{'content-type':'application/json;charset=UTF-8'}})
  }
  if(timer > expire){
    return new Response(JSON.stringify({err:401,msg:'签名已过期2'},null,2),{headers:{'content-type':'application/json;charset=UTF-8'}})
  }
  const text = await fetch(`https://vip.youloge.com${path}`, {
    method: 'POST',
    headers: {'content-Type': 'application/json','signer': signer},
    body: json
  }).then(r=>r.text());
  return new Response(text,{headers:{'content-type':'application/json;charset=UTF-8'}});
}