import Router from '@koa/router';
import * as accountService from '../service/account';
import type { PortofolioAppContext, PortofolioAppState } from '../types/koa';
import type { KoaContext, KoaRouter } from '../types/koa';
import type {
  RegisterAccountRequest,
  GetAccountByIdResponse,
  UpdateAccountRequest,
  UpdateAccountResponse,
  LoginResponse,
} from '../types/account';
import type {
  GetAllAccountAandelenResponse,
} from '../types/accountAandeel';
import type { IdParams } from '../types/common';
import Joi from 'joi';
import validate from '../core/validation';
import { requireAuthentication, makeRequireRole } from '../core/auth'; // 👈 2
import Role from '../core/roles'; // 👈 4

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

const getAccountById = async (ctx: KoaContext<GetAccountByIdResponse, IdParams>) => {
  //try {
  ctx.body = await accountService.getById(Number(ctx.params.id));
  /*} catch (error: any) {
    ctx.status = 404;
    ctx.body = error.message;
  }*/
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
  router.get('/:id', getAccountById);
  router.put('/:id', updateAccount);
  router.get('/:id/aandelen', getAandelenByAccountId);

  parent.use(router.routes()).use(router.allowedMethods());
};
