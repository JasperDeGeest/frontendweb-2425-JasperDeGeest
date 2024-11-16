import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { getLogger } from './core/logging';
import installRest from './rest';
import config from 'config';
import koaCors from '@koa/cors';
import { initializeData } from './data'; // 👈 1

const CORS_ORIGINS = config.get<string[]>('cors.origins'); // 👈 2
const CORS_MAX_AGE = config.get<number>('cors.maxAge'); // 👈 2

const app = new Koa();

async function main(): Promise<void> {
  app.use(
    koaCors({
      origin: (ctx) => {
        if (CORS_ORIGINS.indexOf(ctx.request.header.origin!) !== -1) {
          return ctx.request.header.origin!;
        }
        return CORS_ORIGINS[0] || '';
      },
      allowHeaders: ['Accept', 'Content-Type', 'Authorization'],
      maxAge: CORS_MAX_AGE,
    }),
  );

  app.use(bodyParser());
  await initializeData();

  installRest(app);

  app.listen(9000, () => {
    getLogger().info('🚀 Server listening on http://127.0.0.1:9000');
  });
  
}
main();
