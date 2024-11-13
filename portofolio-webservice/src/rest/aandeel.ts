import Router from '@koa/router';
import * as aandeelService from '../service/aandeel';
import type { Context } from 'koa';

const getAllAandelen = async (ctx: Context) => {
  ctx.body = {
    items: aandeelService.getAll(),
  };
};

const createAandeel = async (ctx: Context) => {
  const newAandeel = aandeelService.create({
    ...ctx.request.body,
  });
  ctx.body = newAandeel;
};

const getAandeelById = async (ctx: Context) => {
  ctx.body = aandeelService.getById(Number(ctx.params.id));
};

const updateAandeel = async (ctx: Context) => {
  ctx.body = aandeelService.updateById(Number(ctx.params.id), {
    ...ctx.request.body,
  });
};

const deleteAandeel = async (ctx: Context) => {
  aandeelService.deleteById(Number(ctx.params.id));
  ctx.status = 204;
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
