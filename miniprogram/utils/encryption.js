import sha256 from './sha256'


const newNonce = () => {
  const str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let nonce = '';
  for (let i = 16; i > 0; --i)
    nonce += str[Math.floor(Math.random() * str.length)];
  return nonce;
};


const encryption = (method, url, token) => {
  const newNonceStr = newNonce();
  const timestamp = Math.floor(new Date().getTime() / 1000);
  if(url[0] !== '/'){
    url = `/${url}`
  }
  const signatureObj = {
    method: method
      ?.toUpperCase() || 'GET',
    url: encodeURI(url || ''),
    nonce: newNonceStr,
    timestamp,
    authorization: token
  };
  let signature = '';
  Object
    .keys(signatureObj)
    .sort()
    .forEach((key) => {
      signature += `${key}=${signatureObj[key]}`;
    });
  const res = {
    signature: sha256(signature),
    timestamp,
    nonce: newNonceStr
  }
  return res
}

export default encryption