import Router from '@koa/router';
import * as aandeelService from '../service/aandeel';
import type { Context } from 'koa';

const getAllAandelen = async (ctx: Context) => {
  const aandelen = await aandeelService.getAll();
  ctx.body = {
    items: aandelen,
  };
};

const createAandeel = async (ctx: Context) => {
  const newAandeel = await aandeelService.create({
    ...ctx.request.body,
  });
  ctx.body = newAandeel;
};

const getAandeelById = async (ctx: Context) => {
  try {
    ctx.body = await aandeelService.getById(Number(ctx.params.id));
  } catch (error : any) {
    ctx.status = 404;
    ctx.body = error.message;
  }
};

const updateAandeel = async (ctx: Context) => {
  ctx.body = await aandeelService.updateById(Number(ctx.params.id), {
    ...ctx.request.body,
  });
};

const deleteAandeel = async (ctx: Context) => {
  try {
    await aandeelService.deleteById(Number(ctx.params.id));
    ctx.status = 204;
  } catch (error: any) {
    ctx.status = 409;
    ctx.body = error.message;
  }
};

export default (parent: Router) => {
  const router = new Router({
    prefix: '/aandelen',
  });

  router.get('/', getAllAandelen);
  router.post('/', createAandeel);
  router.get('/:id', getAandeelById);
  router.put('/:id', updateAandeel);
  router.delete('/:id', deleteAandeel);

  parent.use(router.routes()).use(router.allowedMethods());
};
