import type { ListResponse } from './common';
import type { Aandeel } from './aandeel';
export interface AccountAandeel {
  accountId: number;
  aandeelId: number;
  aantal: number;
  aankoopPrijs: number;
  reden: string;
  geschatteDuur: string;
  aandeel: Aandeel;
}

export interface AccountAandeelCreateInput {
  //accountId: number | 'me';
  aandeelId: number;
  aantal: number;
  aankoopPrijs: number;
  reden: string;
  geschatteDuur: string;
}

export interface AccountAandeelUpdateInput extends 
  Pick<AccountAandeelCreateInput, 'aantal' | 'aankoopPrijs' | 'reden' | 'geschatteDuur'> {}

export interface CreateAccountAandeelRequest extends AccountAandeelCreateInput {}
export interface UpdateAccountAandeelRequest extends Omit<AccountAandeelUpdateInput, 'aandeelId'> {}

export interface GetAllAccountAandelenResponse extends ListResponse<AccountAandeel> {}
export interface UpdateAccountAandeelResponse extends AccountAandeel {}
export interface getAccountAandeelByIdResponse extends AccountAandeel {}
export interface CreateAccountAandeelResponse extends getAccountAandeelByIdResponse {}

export interface GetAccountAandelenRequest {
  id: number | 'me';
}
