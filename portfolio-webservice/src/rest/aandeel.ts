import * as aandeelService from '../service/aandeel';
import type { portfolioAppContext, portfolioAppState } from '../types/koa';
import type { KoaContext, KoaRouter } from '../types/koa';
import type {
  CreateAandeelRequest,
  CreateAandeelResponse,
  GetAllAandelenResponse,
  GetAandeelByIdResponse,
  UpdateAandeelRequest,
  UpdateAandeelResponse,
} from '../types/aandeel';
import type { IdParams } from '../types/common';
import Router from '@koa/router';
import Joi from 'joi';
import validate from '../core/validation';
import { requireAuthentication, makeRequireRole } from '../core/auth';
import Role from '../core/roles';

/**
 * @api {get} /aandelen Get all aandelen
 * @apiName GetAllAandelen
 * @apiGroup Aandeel
 * @apiSuccess {Object[]} items List of aandelen.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "items": [
 *       {
 *         "id": 1,
 *         "isin": "IE00B5BMR087",
 *         "afkorting": "CSPX",
 *         "uitgever": "iShares",
 *         "kosten": 0.20,
 *         "type": "Accumulatie",
 *         "rating": 5,
 *         "sustainability": 2
 *       }
 *     ]
 *   }
 * @apiError (Error 500) {Object} INTERNAL_SERVER_ERROR Internal server error.
 */
const getAllAandelen = async (ctx: KoaContext<GetAllAandelenResponse>) => {
  const aandelen = await aandeelService.getAll();
  ctx.body = {
    items: aandelen,
  };
};
getAllAandelen.validationScheme = null;

/**
 * @api {post} /aandelen Create a new aandeel
 * @apiName CreateAandeel
 * @apiGroup Aandeel
 * @apiParam (Body) {String} isin ISIN of the aandeel.
 * @apiParam (Body) {String} afkorting Abbreviation of the aandeel.
 * @apiParam (Body) {String} uitgever Issuer of the aandeel.
 * @apiParam (Body) {Number} kosten Costs of the aandeel.
 * @apiParam (Body) {String} type Type of the aandeel.
 * @apiParam (Body) {Number} rating Rating of the aandeel.
 * @apiParam (Body) {Number} sustainability Sustainability of the aandeel.
 * @apiSuccess {Object} newAandeel The newly created aandeel.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 201 Created
 *   {
 *     "id": 1,
 *     "isin": "IE00B5BMR087",
 *     "afkorting": "CSPX",
 *     "uitgever": "iShares",
 *     "kosten": 0.20,
 *     "type": "Accumulatie",
 *     "rating": 5,
 *     "sustainability": 2
 *   }
 * @apiError (Error 400) {Object} VALIDATION_FAILED Validation failed.
 * @apiError (Error 500) {Object} INTERNAL_SERVER_ERROR Internal server error.
 */
const createAandeel = async (ctx: KoaContext<CreateAandeelResponse, void, CreateAandeelRequest>) => {
  const newAandeel = await aandeelService.create({
    ...ctx.request.body,
  });
  ctx.status = 201;
  ctx.body = newAandeel;
};
createAandeel.validationScheme = {
  body: {
    isin: Joi.string().length(12),
    afkorting: Joi.string().length(4),
    uitgever: Joi.string(),
    kosten: Joi.number().max(1).positive(),
    type: Joi.string(),
    rating: Joi.number().integer().min(0).max(5),
    sustainability: Joi.number().integer().min(0).max(5),
  },
};

/**
 * @api {get} /aandelen/:id Get aandeel by ID
 * @apiName GetAandeelById
 * @apiGroup Aandeel
 * @apiParam (URL) {Number} id Aandeel's unique ID.
 * @apiSuccess {Object} aandeel The aandeel with the specified ID.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "id": 1,
 *     "isin": "IE00B5BMR087",
 *     "afkorting": "CSPX",
 *     "uitgever": "iShares",
 *     "kosten": 0.20,
 *     "type": "Accumulatie",
 *     "rating": 5,
 *     "sustainability": 2
 *   }
 * @apiError (Error 404) {Object} NOT_FOUND No aandeel with this ID exists.
 * @apiError (Error 500) {Object} INTERNAL_SERVER_ERROR Internal server error.
 */
