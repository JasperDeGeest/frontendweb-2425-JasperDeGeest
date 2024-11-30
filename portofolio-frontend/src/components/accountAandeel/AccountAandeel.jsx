import { memo } from 'react'; // 👈
import { Link } from 'react-router-dom';
import { IoPencilOutline } from 'react-icons/io5';

const AccountAandeelMemoized = memo(function AccountAandeel({
  aandeel,
  aantal,
  aankoopPrijs,
  reden,
  geschatteDuur,
}) {
  return (
    <tr>
      <td>{aandeel.afkorting}</td>
      <td>{aantal}</td>
      <td>{aankoopPrijs}</td>
      <td>{reden}</td>
      <td>{geschatteDuur}</td>
      <td><Link to={`/accounts/me/aandelen/edit/${aandeel.id}`} className='btn btn-light'>
        <IoPencilOutline />
      </Link></td>
    </tr>
  );
});

export default AccountAandeelMemoized;