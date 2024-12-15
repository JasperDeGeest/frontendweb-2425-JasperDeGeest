import { IoPencilOutline, IoTrashOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { memo } from 'react'; // 👈
import { useAuth } from '../../contexts/auth'; // 👈

const AandeelMemoized = memo(function Aandeel({
  id, 
  isin, 
  afkorting, 
  uitgever, 
  kosten, 
  type, 
  rating, 
  sustainability,
  onDelete,
}) {
  const { isAdmin } = useAuth(); // 👈
  const handleDelete = () => {
    onDelete(id);
  };
  return (
    <tr data-cy='aandeel'>
      <td data-cy='aandeel_isin'>{isin}</td>
      <td data-cy='aandeel_afkorting'>{afkorting}</td>
      <td data-cy='aandeel_uitgever'>{uitgever}</td>
      <td data-cy='aandeel_kosten'>{kosten}</td>
      <td data-cy='aandeel_type'>{type}</td>
      <td data-cy='aandeel_rating'>{rating}</td>
      <td data-cy='aandeel_sustainability'>{sustainability}</td>
      {
        isAdmin ? (
          <>
            <td>
              <Link to={`/aandelen/edit/${id}`} className='btn btn-light' data-cy='aandeel_edit_btn'>
                <IoPencilOutline />
              </Link>
            </td>
            <td>
              <button className='btn btn-primary' onClick={handleDelete} data-cy='aandeel_remove_btn'>
                <IoTrashOutline />
              </button>
            </td>
          </>
        ) : (null)
      }
    </tr>
  );
});

export default AandeelMemoized;