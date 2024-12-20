import Router from '@koa/router';
import Joi from 'joi';
import validate from '../core/validation';
import * as accountService from '../service/account';
import type {
  KoaContext,
  KoaRouter,
  portfolioAppState,
  portfolioAppContext,
} from '../types/koa';
import type { LoginResponse, LoginRequest } from '../types/account';
import { authDelay } from '../core/auth';

/**
 * @api {post} /sessions Login
 * @apiName Login
 * @apiGroup Session
 * @apiParam (Body) {String} email Email of the account.
 * @apiParam (Body) {String} password Password of the account.
 * @apiSuccess {String} token Authentication token.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "token": "jwt-token"
 *   }
 * @apiError (Error 400) {Object} VALIDATION_FAILED Validation failed.
 * @apiError (Error 401) {Object} UNAUTHORIZED Invalid email or password.
 * @apiError (Error 500) {Object} INTERNAL_SERVER_ERROR Internal server error.
 */
const login = async (ctx: KoaContext<LoginResponse, void, LoginRequest>) => {
  const { email, password } = ctx.request.body;
  const token = await accountService.login(email, password);
  ctx.status = 200;
  ctx.body = { token };
};
login.validationScheme = {
  body: {
    email: Joi.string().email(),
    password: Joi.string(),
  },
};

export default function installSessionRouter(parent: KoaRouter) {
  const router = new Router<portfolioAppState, portfolioAppContext>({
    prefix: '/sessions',
  });

  router.post('/', authDelay, validate(login.validationScheme), login);

  parent.use(router.routes()).use(router.allowedMethods());
}
