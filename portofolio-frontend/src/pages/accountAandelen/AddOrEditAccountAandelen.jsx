// src/pages/transactions/AddOrEditTransaction.jsx
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation'; // 👈 1
import { useParams } from 'react-router-dom'; // 👈 1
import { save, getById, post, getAll} from '../../api'; // 👈 1
import AccountAandeelForm from '../../components/accountAandeel/AccountAandeelForm';
import AsyncData from '../../components/AsyncData'; // 👈 3

export default function EditTransaction() {
  const { aandeelId } = useParams(); // 👈 2

  const {
    data: accountAandeel,
    error: accountAandeelError,
    isLoading: accountAandeelLoading,
  } = useSWR(aandeelId ? `accounts/me/aandelen/${aandeelId}` : null, getById); // 👈 3

  const {
    data: aandelen = [],
    error: aandelenError,
    isLoading: aandelenLoading,
  } = useSWR('aandelen', getAll);
  // 👇 2
  const { trigger: saveAccountAandeel, error: saveError } = useSWRMutation(
    'accounts/me/aandelen',
    save,
  );
  const { trigger: addAccountAandeel, error: addError } = useSWRMutation(
    'accounts/me/aandelen',
    post,
  );

  return (
    <>
      <h1>{accountAandeel?.aandeelId ? 'Edit aandeel' : 'Add aandeel'}</h1>
      <AsyncData 
        error={ accountAandeelError || saveError || addError || aandelenError }
        loading={ accountAandeelLoading || aandelenLoading }
      >
        <AccountAandeelForm
          aandelen = { aandelen }
          accountAandeel={ accountAandeel }
          saveAccountAandeel={ accountAandeel?.aandeelId ? saveAccountAandeel : addAccountAandeel } 
        />
      </AsyncData>
    </>
  );
}
