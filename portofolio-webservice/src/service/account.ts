import { ACCOUNTS, ADRESSES, ACCOUNTAANDELEN} from '../data/mock_data';
export const getById = (id: number) => {
  const account = ACCOUNTS.find((a) => a.id === id);
  return  { ...account, ...ADRESSES.find((a) => a.id === account?.adresId)};
};

export const updateById = (id: number, 
  { email, hashedPassword, onbelegdVermogen, rijksregisterNummer, 
    voornaam, achternaam, adresId, 
    straat, huisNummer, stad, land}: any) => {
  const index = ACCOUNTS.findIndex((a) => a.id === id);
  const indexAdres = ADRESSES.findIndex((a) => a.id === ACCOUNTS[index]?.adresId);

  const updatedAccount = {
    ...ACCOUNTS[index],
    id,
    email,
    hashedPassword,
    onbelegdVermogen,
    rijksregisterNummer,
    voornaam,
    achternaam,
    adresId,
  };
  const updatedAdress = {
    ...ADRESSES[indexAdres],
    id: adresId,
    straat,
    huisNummer,
    stad,
    land,
  };
  ACCOUNTS[index] = updatedAccount;
  ADRESSES[indexAdres] = updatedAdress;
  return {...updatedAccount, ...updatedAdress};
};

export const create = (
  { email, hashedPassword, onbelegdVermogen, rijksregisterNummer, voornaam, achternaam, 
    straat, huisNummer, stad, land}: any) => {
  const maxId = Math.max(...ACCOUNTS.map((i) => i.id));
  const maxIdAdress = Math.max(...ADRESSES.map((i) => i.id));
  const newAccount = {
    id: maxId +1,
    email,
    hashedPassword,
    onbelegdVermogen,
    rijksregisterNummer,
    voornaam,
    achternaam,
    adresId: maxIdAdress +1,
  };
  const newAdress = {
    id: maxIdAdress +1,
    straat,
    huisNummer,
    stad,
    land,
  };
  ACCOUNTS.push(newAccount);
  ADRESSES.push(newAdress);
  return {...newAccount,...ADRESSES};
};

export const getAandelenByAccountId = (accountId: number) => {
  return ACCOUNTAANDELEN.filter((a) => a.accountId === accountId);
};
