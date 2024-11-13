import type Application from 'koa';

import Router from '@koa/router';
import installAandeelRouter from './aandeel';
import installHealthRouter from './health';

export default (app: Application) => {
  const router = new Router({
    prefix: '/api',
  });

  installAandeelRouter(router);
  installHealthRouter(router);

  app.use(router.routes()).use(router.allowedMethods());
};
