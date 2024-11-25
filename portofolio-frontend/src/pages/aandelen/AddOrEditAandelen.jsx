// src/pages/transactions/AddOrEditTransaction.jsx
import useSWRMutation from 'swr/mutation'; // 👈 1
import { save } from '../../api'; // 👈 1
import AandeelForm from '../../components/aandelen/AandeelForm';
import AsyncData from '../../components/AsyncData'; // 👈 3

export default function AddOrEditTransaction() {
// 👇 2
  const { trigger: saveAandeel, error: saveError } = useSWRMutation(
    'aandelen',
    save,
  );

  // ...
  return (
    <>
      <h1>Add transaction</h1>
      <AsyncData error={ saveError }>
        <AandeelForm saveAandeel={ saveAandeel } />
      </AsyncData>
    </>
  );
}
