function Aandeel({isin, afkorting, uitgever, kosten, type, rating, sustainability}) {
  return (
    <tr>
      <td>{isin}</td>
      <td>{afkorting}</td>
      <td>{uitgever}</td>
      <td>{kosten}</td>
      <td>{type}</td>
      <td>{rating}</td>
      <td>{sustainability}</td>
    </tr>
  );
};

export default Aandeel;