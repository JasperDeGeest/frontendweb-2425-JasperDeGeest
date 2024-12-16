// src/pages/transactions/AddOrEditTransaction.jsx
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation'; // 👈 1
import { useParams } from 'react-router-dom'; // 👈 1
import { save, getById } from '../../api'; // 👈 1
import AandeelForm from '../../components/aandelen/AandeelForm';
import AsyncData from '../../components/AsyncData'; // 👈 3

export default function AddOrEditTransaction() {
  const { id } = useParams(); // 👈 2

  const {
    data: aandeel,
    error: aandeelError,
    isLoading: aandeelLoading,
  } = useSWR(id ? `aandelen/${id}` : null, getById); // 👈 3
  // 👇 2
  const { trigger: saveAandeel, error: saveError } = useSWRMutation(
    'aandelen',
    save,
  );

  return (
    <>
      <h1>{id ? 'Edit aandeel' : 'Add aandeel'}</h1>
      <AsyncData 
        error={ aandeelError || saveError }µ
        loading = { aandeelLoading  }
      >
        <AandeelForm 
          aandeel = { aandeel }
          saveAandeel={ saveAandeel } 
        />
      </AsyncData>
    </>
  );
}
