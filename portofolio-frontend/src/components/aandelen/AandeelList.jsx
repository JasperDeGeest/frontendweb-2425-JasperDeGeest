import { useState, useMemo } from 'react';
import AandelenTable from './AandelenTable';
import { AANDEEL_DATA } from '../../api/mock_data';

export default function AandeelList() {
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');

  const filteredAandelen = useMemo(
    () =>
      AANDEEL_DATA.filter((t) => {
        return t.afkorting.toLowerCase().includes(search.toLowerCase());
      }),
    [search],
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
        <AandelenTable aandelen={filteredAandelen} />
      </div>
    </>
  );
}