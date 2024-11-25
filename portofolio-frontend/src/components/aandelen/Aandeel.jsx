import { IoPencilOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

function Aandeel({id, isin, afkorting, uitgever, kosten, type, rating, sustainability}) {
  return (
    <tr>
      <td>{isin}</td>
      <td>{afkorting}</td>
      <td>{uitgever}</td>
      <td>{kosten}</td>
      <td>{type}</td>
      <td>{rating}</td>
      <td>{sustainability}</td>
      <td><Link to={`/aandelen/edit/${id}`} className='btn btn-light'>
        <IoPencilOutline />
      </Link></td>
    </tr>
  );
};

export default Aandeel;