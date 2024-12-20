import { prisma } from '../data';
import type { Account, AccountUpdateInput, PublicAccount, RegisterAccountRequest } from '../types/account';
import type { AccountAandeel, AccountAandeelCreateInput, AccountAandeelUpdateInput } from '../types/accountAandeel';
import { hashPassword, verifyPassword } from '../core/password';
import Role from '../core/roles';
import ServiceError from '../core/serviceError';
import handleDBError  from './_handleDBError';
import jwt from 'jsonwebtoken';
import { getLogger } from '../core/logging';
import { generateJWT, verifyJWT } from '../core/jwt';
import type { SessionInfo } from '../types/auth';

export const login = async (
  email: string,
  password: string,
): Promise<string> => {
  const account = await prisma.account.findUnique(
    { 
      where: { email },
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

  if (!account) {
    throw ServiceError.unauthorized(
      'The given email and password do not match',
    );
  }

  const passwordValid = await verifyPassword(password, account.hashedPassword);

  if (!passwordValid) {
    throw ServiceError.unauthorized(
      'The given email and password do not match',
    );
  }

  return await generateJWT(account);
};

export const checkAndParseSession = async (
  authHeader?: string,
): Promise<SessionInfo> => {
  if (!authHeader) {
    throw ServiceError.unauthorized('You need to be signed in');
  }

  if (!authHeader.startsWith('Bearer ')) {
    throw ServiceError.unauthorized('Invalid authentication token');
  }

  const authToken = authHeader.substring(7);

  try {
    const { roles, sub } = await verifyJWT(authToken);
    return {
      accountId: Number(sub),
      roles,
    };
  } catch (error: any) {
    getLogger().error(error.message, { error });

    if (error instanceof jwt.TokenExpiredError) {
      throw ServiceError.unauthorized('The token has expired');
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw ServiceError.unauthorized(
        `Invalid authentication token: ${error.message}`,
      );
    } else {
      throw ServiceError.unauthorized(error.message);
    }
  }
};

export const checkRole = (role: string, roles: string[]): void => {
  const hasPermission = roles.includes(role);

  if (!hasPermission) {
    throw ServiceError.forbidden(
      'You are not allowed to view this part of the application',
    );
  }
};

const makeExposedAccount = ({ id, email, voornaam, achternaam }: Account): PublicAccount => ({
  id,
  email,
  voornaam,
  achternaam,
});

export const getAll = async (): Promise<PublicAccount[]> => {
  const accounts = await prisma.account.findMany({
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
  return accounts.map(makeExposedAccount);
};

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

  if (!account) {
    throw ServiceError.notFound('No account with this id exists');
  }

  return {
    ...account,
    rijksregisterNummer: account.rijksregisterNummer.toString(),
  };
};

export const register = async ({
  email,
  Password,
  onbelegdVermogen,
  rijksregisterNummer,
  voornaam,
  achternaam,
  adres,
}: RegisterAccountRequest): Promise<string> => {
  try {
    console.log(Password);
    const passwordHash = await hashPassword(Password);
    const newAdres = await prisma.adres.create({
      data : adres,
    });
    const account = await prisma.account.create({
      data: {
        email,
        hashedPassword: passwordHash,
        onbelegdVermogen,
        rijksregisterNummer,
        voornaam,
        achternaam,
        adres: {
          connect: { id: newAdres.id },
        },
        roles: JSON.stringify([Role.USER]),
      },
      include: {
        adres: true,
      },
    });
    return await generateJWT(account);
  } catch (error) {
    throw handleDBError(error);
  }
};

export const updateById = async (id: number, changes: AccountUpdateInput): Promise<PublicAccount> => {
  try {
    const account = await prisma.account.update({
      where: { id },
      data: {
        email: changes.email,
        rijksregisterNummer: changes.rijksregisterNummer,
        voornaam: changes.voornaam,
        achternaam: changes.achternaam,
        ...(changes.adres && { adres: { update: changes.adres } }),
      },
      include: {
        adres: true,
      },
    });
    return makeExposedAccount(account);
  } catch (error) {
    throw handleDBError(error);
  }
};

export const getAandelenByAccountId = async (accountId: number): Promise<AccountAandeel[]> => {
  const accountAandelen = await prisma.accountAandeel.findMany({
    where: { accountId: Number(accountId) },
    include: {
      aandeel: true,
    },
  });

  if(accountAandelen.length < 1) {
    throw ServiceError.notFound('this account has no aandelen.');
  }
  return accountAandelen;
};

export const updateAccountAandeel = async (accountId: number, aandeelId: number, changes: AccountAandeelUpdateInput): 
Promise<AccountAandeel> => {
  try {
    const accountAandeel = await prisma.accountAandeel.update({
      where: { accountId_aandeelId: { accountId, aandeelId } },
      data: {
        aantal: changes.aantal,
        aankoopPrijs: changes.aankoopPrijs,
        reden: changes.reden,
        geschatteDuur: changes.geschatteDuur,
      },
      include: {
        aandeel: true,
      },
    });
    return accountAandeel;
  } catch (error) {
    throw handleDBError(error);
  }
};

export const createAccountAandeel = async (accountAandeel: AccountAandeelCreateInput, accountId: number):
Promise<AccountAandeel> => {
  try {
    const newAccountAandeel = await prisma.accountAandeel.create({
      data: {
        aantal: accountAandeel.aantal,
        aankoopPrijs: accountAandeel.aankoopPrijs,
        reden: accountAandeel.reden,
        geschatteDuur: accountAandeel.geschatteDuur,
        account: {
          connect: { id: accountId },
        },
        aandeel: {
          connect: { id: accountAandeel.aandeelId },
        },
      },
      include: {
        aandeel: true,
      },
    });
    return newAccountAandeel;
  } catch (error) {
    throw handleDBError(error);
  }
};

export const getAccountAandeelById = async (accountId: number, aandeelId: number): Promise<AccountAandeel> => {
  const accountAandeel = await prisma.accountAandeel.findUnique({
    where: { accountId_aandeelId: { accountId, aandeelId: Number(aandeelId) } },
    include: {
      aandeel: true,
    },
  });

  if (!accountAandeel) {
    throw ServiceError.notFound('No account aandeel with this id exists');
  }
  return accountAandeel;
};

export const deleteAccountAandeel = async (accountId: number, aandeelId: number): Promise<void> => {
  try {
    await prisma.accountAandeel.delete({
      where: { accountId_aandeelId: { accountId, aandeelId: Number(aandeelId) } },
    });
  } catch (error) {
    throw handleDBError(error);
  }
};
