import type { Entity } from './common';
import type { Adres } from './adres';
import type { Prisma } from '@prisma/client';

export interface Account extends Entity {
  email: string;
  hashedPassword: string;
  onbelegdVermogen: number;
  rijksregisterNummer: number;
  voornaam: string;
  achternaam: string;
  adres: Adres;
  roles: Prisma.JsonValue;
}

export interface AccountCreateInput {
  email: string;
  Password: string;
  onbelegdVermogen: number;
  rijksregisterNummer: number;
  voornaam: string;
  achternaam: string;
  adres: Adres;
}

export interface PublicAccount extends Pick<Account, 'id' | 'email' | 'voornaam' | 'achternaam'> {}

export interface AccountUpdateInput extends 
  Pick<AccountCreateInput, 
  'email' | 'onbelegdVermogen' | 'rijksregisterNummer' | 'voornaam' | 'achternaam' | 'adres'> {}

export interface RegisterAccountRequest {
  email: string;
  Password: string;
  onbelegdVermogen: number;
  rijksregisterNummer: number;
  voornaam: string;
  achternaam: string;
  adres: Adres;
}
export interface UpdateAccountRequest extends 
  Pick<RegisterAccountRequest, 
  'email' | 'onbelegdVermogen' | 'rijksregisterNummer' | 'voornaam' | 'achternaam' | 'adres'> {}

export interface GetAccountByIdResponse extends PublicAccount {}
export interface RegisterAccountResponse extends GetAccountByIdResponse {}
export interface UpdateAccountResponse extends GetAccountByIdResponse {}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}
