import Router from '@koa/router';
import * as accountService from '../service/account';
import type { portfolioAppContext, portfolioAppState } from '../types/koa';
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
  CreateAccountAandeelRequest,
  CreateAccountAandeelResponse,
} from '../types/accountAandeel';
import Joi from 'joi';
import validate from '../core/validation';
import { requireAuthentication, makeRequireRole, authDelay } from '../core/auth';
import Role from '../core/roles';
import type { Next } from 'koa';
import type { IdParams } from '../types/common';

const checkAccountId = (ctx: KoaContext<unknown, GetAccountRequest>, next: Next) => {
  const { accountId, roles } = ctx.state.session;
  const { id } = ctx.params;

  if (String(id) !== 'me' && String(id) !== String(accountId) && !roles.includes(Role.ADMIN)) {
    return ctx.throw(
      403,
      'You are not allowed to view this user\'s information',
      { code: 'FORBIDDEN' },
    );
  }
  return next();
};

/**
 * @api {get} /accounts Get all accounts
 * @apiName GetAllAccounts
 * @apiGroup Account
 * @apiSuccess {Object[]} items List of accounts.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "items": [
 *       {
 *         "id": 1,
 *         "email": "example@example.com",
 *         "voornaam": "John",
 *         "achternaam": "Doe"
 *       }
 *     ]
 *   }
 * @apiError (Error 500) {Object} INTERNAL_SERVER_ERROR Internal server error.
 */
const getAllAccounts = async (ctx: KoaContext<GetAllAccountsResponse>) => {
  const accounts = await accountService.getAll();
  ctx.body = { items: accounts };
};
getAllAccounts.validationScheme = null;

/**
 * @api {post} /accounts Register a new account
 * @apiName RegisterAccount
 * @apiGroup Account
 * @apiParam (Body) {String} email Email of the account.
 * @apiParam (Body) {String} password Password of the account.
 * @apiParam (Body) {Number} onbelegdVermogen Uninvested capital of the account.
 * @apiParam (Body) {Number} rijksregisterNummer National register number of the account.
 * @apiParam (Body) {String} voornaam First name of the account.
 * @apiParam (Body) {String} achternaam Last name of the account.
 * @apiParam (Body) {Object} adres Address of the account.
 * @apiSuccess {String} token Authentication token.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "token": "jwt-token"
 *   }
 * @apiError (Error 400) {Object} VALIDATION_FAILED Validation failed.
 * @apiError (Error 500) {Object} INTERNAL_SERVER_ERROR Internal server error.
 */
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
    Password: Joi.string().min(8).max(128),
    onbelegdVermogen: Joi.number().min(0),
    rijksregisterNummer: Joi.string().min(11).max(11),
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

/**
 * @api {get} /accounts/:id Get account by ID
 * @apiName GetAccountById
 * @apiGroup Account
 * @apiParam (URL) {Number} id Account's unique ID.
 * @apiSuccess {Object} account The account with the specified ID.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "id": 1,
 *     "email": "example@example.com",
 *     "voornaam": "John",
 *     "achternaam": "Doe"
 *   }
 * @apiError (Error 404) {Object} NOT_FOUND No account with this ID exists.
 * @apiError (Error 500) {Object} INTERNAL_SERVER_ERROR Internal server error.
 */
const getAccountById = async (
  ctx: KoaContext<GetAccountByIdResponse, GetAccountRequest>,
) => {
  const account = await accountService.getById(
    ctx.params.id === 'me' ? ctx.state.session.accountId : ctx.params.id,
  );
  ctx.status = 200;
  ctx.body = account;
};
getAccountById.validationScheme = {
  params: {
    id: Joi.alternatives().try(
      Joi.number().integer().positive(),
      Joi.string().valid('me'),
    ),
  },
};

