import Router from '@koa/router';
import * as accountService from '../service/account';
import type { Context } from 'koa';

const getAccountById = async (ctx: Context) => {
  ctx.body = accountService.getById(Number(ctx.params.id));
};

const createAccount = async (ctx: Context) => {
  const newAandeel = accountService.create({
    ...ctx.request.body,
  });
  ctx.body = newAandeel;
};

const updateAccount = async (ctx: Context) => {
  ctx.body = accountService.updateById(Number(ctx.params.id), {
    ...ctx.request.body,
  });
};

export default (parent: Router) => {
  const router = new Router({
    prefix: '/accounts',
  });

  router.post('/', createAccount);
  router.get('/:id', getAccountById);
  router.put('/:id', updateAccount);

  parent.use(router.routes()).use(router.allowedMethods());
};
