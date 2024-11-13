import type Application from 'koa';

import Router from '@koa/router';
import installAandeelRouter from './aandeel';
import installHealthRouter from './health';
import installAccountRouter from './account';

export default (app: Application) => {
  const router = new Router({
    prefix: '/api',
  });

  installAandeelRouter(router);
  installHealthRouter(router);
  installAccountRouter(router);

  app.use(router.routes()).use(router.allowedMethods());
};
