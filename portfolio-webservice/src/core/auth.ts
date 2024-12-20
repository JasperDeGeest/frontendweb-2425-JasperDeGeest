import type { Next } from 'koa';
import type { KoaContext } from '../types/koa';
import * as accountService from '../service/account';
import config from 'config';

const AUTH_MAX_DELAY = config.get<number>('auth.maxDelay');
export const requireAuthentication = async (ctx: KoaContext, next: Next) => {
  const { authorization } = ctx.headers;
  
  ctx.state.session = await accountService.checkAndParseSession(authorization);

  return next();
};

export const makeRequireRole =
  (role: string) => async (ctx: KoaContext, next: Next) => {
    const { roles = [] } = ctx.state.session;

    accountService.checkRole(role, roles);

    return next();
  };

export const authDelay = async (_: KoaContext, next: Next) => {

  await new Promise((resolve) => {
    const delay = Math.round(Math.random() * AUTH_MAX_DELAY);
    setTimeout(resolve, delay);
  });

  return next();
};
