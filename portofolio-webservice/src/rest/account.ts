import Router from '@koa/router';
import * as accountService from '../service/account';
import type { PortofolioAppContext, PortofolioAppState } from '../types/koa';
import type { KoaContext, KoaRouter } from '../types/koa';
import type {
  CreateAccountRequest,
  CreateAccountResponse,
  GetAccountByIdResponse,
  UpdateAccountRequest,
  UpdateAccountResponse,
} from '../types/account';
import type {
  GetAllAccountAandelenResponse,
} from '../types/accountAandeel';
import type { IdParams } from '../types/common';

const getAccountById = async (ctx: KoaContext<GetAccountByIdResponse, IdParams>) => {
  try {
    ctx.body = await accountService.getById(Number(ctx.params.id));
  } catch (error: any) {
    ctx.status = 404;
    ctx.body = error.message;
  }
};

const createAccount = async (ctx: KoaContext<CreateAccountResponse, void, CreateAccountRequest>) => {
  const newAccount = await accountService.create({
    ...ctx.request.body,
  });
  ctx.body = newAccount;
};

const updateAccount = async (ctx: KoaContext<UpdateAccountResponse, IdParams, UpdateAccountRequest>) => {
  ctx.body = await accountService.updateById(Number(ctx.params.id), {
    ...ctx.request.body,
  });
};

const getAandelenByAccountId = async (ctx: KoaContext<GetAllAccountAandelenResponse, IdParams>) => {
  try {
    const accountAandelen = await accountService.getAandelenByAccountId(Number(ctx.params.id));

    ctx.body = {
      items: accountAandelen,
    };
  } catch (error: any) {
    ctx.body = error.message;
    ctx.status = 404;
  }
};

export default (parent: KoaRouter) => {
  const router = new Router<PortofolioAppState, PortofolioAppContext>({
    prefix: '/accounts',
  });

  router.post('/', createAccount);
  router.get('/:id', getAccountById);
  router.put('/:id', updateAccount);
  router.get('/:id/aandelen', getAandelenByAccountId);

  parent.use(router.routes()).use(router.allowedMethods());
};
