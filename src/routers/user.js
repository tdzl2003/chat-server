/**
 * Created by tdzl2003 on 3/7/16.
 */

import { sync as createUid } from 'uid-safe';
import Router from 'koa-router';
import { User } from '../../models';
import md5 from '../utils/md5';
import { checkLogined, createLoginToken } from '../modules/user';
import StatusError from '../utils/StatusError';

import { createToken, checkTokenWithInfo } from '../utils/token';
import {getAvatarUrl} from '../modules/user';

const router = new Router();


router.get('/me', checkLogined, async (ctx) => {
  const { uid } = ctx.session;
  const user = await User.findById(uid, {
    attributes: ['id', 'name', 'avatar'],
  });
  if (!user) {
    throw new StatusError(401);
  }
  ctx.body = {
    id: user.id,
    name: user.name,
    avatar: getAvatarUrl(user.avatar),
  }
});

router.get('/info/:uid', checkLogined, async (ctx) => {
  const { uid } = ctx.params;
  const user = await User.findById(uid, {
    attributes: ['id', 'name', 'avatar'],
  });
  if (!user) {
    throw new StatusError(401);
  }
  ctx.body = {
    id: user.id,
    name: user.name,
    avatar: getAvatarUrl(user.avatar),
  }
});

router.post('/register', async (ctx) => {
  const { account, pwd, name, avatar } = ctx.request.body;
  const salt = createUid(16) + '==';

  const secret = md5(pwd + salt);

  const user = await User.create({
    account,
    name,
    avatar,
    salt,
    secret,
  });

  ctx.body = {
    id: user.id,
    token: createLoginToken(user.id),
    avatar: getAvatarUrl(avatar),
  };
});

router.post('/login', async (ctx) => {
  const { account, pwd } = ctx.request.body;

  const user = await User.findOne({
    where: {
      account,
    },
    attributes: ['id', 'name', 'avatar', 'salt', 'secret'],
  });

  if (!user || user.secret !== md5(pwd + user.salt)) {
    throw new StatusError(403, '用户名或密码错误');
  }

  ctx.body = {
    id: user.id,
    token: createLoginToken(user.id),
    info:{
      id: user.id,
      name: user.name,
      avatar: getAvatarUrl(user.avatar),
    },
  };
});

router.post('/search', async ctx => {
  const {name} = ctx.request.body;
  const users = await User.findAll({
    where: {
      name,
    },
    attributes: ['id', 'name', 'avatar'],
    limit: 50,
  });

  ctx.body = {
    list: users.map(user=>({
      id: user.id,
      name: user.name,
      avatar: getAvatarUrl(user.avatar)
    }))
  }
})

export default router;
