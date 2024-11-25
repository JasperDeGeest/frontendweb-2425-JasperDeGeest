import { useState, useMemo } from 'react';
import AandelenTable from '../../components/aandelen/AandelenTable';
import AsyncData from '../../components/AsyncData';
import useSWR from 'swr';
import { getAll } from '../../api';

export default function AandeelList() {
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');

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
      </div>

      <div className='mt-4'>
        <AsyncData loading={isLoading} error={error}>
          <AandelenTable 
            aandelen={filteredAandelen}       
          />
        </AsyncData>
      </div>
    </>
  );
}