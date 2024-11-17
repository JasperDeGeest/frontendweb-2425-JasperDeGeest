import * as aandeelService from '../service/aandeel';
import type { PortofolioAppContext, PortofolioAppState } from '../types/koa';
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

const getAllAandelen = async (ctx: KoaContext<GetAllAandelenResponse>) => {
  const aandelen = await aandeelService.getAll();
  ctx.body = {
    items: aandelen,
  };
};

const createAandeel = async (ctx: KoaContext<CreateAandeelResponse, void, CreateAandeelRequest>) => {
  const newAandeel = await aandeelService.create({
    ...ctx.request.body,
  });
  ctx.body = newAandeel;
};

const getAandeelById = async (ctx: KoaContext<GetAandeelByIdResponse, IdParams>) => {
  try {
    ctx.body = await aandeelService.getById(Number(ctx.params.id));
  } catch (error : any) {
    ctx.status = 404;
    ctx.body = error.message;
  }
};

const updateAandeel = async (ctx: KoaContext<UpdateAandeelResponse, IdParams, UpdateAandeelRequest>) => {
  ctx.body = await aandeelService.updateById(Number(ctx.params.id), {
    ...ctx.request.body,
  });
};

const deleteAandeel = async (ctx: KoaContext<void, IdParams>) => {
  try {
    await aandeelService.deleteById(Number(ctx.params.id));
    ctx.status = 204;
  } catch (error: any) {
    ctx.status = 409;
    ctx.body = error.message;
  }
};

export default (parent: KoaRouter) => {
  const router = new Router<PortofolioAppState, PortofolioAppContext>({
    prefix: '/aandelen',
  });

  router.get('/', getAllAandelen);
  router.post('/', createAandeel);
  router.get('/:id', getAandeelById);
  router.put('/:id', updateAandeel);
  router.delete('/:id', deleteAandeel);

  parent.use(router.routes()).use(router.allowedMethods());
};
