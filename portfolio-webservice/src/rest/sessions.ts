// src/rest/session.ts
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
import { authDelay } from '../core/auth'; // 👈

// 👇 1
const login = async (ctx: KoaContext<LoginResponse, void, LoginRequest>) => {
  const { email, password } = ctx.request.body;
  const token = await accountService.login(email, password); // 👈 3

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
