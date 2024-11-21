import type { Account, AccountCreateInput, AccountUpdateInput } from '../types/account';
import { prisma } from '../data';
import type { AccountAandeel } from '../types/accountAandeel';

export const getById = async (id: number): Promise<Account> => {
  const account = await prisma.account.findUnique({
    where: {
      id,
    },
    include: {
      adres: {
        select: {
          id: true,
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

export const updateById = async (id: number, changes: AccountUpdateInput): Promise<Account> => {
  const updatedAdres = await prisma.adres.update({
    where: {
      id : changes.adres.id,
    },
    data: changes.adres,
  });
  
  const updatedAccount = await prisma.account.update({
    where: { 
      id,
    },
    data: {
      email: changes.email,
      hashedPassword: changes.hashedPassword,
      onbelegdVermogen: changes.onbelegdVermogen,
      rijksregisterNummer: changes.rijksregisterNummer,
      voornaam: changes.voornaam,
      achternaam: changes.achternaam,
    },
  });
  
  return { ...updatedAccount, adres: updatedAdres };
};

export const create = async (account: AccountCreateInput): Promise<Account> => {
  // Create the adres first
  const newAdres = await prisma.adres.create({
    data : account.adres,
  });

  // Now create the account and associate the new adres
  const newAccount = await prisma.account.create({
    data: {
      id: account.id,
      email: account.email,
      hashedPassword: account.hashedPassword,
      onbelegdVermogen: account.onbelegdVermogen,
      rijksregisterNummer: account.rijksregisterNummer,
      voornaam: account.voornaam,
      achternaam: account.achternaam,
      adresId: newAdres.id, // Link the new adres to the account
    },

  });

  // Return the created account, including the newly created adres
  return { ...newAccount, adres: newAdres };
};

export const getAandelenByAccountId = async (accountId: number): Promise<AccountAandeel[]> => {
  const accountAandelen = await prisma.accountAandeel.findMany({
    where: { accountId },
  });

  if(accountAandelen.length < 1) {
    throw new Error('this account has no aandelen.');
  }
  return accountAandelen;
};
