const Account = ({id, email, onbelegdVermogen, rijksregisterNummer, voornaam, achternaam, adresId, 
  onDelete = (f) => f}) => {
  const handleDelete = () => {
    onDelete(id);
  };
  return (
    <div className='text-bg-dark' style={{ textAlign: 'center' }}>
      {email}, {onbelegdVermogen}, {rijksregisterNummer}, {voornaam}, {achternaam}, {adresId}
      <button className="btn btn-primary" onClick={handleDelete}>Verwijder</button>
    </div>
  );
};

export default Account;