// src/pages/transactions/AddOrEditTransaction.jsx
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation'; // 👈 1
import { save, getById } from '../../api'; // 👈 1
import AccountForm from '../../components/accounts/AccountForm'; // 👈 2
import AsyncData from '../../components/AsyncData'; // 👈 3
//import { useParams } from 'react-router-dom';

export default function EditAccount() {
  //const { id } = useParams(); // 👈 2

  const {
    data: account,
    error: accountError,
    isLoading: accountLoading,
  } = useSWR('accounts/me', getById); // 👈 3
  // 👇 2
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
