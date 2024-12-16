// src/types/koa.ts
import type { ParameterizedContext } from 'koa';
import type Application from 'koa';
import type Router from '@koa/router';
import type { SessionInfo } from './auth';

// 👇 1
export interface portfolioAppState {
  session: SessionInfo;
}

// 👇 2
export interface portfolioAppContext<
  Params = unknown,
  RequestBody = unknown,
  Query = unknown,
> {
  request: {
    body: RequestBody;
    query: Query;
  };
  params: Params;
}

// 👇 3
export type KoaContext<
  ResponseBody = unknown,
  Params = unknown,
  RequestBody = unknown,
  Query = unknown,
> = ParameterizedContext<
  // 👇 4
  portfolioAppState,
  portfolioAppContext<Params, RequestBody, Query>,
  ResponseBody
>;

// 👇 5
export interface KoaApplication
  extends Application<portfolioAppState, portfolioAppContext> {}

// 👇 5
export interface KoaRouter extends Router<portfolioAppState, portfolioAppContext> {}
