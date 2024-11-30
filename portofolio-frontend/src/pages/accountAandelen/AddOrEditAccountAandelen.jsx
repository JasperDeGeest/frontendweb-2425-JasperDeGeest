// src/pages/transactions/AddOrEditTransaction.jsx
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation'; // 👈 1
import { useParams } from 'react-router-dom'; // 👈 1
import { save, getById } from '../../api'; // 👈 1
import AccountAandeelForm from '../../components/accountAandeel/AccountAandeelForm';
import AsyncData from '../../components/AsyncData'; // 👈 3

export default function AddOrEditTransaction() {
  const { aandeelId } = useParams(); // 👈 2

  const {
    data: accountAandeel,
    error: accountAandeelError,
    isLoading: accountAandeelLoading,
  } = useSWR(aandeelId ? `accounts/me/aandelen/${aandeelId}` : null, getById); // 👈 3
  // 👇 2
  const { trigger: saveAandeel, error: saveError } = useSWRMutation(
    'accounts/me/aandelen',
    save,
  );

  return (
    <>
      <h1>{aandeelId ? 'Edit aandeel' : 'Add aandeel'}</h1>
      <AsyncData 
        error={ accountAandeelError || saveError }
        loading={ accountAandeelLoading }
      >
        <AccountAandeelForm 
          aandeel={ accountAandeel }
          saveAandeel={ saveAandeel } 
        />
      </AsyncData>
    </>
  );
}
