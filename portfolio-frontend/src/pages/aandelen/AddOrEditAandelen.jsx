import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { useParams } from 'react-router-dom';
import { save, getById } from '../../api';
import AandeelForm from '../../components/aandelen/AandeelForm';
import AsyncData from '../../components/AsyncData';

export default function AddOrEditTransaction() {
  const { id } = useParams();

  const {
    data: aandeel,
    error: aandeelError,
    isLoading: aandeelLoading,
  } = useSWR(id ? `aandelen/${id}` : null, getById);
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
