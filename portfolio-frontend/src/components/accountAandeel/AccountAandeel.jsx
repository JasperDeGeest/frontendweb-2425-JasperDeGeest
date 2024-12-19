import { memo } from 'react';
import { Link } from 'react-router-dom';
import { IoPencilOutline, IoTrashOutline } from 'react-icons/io5';
import { useAuth } from '../../contexts/auth';
import { IconButton } from '@chakra-ui/react';

const AccountAandeelMemoized = memo(function AccountAandeel({
  aandeel,
  aantal,
  aankoopPrijs,
  reden,
  geschatteDuur,
  onDelete,
}) {
  const { isAdmin } = useAuth();

  const handleDelete = () => {
    onDelete(aandeel.id);
  };

  return (
    <tr data-cy="account_aandeel">
      <td data-cy="account_aandeel_afkorting">{aandeel.afkorting}</td>
      <td data-cy="account_aandeel_aantal">{aantal}</td>
      <td data-cy="account_aandeel_aankoopPrijs">{aankoopPrijs}</td>
      <td data-cy="account_aandeel_reden">{reden}</td>
      <td data-cy="account_aandeel_geschatteDuur">{geschatteDuur}</td>

      {isAdmin && (
        <>
          <td>
            <Link to={`/accounts/me/aandelen/edit/${aandeel.id}`}>
              <IconButton
                aria-label="Edit aandeel"
                icon={<IoPencilOutline />}
                colorScheme="blue"
                variant="outline"
                size="sm"
                data-cy="account_aandeel_edit_btn"
              />
            </Link>
          </td>
          <td>
            <IconButton
              aria-label="Delete aandeel"
              icon={<IoTrashOutline />}
              colorScheme="red"
              variant="outline"
              size="sm"
              onClick={handleDelete}
              data-cy="account_aandeel_remove_btn"
            />
          </td>
        </>
      )}
    </tr>
  );
});

export default AccountAandeelMemoized;
