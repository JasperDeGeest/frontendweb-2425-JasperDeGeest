// src/components/transactions/TransactionsTable.jsx
import Aandeel from './Aandeel';

function AandelenTable({ aandelen }) {
  if (aandelen.length === 0) {
    return (
      <div className='alert alert-info'>There are no aandelen yet.</div>
    );
  }

  return (
    <div>
      <table className='table table-hover table-responsive'>
        <thead>
          <tr>
            <th>ISIN</th>
            <th>afkorting</th>
            <th>uitgever</th>
            <th>kosten</th>
            <th>type</th>
            <th>rating</th>
            <th>sustainability</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {aandelen.map((aandeel) => (
            <Aandeel 
              key={aandeel.id}
              {...aandeel} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AandelenTable;
