import { useState, useMemo, useCallback } from 'react';
import AandelenTable from '../../components/aandelen/AandelenTable';
import AsyncData from '../../components/AsyncData';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { getAll, deleteById } from '../../api';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';

export default function AandeelList() {
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const { isAdmin } = useAuth();

  const {
    data: aandelen = [],
    isLoading,
    error,
  } = useSWR('aandelen', getAll);

  const filteredAandelen = useMemo(
    () =>
      aandelen.filter((t) => {
        return t.afkorting.toLowerCase().includes(search.toLowerCase());
      }),
    [search, aandelen],
  );

  const { trigger: deleteAandeel, error: deleteError } = useSWRMutation(
    'aandelen',
    deleteById,
  );

  const handleDeleteAandeel = useCallback(
    async (id) => {
      await deleteAandeel(id);
      alert('aandeel deleted');
    },
    [deleteAandeel],
  );

  return (
    <>
      <h1>beschikbare aandelen</h1>
      <div className='input-group mb-3'>
        <input
          type='search'
          id='search'
          className='form-control rounded'
          placeholder='Search'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type='button'
          className='btn btn-outline-primary'
          onClick={() => setSearch(text)}
        >
          Search
        </button>
        {
          isAdmin ? (
            <Link to='/aandelen/add' className='btn btn-primary ms-2'>
              +
            </Link>
          ) : (null)
        }
      </div>
      <div className='mt-4'>
        <AsyncData loading={isLoading} error={error || deleteError}>
          <AandelenTable 
            aandelen={filteredAandelen}  
            onDelete={handleDeleteAandeel}     
          />
        </AsyncData>
      </div>
    </>
  );
}