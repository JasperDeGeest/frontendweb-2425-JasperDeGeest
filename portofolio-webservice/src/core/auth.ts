// src/core/auth.ts
import type { Next } from 'koa'; // 👈 1
import type { KoaContext } from '../types/koa'; // 👈 1
import * as accountService from '../service/account'; // 👈 1

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
