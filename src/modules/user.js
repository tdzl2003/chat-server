/**
 * Created by Yun on 2016-03-17.
 */

import { createToken, checkTokenWithInfo } from '../utils/token';
import StatusError from '../utils/StatusError';
import {getDownloadUrl, imageView2} from '../modules/stores';

const LOGIN_EXPIRE_TIME = 30 * 24 * 3600 * 1000;

export function createLoginToken(uid) {
  return createToken({
    type: 'user',
    uid,
    exp: Date.now() + LOGIN_EXPIRE_TIME,
  });
}

export function checkLogined(ctx, next) {
  const token = ctx.header['x-accesstoken'];
  const session = token && checkTokenWithInfo(token, 'user');
  if (!session) {
    throw new StatusError(401);
  }
  ctx.session = session;
  return next();
}

export function getAvatarUrl(key){
  return getDownloadUrl(key, imageView2(1, {w:128, h:128}));
}
