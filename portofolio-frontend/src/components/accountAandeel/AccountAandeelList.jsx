import { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import AccountAandelenTable from '../../components/accountAandeel/AccountAandeelTable';
import AsyncData from '../../components/AsyncData';
import useSWR from 'swr';
import { getAll, deleteById } from '../../api';
import useSWRMutation from 'swr/mutation';

export default function AandeelList() {
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');

  const {
    data: accountAandelen = [],
    isLoading,
    error,
  } = useSWR('accounts/me/aandelen', getAll);

  const filteredAccountAandelen = useMemo(
    () =>
      accountAandelen.filter((t) => {
        return t.reden.toLowerCase().includes(search.toLowerCase());
      }),
    [search, accountAandelen],
  );

  const { trigger: deleteAccountAandeel, error: deleteError } = useSWRMutation(
    'accounts/me/aandelen',
    deleteById,
  );

  const handleDeleteAccountAandeel = useCallback(
    async (id) => {
      await deleteAccountAandeel(id);
      alert('Account aandeel deleted');
    },
    [deleteAccountAandeel],
  );

  return (
    <>
      <h1>eigen aandelen</h1>
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
        <Link to='/accounts/me/aandelen/add' className='btn btn-primary ms-2'>
          +
        </Link>
      </div>

      <div className='mt-4'>
        <AsyncData loading={isLoading} error={error || deleteError }>
          <AccountAandelenTable 
            accountAandelen={filteredAccountAandelen}
            onDelete={handleDeleteAccountAandeel}       
          />
        </AsyncData>
      </div>
    </>
  );
}