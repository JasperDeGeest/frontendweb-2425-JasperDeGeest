import type {
  PortofolioAppContext,
  PortofolioAppState,
  KoaApplication,
} from '../types/koa';

import Router from '@koa/router';
import installAandeelRouter from './aandeel';
import installHealthRouter from './health';
import installAccountRouter from './account';
import installSessionRouter from './sessions';

export default (app: KoaApplication) => {
  const router = new Router<PortofolioAppState, PortofolioAppContext>({
    prefix: '/api',
  });

  installAandeelRouter(router);
  installHealthRouter(router);
  installAccountRouter(router);
  installSessionRouter(router);

  app.use(router.routes()).use(router.allowedMethods());
};
