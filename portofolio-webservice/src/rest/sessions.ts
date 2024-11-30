// src/rest/session.ts
import Router from '@koa/router';
import Joi from 'joi';
import validate from '../core/validation';
import * as accountService from '../service/account';
import type {
  KoaContext,
  KoaRouter,
  PortofolioAppState,
  PortofolioAppContext,
} from '../types/koa';
import type { LoginResponse, LoginRequest } from '../types/account';
import { authDelay } from '../core/auth'; // 👈

// 👇 1
const login = async (ctx: KoaContext<LoginResponse, void, LoginRequest>) => {
  // 👇 2
  const { email, password } = ctx.request.body;
  const token = await accountService.login(email, password); // 👈 3

  // 👇 4
  ctx.status = 200;
  ctx.body = { token };
};
// 👇 5
login.validationScheme = {
  body: {
    email: Joi.string().email(),
    password: Joi.string(),
  },
};

// 👇 6
export default function installSessionRouter(parent: KoaRouter) {
  const router = new Router<PortofolioAppState, PortofolioAppContext>({
    prefix: '/sessions',
  });

  router.post('/', authDelay, validate(login.validationScheme), login);

  parent.use(router.routes()).use(router.allowedMethods());
}
