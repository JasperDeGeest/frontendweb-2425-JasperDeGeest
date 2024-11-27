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
} from '../types/accountAandeel';
import type { IdParams } from '../types/common';
import Joi from 'joi';
import validate from '../core/validation';
import { requireAuthentication, makeRequireRole } from '../core/auth'; // 👈 2
import Role from '../core/roles'; // 👈 4
import type { Next } from 'koa';

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
    rijksregisterNummer: Joi.string().length(11),
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
  ctx.body = await accountService.updateById(Number(ctx.params.id), {
    ...ctx.request.body,
  });
};

const getAandelenByAccountId = async (ctx: KoaContext<GetAllAccountAandelenResponse, IdParams>) => {
  //try {
  const accountAandelen = await accountService.getAandelenByAccountId(Number(ctx.params.id));

  ctx.body = {
    items: accountAandelen,
  };
  /*} catch (error: any) {
    ctx.body = error.message;
    ctx.status = 404;
  }*/
};

export default (parent: KoaRouter) => {
  const router = new Router<PortofolioAppState, PortofolioAppContext>({
    prefix: '/accounts',
  });

  router.post('/', validate(registerAccount.validationScheme),registerAccount);

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
    updateAccount,
  );
  router.get(
    '/:id/aandelen',
    requireAuthentication,
    checkAccountId, 
    getAandelenByAccountId,
  );

  parent.use(router.routes()).use(router.allowedMethods());
};
