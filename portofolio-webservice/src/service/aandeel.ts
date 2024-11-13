// src/service/aandeel.ts
import { AANDELEN } from '../data/mock_data';

export const getAll = () => {
  return AANDELEN;
};

export const getById = (id: number) => {
  return AANDELEN.find((a) => a.id === id);
};

export const create = ({ isin, afkorting, uitgever, kosten, type, rating, sustainability}: any) => {
  const maxId = Math.max(...AANDELEN.map((i) => i.id));
  const newAandeel = {
    id: maxId +1,
    isin,
    afkorting,
    uitgever,
    kosten,
    type,
    rating,
    sustainability,
  };
  AANDELEN.push(newAandeel); // 👈 4
  return newAandeel; // 👈 5
};

export const updateById = (id: number, { isin, afkorting, uitgever, kosten, type, rating, sustainability}: any) => {
  const index = AANDELEN.findIndex((a) => a.id === id);

  const updatedAandeel = {
    ...AANDELEN[index],
    id,
    isin,
    afkorting,
    uitgever,
    kosten,
    type,
    rating,
    sustainability,
  };
  AANDELEN[index] = updatedAandeel;
  return updatedAandeel;
};

export const deleteById = (id: number) => {
  const index = AANDELEN.findIndex((t) => t.id === id);
  AANDELEN.splice(index, 1);
};
