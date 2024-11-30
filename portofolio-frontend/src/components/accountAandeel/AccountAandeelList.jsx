import { useState, useMemo } from 'react';
import AccountAandelenTable from '../../components/accountAandeel/AccountAandeelTable';
import AsyncData from '../../components/AsyncData';
import useSWR from 'swr';
import { getAll } from '../../api';

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
      </div>

      <div className='mt-4'>
        <AsyncData loading={isLoading} error={error}>
          <AccountAandelenTable 
            accountAandelen={filteredAccountAandelen}       
          />
        </AsyncData>
      </div>
    </>
  );
}