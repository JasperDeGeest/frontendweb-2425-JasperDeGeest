import Router from '@koa/router';
import * as accountService from '../service/account';
import type { Context } from 'koa';

const getAccountById = async (ctx: Context) => {
  try {
    ctx.body = await accountService.getById(Number(ctx.params.id));
  } catch (error: any) {
    ctx.status = 404;
    ctx.body = error.message;
  }
};

const createAccount = async (ctx: Context) => {
  const newAccount = await accountService.create({
    ...ctx.request.body,
  });
  ctx.body = newAccount;
};

const updateAccount = async (ctx: Context) => {
  ctx.body = await accountService.updateById(Number(ctx.params.id), {
    ...ctx.request.body,
  });
};

const getAandelenByAccountId = async (ctx: Context) => {
  try {
    ctx.body = await accountService.getAandelenByAccountId(Number(ctx.params.accountId));
  } catch (error: any) {
    ctx.body = error.message;
    ctx.status = 404;
  }
};

export default (parent: Router) => {
  const router = new Router({
    prefix: '/accounts',
  });

  router.post('/', createAccount);
  router.get('/:id', getAccountById);
  router.put('/:id', updateAccount);
  router.get('/:accountId/aandelen', getAandelenByAccountId);

  parent.use(router.routes()).use(router.allowedMethods());
};
