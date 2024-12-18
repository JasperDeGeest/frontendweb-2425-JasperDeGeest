// src/rest/health.ts
import Router from '@koa/router';
import * as healthService from '../service/health';
import type { Context } from 'koa';
import type { portfolioAppContext, portfolioAppState } from '../types/koa';
import type { KoaRouter } from '../types/koa';
import validate from '../core/validation';

/**
 * @api {get} /health/ping Ping the server
 * @apiName Ping
 * @apiGroup Health
 * @apiSuccess {Boolean} pong Server response.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "pong": true
 *   }
 * @apiError (Error 500) {Object} INTERNAL_SERVER_ERROR Internal server error.
 */
const ping = async (ctx: Context) => {
  ctx.status = 200;
  ctx.body = healthService.ping();
};
ping.validationScheme = null;

/**
 * @api {get} /health/version Get server version
 * @apiName GetVersion
 * @apiGroup Health
 * @apiSuccess {String} env Environment of the server.
 * @apiSuccess {String} version Version of the server.
 * @apiSuccess {String} name Name of the server.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "env": "development",
 *     "version": "1.0.0",
 *     "name": "portfolio-webservice"
 *   }
 * @apiError (Error 500) {Object} INTERNAL_SERVER_ERROR Internal server error.
 */
const getVersion = async (ctx: Context) => {
  ctx.status = 200;
  ctx.body = healthService.getVersion();
};
getVersion.validationScheme = null;

export default (parent: KoaRouter) => {
  const router = new Router<portfolioAppState, portfolioAppContext>({
    prefix: '/health', 
  });

  router.get('/ping', validate(ping.validationScheme), ping);
  router.get('/version', validate(getVersion.validationScheme), getVersion);

  parent.use(router.routes()).use(router.allowedMethods());
};
