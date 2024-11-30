// src/core/auth.ts
import type { Next } from 'koa'; // 👈 1
import type { KoaContext } from '../types/koa'; // 👈 1
import * as accountService from '../service/account'; // 👈 1
import config from 'config'; // 👈 1

const AUTH_MAX_DELAY = config.get<number>('auth.maxDelay'); // 👈 1
// 👇 1
export const requireAuthentication = async (ctx: KoaContext, next: Next) => {
  const { authorization } = ctx.headers; // 👈 3

  //  👇 4
  ctx.state.session = await accountService.checkAndParseSession(authorization);

  return next(); // 👈 5
};

// 👇 6
export const makeRequireRole =
  (role: string) => async (ctx: KoaContext, next: Next) => {
    const { roles = [] } = ctx.state.session; // 👈 7

    accountService.checkRole(role, roles); // 👈 8

    return next(); // 👈 9
  };

export const authDelay = async (_: KoaContext, next: Next) => {
  // 👇 3
  await new Promise((resolve) => {
    const delay = Math.round(Math.random() * AUTH_MAX_DELAY);
    setTimeout(resolve, delay);
  });
  // 👇 4
  return next();
};
