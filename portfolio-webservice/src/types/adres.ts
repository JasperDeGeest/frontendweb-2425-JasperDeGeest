import type { Entity } from './common';

export interface Adres extends Entity {
  straat: string;
  huisNummer: string;
  stad: string;
  land: string;
}

export interface AdresCreateInput {
  straat: string;
  huisNummer: string;
  stad: string;
  land: string;
}

export interface AdresUpdateInput extends AdresCreateInput {}
