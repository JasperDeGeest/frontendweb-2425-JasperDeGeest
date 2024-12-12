// src/components/transactions/TransactionsTable.jsx
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/Theme.context';
import Aandeel from './Aandeel';
import { useAuth } from '../../contexts/auth';

function AandelenTable({ aandelen, onDelete }) {
  const { isAdmin } = useAuth();
  const { theme } = useContext(ThemeContext);
  if (aandelen.length === 0) {
    return (
      <div className='alert alert-info'>There are no aandelen yet.</div>
    );
  }

  return (
    <div>
      <table className={`table table-hover table-responsive table-${theme}`}>
        <thead>
          <tr>
            <th>ISIN</th>
            <th>afkorting</th>
            <th>uitgever</th>
            <th>kosten</th>
            <th>type</th>
            <th>rating</th>
            <th>sustainability</th>
            {
              isAdmin ? (
                <>
                  <th>Edit</th>
                  <th>Delete</th>
                </>
              ) : (null)
            }
          </tr>
        </thead>
        <tbody>
          {aandelen.map((aandeel) => (
            <Aandeel 
              key={aandeel.id}
              onDelete = {onDelete}
              {...aandeel} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AandelenTable;
