const AANDEEL_DATA = [
  {
    id: 1,
    isin: 'IE00B5BMR087',
    afkorting: 'CSPX',
    uitgever: 'iShares',
    kosten: 0.07,
    type: 'Accumulatie',
    rating: 5,
    sustainability: 3,
  },
  {
    id: 2,
    isin: 'IE00B4L5Y983',
    afkorting: 'IWDA',
    uitgever: 'iShares',
    kosten: 0.20,
    type: 'Accumulatie',
    rating: 5,
    sustainability: 2,
  },
  {
    id: 3,
    isin: 'IE00B810Q511',
    afkorting: 'FSTE',
    uitgever: 'Vanguard',
    kosten: 0.09,
    type: 'Verspreiden',
    rating: 4,
    sustainability: 2,
  },

];

const ACCOUNT_DATA = [
  {
    id: 1,
    email: 'test@test1.com',
    hashedPassword: 'fjqlsdfm',
    onbelegdVermogen: 250,
    rijksregisterNummer: '12345678918',
    voornaam: 'Thomas',
    achternaam: 'De Muur',
    adresId: 1,
  },
  {
    id: 2,
    email: 'test@test2.com',
    hashedPassword: 'qdfsfqsd',
    onbelegdVermogen: 300,
    rijksregisterNummer: '9551461425',
    voornaam: 'Jonas',
    achternaam: 'De Bruin',
    adresId: 2,
  },
  {
    id: 3,
    email: 'test@test3.com',
    hashedPassword: 'erztaatr',
    onbelegdVermogen: 8960,
    rijksregisterNummer: '7484464647',
    voornaam: 'Tom',
    achternaam: 'De Man',
    adresId: 3,
  },
];

const ADRES_DATA = [
  {
    id: 1,
    straat: 'Plezanstraat',
    huisNummer: 3,
    stad: 'Gent',
    land: 'België',
  },
  {
    id: 2,
    straat: 'Groenlaan',
    huisNummer: 95,
    stad: 'Antwerpen',
    land: 'België',
  },
  {
    id: 3,
    straat: 'Koekendreef',
    huisNummer: 105,
    stad: 'Hasselt',
    land: 'België',
  },
];

const ACCOUNTAANDEEL_DATA = [
  {
    accountId: 1,
    aandeelId: 1,
    aantal: 5,
    aankoopPrijs: 20,
    reden: 'ik denk dat dit goed is.',
    geschatteDuur: '5 jaar',
  },
  {
    accountId: 1,
    aandeelId: 2,
    aantal: 2,
    aankoopPrijs: 150,
    reden: 'ik wil het lang bijhouden.',
    geschatteDuur: '40 jaar',
  },
  {
    accountId: 2,
    aandeelId: 3,
    aantal: 1,
    aankoopPrijs: 3500,
    reden: 'goede investering.',
    geschatteDuur: '25 jaar',
  },
];

export { AANDEEL_DATA, ACCOUNT_DATA, ADRES_DATA, ACCOUNTAANDEEL_DATA };
