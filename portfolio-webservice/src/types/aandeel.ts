import type { Entity, ListResponse } from './common';

export interface Aandeel extends Entity {
  isin: string;
  afkorting: string;
  uitgever: string;
  kosten: number;
  type: string;
  rating: number;
  sustainability: number;
}

export interface AandeelCreateInput {
  isin: string;
  afkorting: string;
  uitgever: string;
  kosten: number;
  type: string;
  rating: number;
  sustainability: number;
}

export interface AandeelUpdateInput extends AandeelCreateInput {}

export interface CreateAandeelRequest extends AandeelCreateInput {}
export interface UpdateAandeelRequest extends AandeelUpdateInput {}

export interface GetAllAandelenResponse extends ListResponse<Aandeel> {}
export interface GetAandeelByIdResponse extends Aandeel {}
export interface CreateAandeelResponse extends GetAandeelByIdResponse {}
export interface UpdateAandeelResponse extends GetAandeelByIdResponse {}
