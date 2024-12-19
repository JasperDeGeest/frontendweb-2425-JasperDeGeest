import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { save, getById } from '../../api';
import AccountForm from '../../components/accounts/AccountForm';
import AsyncData from '../../components/AsyncData';

export default function EditAccount() {

  const {
    data: account,
    error: accountError,
    isLoading: accountLoading,
  } = useSWR('accounts/me', getById);
  const { trigger: saveAccount, error: saveError } = useSWRMutation(
    'accounts',
    save,
  );

  return (
    <>
      <h1>{'edit account'}</h1>
      <AsyncData 
        error={ accountError || saveError }µ
        loading = { accountLoading  }
      >
        <AccountForm 
          account = { account }
          saveAccount={ saveAccount } 
        />
      </AsyncData>
    </>
  );
}
