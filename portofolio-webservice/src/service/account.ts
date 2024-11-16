import { prisma } from '../data';

export const getById = async (id: number) => {
  const account = await prisma.account.findUnique({
    where: {
      id,
    },
    include: {
      adres: {
        select: {
          id: false,
          straat: true,
          huisNummer: true,
          stad: true,
          land: true,
        },
      },
    },
  });

  if(!account) {
    throw new Error('No account with this id exist');
  }

  return account;
};

export const updateById = async (id: number, 
  { email, hashedPassword, onbelegdVermogen, rijksregisterNummer, 
    voornaam, achternaam, adresId, 
    straat, huisNummer, stad, land}: any) => {
  const updatedAdres = await prisma.adres.upsert({
    where: { id: adresId },
    update: {
      straat,
      huisNummer,
      stad,
      land,
    },
    create: {
      id: adresId,
      straat,
      huisNummer,
      stad,
      land,
    },
  });
  
  const updatedAccount = await prisma.account.update({
    where: { id },
    data: {
      email,
      hashedPassword,
      onbelegdVermogen,
      rijksregisterNummer,
      voornaam,
      achternaam,
      adresId,
    },
  });
  
  return { ...updatedAccount, adres: updatedAdres };
};

export const create = async (
  { email, hashedPassword, onbelegdVermogen, rijksregisterNummer, voornaam, achternaam, 
    straat, huisNummer, stad, land}: any) => {
  const newAdres = await prisma.adres.create({
    data: {
      straat,
      huisNummer,
      stad,
      land,
    },
  });
  
  const newAccount = await prisma.account.create({
    data: {
      email,
      hashedPassword,
      onbelegdVermogen,
      rijksregisterNummer,
      voornaam,
      achternaam,
      adresId: newAdres.id,
    },
  });

  return { ...newAccount, adres: newAdres };
};

export const getAandelenByAccountId = async (accountId: number) => {
  const accountAandelen = await prisma.accountAandeel.findMany({
    where: { accountId },
  });

  if(accountAandelen.length < 1) {
    throw new Error('this account has no aandelen.');
  }
  return accountAandelen;
};