const getAandeelById = async (ctx: KoaContext<GetAandeelByIdResponse, IdParams>) => {
  ctx.body = await aandeelService.getById(Number(ctx.params.id));
};
getAandeelById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

/**
 * @api {put} /aandelen/:id Update aandeel by ID
 * @apiName UpdateAandeel
 * @apiGroup Aandeel
 * @apiParam (URL) {Number} id Aandeel's unique ID.
 * @apiParam (Body) {String} isin ISIN of the aandeel.
 * @apiParam (Body) {String} afkorting Abbreviation of the aandeel.
 * @apiParam (Body) {String} uitgever Issuer of the aandeel.
 * @apiParam (Body) {Number} kosten Costs of the aandeel.
 * @apiParam (Body) {String} type Type of the aandeel.
 * @apiParam (Body) {Number} rating Rating of the aandeel.
 * @apiParam (Body) {Number} sustainability Sustainability of the aandeel.
 * @apiSuccess {Object} aandeel The updated aandeel.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "id": 1,
 *     "isin": "IE00B5BMR087",
 *     "afkorting": "CSPX",
 *     "uitgever": "iShares",
 *     "kosten": 0.20,
 *     "type": "Accumulatie",
 *     "rating": 5,
 *     "sustainability": 2
 *   }
 * @apiError (Error 400) {Object} VALIDATION_FAILED Validation failed.
 * @apiError (Error 404) {Object} NOT_FOUND No aandeel with this ID exists.
 * @apiError (Error 500) {Object} INTERNAL_SERVER_ERROR Internal server error.
 */
const updateAandeel = async (ctx: KoaContext<UpdateAandeelResponse, IdParams, UpdateAandeelRequest>) => {
  ctx.body = await aandeelService.updateById(Number(ctx.params.id), {
    ...ctx.request.body,
  });
};
updateAandeel.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
  body: {
    isin: Joi.string().length(12),
    afkorting: Joi.string().length(4),
    uitgever: Joi.string(),
    kosten: Joi.number().max(1).positive(),
    type: Joi.string(),
    rating: Joi.number().integer().min(0).max(5),
    sustainability: Joi.number().integer().min(0).max(5),
  },
};

/**
 * @api {delete} /aandelen/:id Delete aandeel by ID
 * @apiName DeleteAandeel
 * @apiGroup Aandeel
 * @apiParam (URL) {Number} id Aandeel's unique ID.
 * @apiSuccess (204) No Content.
 * @apiError (Error 404) {Object} NOT_FOUND No aandeel with this ID exists.
 * @apiError (Error 500) {Object} INTERNAL_SERVER_ERROR Internal server error.
 */
const deleteAandeel = async (ctx: KoaContext<void, IdParams>) => {
  await aandeelService.deleteById(Number(ctx.params.id));
  ctx.status = 204;
};
deleteAandeel.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

export default (parent: KoaRouter) => {
  const router = new Router<portfolioAppState, portfolioAppContext>({
    prefix: '/aandelen',
  });

  const requireAdmin = makeRequireRole(Role.ADMIN);
  router.get(
    '/',
    requireAuthentication,
    validate(getAllAandelen.validationScheme),
    getAllAandelen,
  );
  router.post(
    '/', 
    requireAuthentication,
    requireAdmin,
    validate(createAandeel.validationScheme), 
    createAandeel,
  );
  router.get(
    '/:id', 
    requireAuthentication,
    requireAdmin,
    validate(getAandeelById.validationScheme), 
    getAandeelById,
  );
  router.put(
    '/:id',
    requireAuthentication,
    requireAdmin, 
    validate(updateAandeel.validationScheme),
    updateAandeel,
  );
  router.delete(
    '/:id', 
    requireAuthentication,
    requireAdmin,
    validate(deleteAandeel.validationScheme),
    deleteAandeel,
  );

  parent.use(router.routes()).use(router.allowedMethods());
};
