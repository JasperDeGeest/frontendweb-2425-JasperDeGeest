import type { ListResponse } from './common';
export interface AccountAandeel {
  accountId: number;
  aandeelId: number;
  aantal: number;
  aankoopPrijs: number;
  reden: string;
  geschatteDuur: string;
}

export interface AccountAandeelCreateInput {
  accountId: number;
  aandeelId: number;
  aantal: number;
  aankoopPrijs: number;
  reden: string;
  geschatteDuur: string;
}

export interface AccountAandeelUpdateInput extends AccountAandeelCreateInput {}

export interface GetAllAccountAandelenResponse extends ListResponse<AccountAandeel> {}
