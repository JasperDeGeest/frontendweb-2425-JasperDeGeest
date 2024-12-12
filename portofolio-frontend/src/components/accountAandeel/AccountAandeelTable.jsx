// src/components/transactions/TransactionsTable.jsx
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/Theme.context';
import AccountAandeel from './AccountAandeel';

function AccountAandelenTable({ accountAandelen = [], onDelete }) {
  const { theme } = useContext(ThemeContext);
  if (accountAandelen.length === 0) {
    return (
      <div className='alert alert-info'>There are no aandelen yet.</div>
    );
  }

  return (
    <div>
      <table className={`table table-hover table-responsive table-${theme}`}>
        <thead>
          <tr>
            <th>afkorting</th>
            <th>aantal</th>
            <th>aankoopprijs</th>
            <th>reden</th>
            <th>geschatteDuur</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {accountAandelen.map((accountAandeel,index) => (
            <AccountAandeel 
              key={index}
              onDelete = {onDelete}
              {...accountAandeel} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AccountAandelenTable;
