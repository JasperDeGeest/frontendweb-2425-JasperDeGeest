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
    <tr>
      <td>{isin}</td>
      <td>{afkorting}</td>
      <td>{uitgever}</td>
      <td>{kosten}</td>
      <td>{type}</td>
      <td>{rating}</td>
      <td>{sustainability}</td>
      {
        isAdmin ? (
          <>
            <td>
              <Link to={`/aandelen/edit/${id}`} className='btn btn-light'>
                <IoPencilOutline />
              </Link>
            </td>
            <td>
              <button className='btn btn-primary' onClick={handleDelete}>
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