/**
 * @api {put} /accounts/:id Update account by ID
 * @apiName UpdateAccount
 * @apiGroup Account
 * @apiParam (URL) {Number} id Account's unique ID.
 * @apiParam (Body) {String} email Email of the account.
 * @apiParam (Body) {Number} rijksregisterNummer National register number of the account.
 * @apiParam (Body) {String} voornaam First name of the account.
 * @apiParam (Body) {String} achternaam Last name of the account.
 * @apiParam (Body) {Object} adres Address of the account.
 * @apiSuccess {Object} account The updated account.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "id": 1,
 *     "email": "example@example.com",
 *     "voornaam": "John",
 *     "achternaam": "Doe"
 *   }
 * @apiError (Error 400) {Object} VALIDATION_FAILED Validation failed.
 * @apiError (Error 404) {Object} NOT_FOUND No account with this ID exists.
 * @apiError (Error 500) {Object} INTERNAL_SERVER_ERROR Internal server error.
 */
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
  body: {
    email: Joi.string().email(),
    rijksregisterNummer: Joi.string().min(11).max(11),
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

/**
 * @api {get} /accounts/:id/aandelen Get aandelen by account ID
 * @apiName GetAandelenByAccountId
 * @apiGroup Account
 * @apiParam (URL) {Number} id Account's unique ID.
 * @apiSuccess {Object[]} items List of account aandelen.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "items": [
 *       {
 *         "id": 1,
 *         "aantal": 10,
 *         "aankoopPrijs": 100.0,
 *         "reden": "Investment",
 *         "geschatteDuur": "Long-term"
 *       }
 *     ]
 *   }
 * @apiError (Error 404) {Object} NOT_FOUND No account with this ID exists.
 * @apiError (Error 500) {Object} INTERNAL_SERVER_ERROR Internal server error.
 */
const getAandelenByAccountId = async (ctx: KoaContext<GetAllAccountAandelenResponse, GetAccountAandelenRequest>) => {
  const accountAandelen = await accountService.getAandelenByAccountId(
    ctx.params.id === 'me' ? ctx.state.session.accountId : ctx.params.id,
  );
  ctx.body = {
    items: accountAandelen,
  };
};
getAandelenByAccountId.validationScheme = {
  params: {
    id: Joi.alternatives().try(
      Joi.number().integer().positive(),
      Joi.string().valid('me'),
    ),
  },
};

/**
 * @api {put} /accounts/:id/aandelen/:aandeelId Update account aandeel by ID
 * @apiName UpdateAccountAandeel
 * @apiGroup Account
 * @apiParam (URL) {Number} id Account's unique ID.
 * @apiParam (URL) {Number} aandeelId Aandeel's unique ID.
 * @apiParam (Body) {Number} aantal Number of aandelen.
 * @apiParam (Body) {Number} aankoopPrijs Purchase price of the aandeel.
 * @apiParam (Body) {String} reden Reason for the purchase.
 * @apiParam (Body) {String} geschatteDuur Estimated duration of the investment.
 * @apiSuccess {Object} accountAandeel The updated account aandeel.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "id": 1,
 *     "aantal": 10,
 *     "aankoopPrijs": 100.0,
 *     "reden": "Investment",
 *     "geschatteDuur": "Long-term"
 *   }
 * @apiError (Error 400) {Object} VALIDATION_FAILED Validation failed.
 * @apiError (Error 404) {Object} NOT_FOUND No account aandeel with this ID exists.
 * @apiError (Error 500) {Object} INTERNAL_SERVER_ERROR Internal server error.
 */
const updateAccountAandeel = async (ctx: KoaContext<UpdateAccountAandeelResponse, 
  IdParams, UpdateAccountAandeelRequest>) => {
  const accountAandeel = await accountService.updateAccountAandeel(
    ctx.params.id === 'me' ? ctx.state.session.accountId : ctx.params.id, 
    ctx.params.aandeelId,
    ctx.request.body);
  ctx.status = 201;
  ctx.body = accountAandeel;
};
updateAccountAandeel.validationScheme = {
  params: {
    id: Joi.alternatives().try(
      Joi.number().integer().positive(),
      Joi.string().valid('me'),
    ),
    aandeelId: Joi.number().integer().positive(),
  },
  body: {
    aantal: Joi.number().integer().positive(),
    aankoopPrijs: Joi.number().positive(),
    reden: Joi.string(),
    geschatteDuur: Joi.string(),
  },
};

/**
 * @api {post} /accounts/:id/aandelen Create a new account aandeel
 * @apiName CreateAccountAandeel
 * @apiGroup Account
 * @apiParam (Body) {Number} aandeelId Aandeel's unique ID.
 * @apiParam (Body) {Number} aantal Number of aandelen.
 * @apiParam (Body) {Number} aankoopPrijs Purchase price of the aandeel.
 * @apiParam (Body) {String} reden Reason for the purchase.
 * @apiParam (Body) {String} geschatteDuur Estimated duration of the investment.
 * @apiSuccess {Object} newAccountAandeel The newly created account aandeel.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 201 Created
 *   {
 *     "id": 1,
 *     "aantal": 10,
 *     "aankoopPrijs": 100.0,
 *     "reden": "Investment",
 *     "geschatteDuur": "Long-term"
 *   }
 * @apiError (Error 400) {Object} VALIDATION_FAILED Validation failed.
 * @apiError (Error 500) {Object} INTERNAL_SERVER_ERROR Internal server error.
 */
const createAccountAandeel = async (ctx: KoaContext<CreateAccountAandeelResponse, 
  void, CreateAccountAandeelRequest>) => {
  console.log(ctx.state.session);
  const newAccountAandeel = await accountService.createAccountAandeel(
    ctx.request.body,
    ctx.state.session.accountId,
  );
  ctx.status = 201;
  ctx.body = newAccountAandeel;
};
createAccountAandeel.validationScheme = {
  params: {
    id: Joi.alternatives().try(
      Joi.number().integer().positive(),
      Joi.string().valid('me'),
    ),
  },
  body: {
    aandeelId: Joi.number().integer().positive(),
    aantal: Joi.number().integer().positive(),
    aankoopPrijs: Joi.number().positive(),
    reden: Joi.string(),
    geschatteDuur: Joi.string(),
  },
};

/**
 * @api {get} /accounts/:id/aandelen/:aandeelId Get account aandeel by ID
 * @apiName GetAccountAandeelById
 * @apiGroup Account
 * @apiParam (URL) {Number} id Account's unique ID.
 * @apiParam (URL) {Number} aandeelId Aandeel's unique ID.
 * @apiSuccess {Object} accountAandeel The account aandeel with the specified ID.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "id": 1,
 *     "aantal": 10,
 *     "aankoopPrijs": 100.0,
 *     "reden": "Investment",
 *     "geschatteDuur": "Long-term"
 *   }
 * @apiError (Error 404) {Object} NOT_FOUND No account aandeel with this ID exists.
 * @apiError (Error 500) {Object} INTERNAL_SERVER_ERROR Internal server error.
 */
const getAccountAandeelById = async (ctx: KoaContext<getAccountAandeelByIdResponse, IdParams>) => {
  const accountAandeel = await accountService.getAccountAandeelById(
    ctx.state.session.accountId,
    ctx.params.aandeelId);
  ctx.status = 200;
  ctx.body = accountAandeel; 
};
getAccountAandeelById.validationScheme = {
  params: {
    id: Joi.alternatives().try(
      Joi.number().integer().positive(),
      Joi.string().valid('me'),
    ),
    aandeelId: Joi.number().integer().positive(),
  },
};

/**
 * @api {delete} /accounts/:id/aandelen/:aandeelId Delete account aandeel by ID
 * @apiName DeleteAccountAandeel
 * @apiGroup Account
 * @apiParam (URL) {Number} id Account's unique ID.
 * @apiParam (URL) {Number} aandeelId Aandeel's unique ID.
 * @apiSuccess (204) No Content.
 * @apiError (Error 404) {Object} NOT_FOUND No account aandeel with this ID exists.
 * @apiError (Error 500) {Object} INTERNAL_SERVER_ERROR Internal server error.
 */
const deleteAccountAandeel = async (ctx: KoaContext<void, IdParams>) => {
  await accountService.deleteAccountAandeel(
    ctx.params.id === 'me' ? ctx.state.session.accountId : ctx.params.id, 
    ctx.params.aandeelId);
  ctx.status = 204;
};
deleteAccountAandeel.validationScheme = {
  params: {
    id: Joi.alternatives().try(
      Joi.number().integer().positive(),
      Joi.string().valid('me'),
    ),
    aandeelId: Joi.number().integer().positive(),
  },
};

export default (parent: KoaRouter) => {
  const router = new Router<portfolioAppState, portfolioAppContext>({
    prefix: '/accounts',
  });

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
    validate(getAandelenByAccountId.validationScheme), 
    getAandelenByAccountId,
  );
  router.put(
    '/:id/aandelen/:aandeelId',
    requireAuthentication,
    checkAccountId,
    validate(updateAccountAandeel.validationScheme),
    updateAccountAandeel,
  );
  router.get(
    '/:id/aandelen/:aandeelId',
    requireAuthentication,
    checkAccountId,
    validate(getAccountAandeelById.validationScheme),
    getAccountAandeelById,
  );
  router.post(
    '/:id/aandelen',
    requireAuthentication,
    validate(createAccountAandeel.validationScheme),
    createAccountAandeel,
  );
  router.delete(
    '/:id/aandelen/:aandeelId',
    requireAuthentication,
    checkAccountId,
    validate(deleteAccountAandeel.validationScheme),
    deleteAccountAandeel,
  );

  parent.use(router.routes()).use(router.allowedMethods());
};
