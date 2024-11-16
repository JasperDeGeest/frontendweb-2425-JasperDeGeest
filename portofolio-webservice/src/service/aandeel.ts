import { prisma } from '../data';

export const getAll = async () => {
  return prisma.aandeel.findMany();
};

export const getById = async (id: number) => {
  const aandeel = await prisma.aandeel.findUnique({
    where: {
      id,
    },
  });

  if (!aandeel) {
    throw new Error('No aandeel with this id exists');
  }

  return aandeel;
};

export const create = async ({ isin, afkorting, uitgever, kosten, type, rating, sustainability}: any) => {
  return prisma.aandeel.create({
    data: {
      isin,
      afkorting,
      uitgever,
      kosten,
      type,
      rating,
      sustainability,
    },
  });
};

export const updateById = async (id: number, 
  { isin, afkorting, uitgever, kosten, type, rating, sustainability}: any) => {
  return prisma.aandeel.update({
    where: {
      id,
    },
    data: {
      isin,
      afkorting,
      uitgever,
      kosten,
      type,
      rating,
      sustainability,
    },
  });
};

export const deleteById = async (id: number) => {
  const relatedAccountAandelen = await prisma.accountAandeel.findMany({
    where: { aandeelId: id },
  });

  if(relatedAccountAandelen.length > 0) {
    throw new Error('cannot delete this aandeel because people own it.');
  }
  
  await prisma.aandeel.delete({
    where: {
      id,
    },
  });
};
