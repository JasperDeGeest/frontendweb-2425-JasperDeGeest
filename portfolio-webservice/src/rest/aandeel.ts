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

const getAllAandelen = async (ctx: KoaContext<GetAllAandelenResponse>) => {
  const aandelen = await aandeelService.getAll();
  ctx.body = {
    items: aandelen,
  };
};
getAllAandelen.validationScheme = null;

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
    rating: Joi.number().integer().positive().max(5),
    sustainability: Joi.number().integer().positive().max(5),
  },
};

const getAandeelById = async (ctx: KoaContext<GetAandeelByIdResponse, IdParams>) => {
  ctx.body = await aandeelService.getById(Number(ctx.params.id));
};
getAandeelById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

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
    rating: Joi.number().integer().positive().max(5),
    sustainability: Joi.number().integer().positive().max(5),
  },
};

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

  router.get('/', validate(getAllAandelen.validationScheme),getAllAandelen);
  router.post('/', validate(createAandeel.validationScheme), createAandeel);
  router.get('/:id', validate(getAandeelById.validationScheme), getAandeelById);
  router.put('/:id', validate(updateAandeel.validationScheme),updateAandeel);
  router.delete('/:id', validate(deleteAandeel.validationScheme),deleteAandeel);

  parent.use(router.routes()).use(router.allowedMethods());
};
