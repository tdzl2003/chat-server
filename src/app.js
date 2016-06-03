/**
 * Created by tdzl2003 on 3/7/16.
 */
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import StatusError from './utils/StatusError';
import router from './router';
import { ValidationError } from 'sequelize';

const app = new Koa();

export default app;

app.use(bodyParser());

// Translate error into json respnose.
app.use((ctx, next) => {
  if (__DEV__) {
    console.log(ctx.url, ctx.request.body);
  }
  return next()
    .then(() => {
      if (__DEV__) {
        console.log(ctx.body);
      }
      ctx.body = ctx.body || { ok: 1 };
      ctx.body.ok = 1;
    }, err => {
      if (__DEV__) {
        console.error(err.stack);
      }
      ctx.body = {
        message: err.message,
      };
      if (err instanceof ValidationError) {
        ctx.status = 400;
      } else {
        ctx.status = (err instanceof StatusError) ? err.code : 500;
      }
    });
});

app.use(router.routes());

app.use(() => Promise.reject(new StatusError(404, 'Invalid API')));
