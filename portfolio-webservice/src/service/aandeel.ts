import type { Aandeel, AandeelCreateInput, AandeelUpdateInput } from '../types/aandeel';
import { prisma } from '../data';
import ServiceError from '../core/serviceError';
import handleDBError from './_handleDBError';

export const getAll = async (): Promise<Aandeel[]> => {
  return prisma.aandeel.findMany();
};

export const getById = async (id: number): Promise<Aandeel> => {
  const aandeel = await prisma.aandeel.findUnique({
    where: {
      id,
    },
  });

  if (!aandeel) {
    throw ServiceError.notFound('No aandeel with this id exists');
  }

  return aandeel;
};

export const create = async (aandeel: AandeelCreateInput): Promise<Aandeel> => {
  try {
    return prisma.aandeel.create({
      data: aandeel,
    });
  } catch (error: any) {
    throw handleDBError(error);
  }
};

export const updateById = async (id: number, changes: AandeelUpdateInput): Promise<Aandeel> => {
  return prisma.aandeel.update({
    where: {
      id,
    },
    data: changes,
  });
};

export const deleteById = async (id: number): Promise<void> => {
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
