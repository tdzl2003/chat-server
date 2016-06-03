/**
 * Created by tdzl2003 on 3/7/16.
 */

import {
  jws,
  b64utos,
} from 'jsrsasign';

const SECRET = process.env.SECRET || 'secret';

if (process.env.NODE_ENV === 'production' && SECRET === 'secret') {
  throw new Error('Must have secret configured on production mode.');
}

export function createToken(payload) {
  return jws.JWS.sign(null, {
    alg: 'HS256',
    typ: 'JWT',
  }, payload, SECRET);
}

export function loadToken(token) {
  try {
    if (!jws.JWS.verifyJWT(token, SECRET, {
        alg: ['HS256'],
      })) {
      return;
    }
    const a = token.split('.');
    return jws.JWS.readSafeJSONString(b64utos(a[1]));
  } catch (e) {
  }
}

export function checkTokenWithInfo(token) {
  const info = loadToken(token);
  if (!info || info.exp < Date.now()) {
    return;
  }
  return info;
}
