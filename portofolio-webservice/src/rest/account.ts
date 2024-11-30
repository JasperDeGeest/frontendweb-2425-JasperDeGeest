import Router from '@koa/router';
import * as accountService from '../service/account';
import type { PortofolioAppContext, PortofolioAppState } from '../types/koa';
import type { KoaContext, KoaRouter } from '../types/koa';
import type {
  GetAllAccountsResponse,
  RegisterAccountRequest,
  GetAccountByIdResponse,
  UpdateAccountRequest,
  UpdateAccountResponse,
  LoginResponse,
  GetAccountRequest,
} from '../types/account';
import type {
  GetAllAccountAandelenResponse,
  GetAccountAandelenRequest,
  UpdateAccountAandeelResponse,
  UpdateAccountAandeelRequest,
  getAccountAandeelByIdResponse,
} from '../types/accountAandeel';
import Joi from 'joi';
import validate from '../core/validation';
import { requireAuthentication, makeRequireRole, authDelay } from '../core/auth'; // 👈 2
import Role from '../core/roles'; // 👈 4
import type { Next } from 'koa';
import type { IdParams } from '../types/common';

const checkAccountId = (ctx: KoaContext<unknown, GetAccountRequest>, next: Next) => {
  const { accountId, roles } = ctx.state.session;
  const { id } = ctx.params;
  // You can only get our own data unless you're an admin
  if (id !== 'me' && id !== accountId && !roles.includes(Role.ADMIN)) {
    return ctx.throw(
      403,
      'You are not allowed to view this user\'s information',
      { code: 'FORBIDDEN' },
    );
  }
  return next();
};

const getAllAccounts = async (ctx: KoaContext<GetAllAccountsResponse>) => {
  const accounts = await accountService.getAll();
  ctx.body = { items: accounts };
};
getAllAccounts.validationScheme = null;

const registerAccount = async (
  ctx: KoaContext<LoginResponse, void, RegisterAccountRequest>,
) => {
  const token = await accountService.register(ctx.request.body);
  ctx.status = 201;
  ctx.body = { token };
};

registerAccount.validationScheme = {
  body: {
    email: Joi.string().email(),
    Password: Joi.string().min(12).max(128),
    onbelegdVermogen: Joi.number().min(0),
    rijksregisterNummer: Joi.number().min(10000000000).max(99999999999),
    voornaam: Joi.string().max(255),
    achternaam: Joi.string().max(255),
    adres: Joi.object({
      straat: Joi.string().max(255),
      huisNummer: Joi.string().max(255),
      stad: Joi.string().max(255),
      land: Joi.string().max(255),
    }),
  },
};

const getAccountById = async (
  ctx: KoaContext<GetAccountByIdResponse, GetAccountRequest>, // 👈
) => {
  // 👇
  const account = await accountService.getById(
    ctx.params.id === 'me' ? ctx.state.session.accountId : ctx.params.id,
  );
  ctx.status = 200;
  ctx.body = account;
};
getAccountById.validationScheme = {
  params: {
    // 👇
    id: Joi.alternatives().try(
      Joi.number().integer().positive(),
      Joi.string().valid('me'),
    ),
  },
};

const updateAccount = async (ctx: KoaContext<UpdateAccountResponse, IdParams, UpdateAccountRequest>) => {
  const account = await accountService.updateById(
    ctx.params.id === 'me' ? ctx.state.session.accountId : ctx.params.id, 
    ctx.request.body);
  ctx.status = 200;
  ctx.body = account;
};
updateAccount.validationScheme = {
  params: {
    id: Joi.alternatives().try(
      Joi.number().integer().positive(),
      Joi.string().valid('me'),
    ),
  },
};

const getAandelenByAccountId = async (ctx: KoaContext<GetAllAccountAandelenResponse, GetAccountAandelenRequest>) => {
  //try {
  const accountAandelen = await accountService.getAandelenByAccountId(
    ctx.params.id === 'me' ? ctx.state.session.accountId : ctx.params.id,
  );

  ctx.body = {
    items: accountAandelen,
  };
  /*} catch (error: any) {
    ctx.body = error.message;
    ctx.status = 404;
  }*/
};

const updateAccountAandeel = async (ctx: KoaContext<UpdateAccountAandeelResponse, 
  IdParams, UpdateAccountAandeelRequest>) => {
  const accountAandeel = await accountService.updateAccountAandeel(
    ctx.params.id === 'me' ? ctx.state.session.accountId : ctx.params.id, 
    Number(ctx.params.aandeelId),
    ctx.request.body);
  ctx.status = 200;
  ctx.body = accountAandeel;
};

export default (parent: KoaRouter) => {
  const router = new Router<PortofolioAppState, PortofolioAppContext>({
    prefix: '/accounts',
  });

  const getAccountAandeelById = async (ctx: KoaContext<getAccountAandeelByIdResponse, IdParams>) => {
    const accountAandeel = await accountService.getAccountAandeelById(
      ctx.state.session.accountId,
      ctx.params.aandeelId);
    ctx.status = 200;
    ctx.body = accountAandeel; 
  };

  router.post('/', authDelay, validate(registerAccount.validationScheme),registerAccount);

  const requireAdmin = makeRequireRole(Role.ADMIN);
  router.get(
    '/',
    requireAuthentication,
    requireAdmin,
    validate(getAllAccounts.validationScheme),
    getAllAccounts,
  );
  router.get(
    '/:id',
    requireAuthentication,
    checkAccountId,
    validate(getAccountById.validationScheme),
    getAccountById,
  );
  router.put(
    '/:id',
    requireAuthentication,
    checkAccountId,
    validate(updateAccount.validationScheme),
    updateAccount,
  );
  router.get(
    '/:id/aandelen',
    requireAuthentication,
    checkAccountId, 
    getAandelenByAccountId,
  );
  router.put(
    '/:id/aandelen/:aandeelId',
    requireAuthentication,
    checkAccountId,
    //validate(updateAccountAandeel.validationScheme),
    updateAccountAandeel,
  );
  router.get(
    '/:id/aandelen/:aandeelId',
    requireAuthentication,
    checkAccountId,
    //validate(updateAccountAandeel.validationScheme),
    getAccountAandeelById,
  );

  parent.use(router.routes()).use(router.allowedMethods());
};
