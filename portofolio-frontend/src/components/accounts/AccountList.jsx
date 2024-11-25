// src/components/places/PlacesList.jsx
import { useState } from 'react';
import { ACCOUNT_DATA } from '../../api/mock_data';
import Account from './Account';

const PlacesList = () => {
  const [accounts, setAccounts] = useState(ACCOUNT_DATA);

  const handleDeletePlace = (id) => {
    setAccounts((accounts) => accounts.filter((p) => p.id !== id));
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="w-75">
        <h1 className="text-center">Accounts</h1>
        <div className='grid mt-3'>
          <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4 g-3 justify-content-center'>
            {accounts
              .sort((a, b) =>
                a.achternaam.toUpperCase().localeCompare(b.achternaam.toUpperCase()),
              )
              .map((a) => (
                <div className='col' key={a.id}>
                  <Account {...a} onDelete={handleDeletePlace} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacesList;
