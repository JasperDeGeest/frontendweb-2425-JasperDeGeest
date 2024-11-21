import type { Entity } from './common';
import type { Adres } from './adres';

export interface Account extends Entity {
  email: string;
  hashedPassword: string;
  onbelegdVermogen: number;
  rijksregisterNummer: number;
  voornaam: string;
  achternaam: string;
  adres: Adres;
}

export interface AccountCreateInput {
  id: number;
  email: string;
  hashedPassword: string;
  onbelegdVermogen: number;
  rijksregisterNummer: number;
  voornaam: string;
  achternaam: string;
  adres: Adres;
}

export interface AccountUpdateInput extends AccountCreateInput {}

export interface CreateAccountRequest extends AccountCreateInput {}
export interface UpdateAccountRequest extends AccountUpdateInput {}

export interface GetAccountByIdResponse extends Account {}
export interface CreateAccountResponse extends GetAccountByIdResponse {}
export interface UpdateAccountResponse extends GetAccountByIdResponse {}
