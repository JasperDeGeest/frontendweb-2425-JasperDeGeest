// src/types/koa.ts
import type { ParameterizedContext } from 'koa';
import type Application from 'koa';
import type Router from '@koa/router';

// 👇 1
export interface PortofolioAppState {}

// 👇 2
export interface PortofolioAppContext<
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
  PortofolioAppState,
  PortofolioAppContext<Params, RequestBody, Query>,
  ResponseBody
>;

// 👇 5
export interface KoaApplication
  extends Application<PortofolioAppState, PortofolioAppContext> {}

// 👇 5
export interface KoaRouter extends Router<PortofolioAppState, PortofolioAppContext> {}
