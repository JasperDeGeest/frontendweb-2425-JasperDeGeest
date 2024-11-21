import supertest from 'supertest';
import createServer from '../../src/createServer';
import type { Server } from '../../src/createServer';
import { prisma } from '../../src/data';

const data = {
  accounts: [
    {
      'id': 4,
      'email': 'test@test4.com',
      'hashedPassword': 'dfgrqfg',
      'onbelegdVermogen': 500,
      'rijksregisterNummer': 987654321,
      'voornaam': 'Tibe',
      'achternaam': 'De Lange',
      'adresId': 4,
    },
    {
      'id': 5,
      'email': 'test@test5.com',
      'hashedPassword': 'fjqlsdfm',
      'onbelegdVermogen': 156461,
      'rijksregisterNummer': 144454621,
      'voornaam': 'Test5',
      'achternaam': 'Test5',
      'adresId': 5,
    },
    {
      'id': 6,
      'email': 'test@test6.com',
      'hashedPassword': 'fqsdfdqs',
      'onbelegdVermogen': 45894,
      'rijksregisterNummer': 45544645,
      'voornaam': 'Test6',
      'achternaam': 'Test6',
      'adresId': 6,
    },
  ],
  adresses: [
    {
      'id': 4,
      'straat': 'ColaStraat',
      'huisNummer': '59',
      'stad': 'Roense',
      'land': 'België',
    },
    {
      'id': 5,
      'straat': 'Teststraat5',
      'huisNummer': '5',
      'stad': 'Test5',
      'land': 'België',
    },
    {
      'id': 6,
      'straat': 'Teststraat6',
      'huisNummer': '6',
      'stad': 'Test6',
      'land': 'België',
    },
  ],
  accountAandelen: [
    {
      'accountId': 4,
      'aandeelId': 2,
      'aantal': 10,
      'aankoopPrijs': 5,
      'reden': 'ik denk dat dit goed is.',
      'geschatteDuur': '5 jaar',
    },
    {
      'accountId': 4,
      'aandeelId': 3,
      'aantal': 5,
      'aankoopPrijs': 20,
      'reden': 'ik denk dat dit goed is.',
      'geschatteDuur': '5 jaar',
    },
    {
      'accountId': 5,
      'aandeelId': 1,
      'aantal': 5,
      'aankoopPrijs': 20,
      'reden': 'ik denk dat dit goed is.',
      'geschatteDuur': '5 jaar',
    },
  ],
};

const dataToDelete = {
  accounts: [4,5,6],
  adresses: [4,5,6],
  accountAandelen: [4,5],
};

describe('Accounts', () => {
  let server: Server;
  let request: supertest.Agent;

  beforeAll(async () => {
    server = await createServer();
    request = supertest(server.getApp().callback());
  });

  afterAll(async () => {
    await server.stop();
  });

  const url = '/api/accounts';

  describe('GET /api/accounts/:id', () => {
    beforeAll(async () => {
      await prisma.adres.createMany({data: data.adresses});
      await prisma.account.createMany({data: data.accounts});
    });

    afterAll(async () => {
      await prisma.account.deleteMany({
        where: {id: { in: dataToDelete.accounts}},
      });
      await prisma.adres.deleteMany({
        where: {id: { in: dataToDelete.adresses}},
      });
    });

    it('should 200 and return aandeel with id', async () => {
      const response = await request.get(`${url}/4`);
      console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: 4,
          email: 'test@test4.com',
          hashedPassword: 'dfgrqfg',
          onbelegdVermogen: 500,
          rijksregisterNummer: 987654321,
          voornaam: 'Tibe',
          achternaam: 'De Lange',
          adresId: 4,
          adres: expect.objectContaining({
            id: 4,
            straat: 'ColaStraat',
            huisNummer: '59',
            stad: 'Roense',
            land: 'België',
          }),
        }),
      );
    });
  });

  describe('POST /api/accounts', () => {
    const accountToDelete: number[] = [];
    const adresToDelete: number[] = [];
  
    afterAll(async () => {
      await prisma.account.deleteMany({
        where: { id: { in: accountToDelete } },
      });

      await prisma.adres.deleteMany({
        where: { id: { in: adresToDelete } },
      });
    });

    it('should 201 and return the created account', async () => {
      const response = await request.post(url).send({
        'id': 4,
        'email': 'test@test4.com',
        'hashedPassword': 'gqsfgq',
        'onbelegdVermogen': 1561,
        'rijksregisterNummer': 4515414,
        'voornaam': 'Test4',
        'achternaam': 'Test4',
        'adresId': 4,
        'adres': {
          'id': 4,
          'straat': 'Test4straat',
          'huisNummer': '4',
          'stad': 'Test4',
          'land': 'België',
        },
      });
    
      expect(response.status).toBe(201);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: 4,
          email: 'test@test4.com',
          hashedPassword: 'gqsfgq',
          onbelegdVermogen: 1561,
          rijksregisterNummer: 4515414,
          voornaam: 'Test4',
          achternaam: 'Test4',
          adresId: 4,
          adres: expect.objectContaining({
            id: 4,
            straat: 'Test4straat',
            huisNummer: '4',
            stad: 'Test4',
            land: 'België',
          }),
        }),
      );
      accountToDelete.push(response.body.id);
      adresToDelete.push(response.body.adres.id);
    });
  });

  describe('PUT /api/aandelen/:id', () => {
    beforeAll(async () => {
      await prisma.adres.createMany({data: data.adresses});
      await prisma.account.createMany({data: data.accounts});
    });

    afterAll(async () => {
      await prisma.account.deleteMany({
        where: {id: { in: dataToDelete.accounts}},
      });
      await prisma.adres.deleteMany({
        where: {id: { in: dataToDelete.adresses}},
      });
    });

    it('should 201 and return the created account', async () => {
      const response = await request.put(`${url}/4`).send({
        'id': 4,
        'email': 'test@test4.com',
        'hashedPassword': 'gqsfgq',
        'onbelegdVermogen': 1561,
        'rijksregisterNummer': 4515414,
        'voornaam': 'Test4',
        'achternaam': 'Test4',
        'adresId': 4,
        'adres': {
          'id': 4,
          'straat': 'Test4straat',
          'huisNummer': '4',
          'stad': 'Test4',
          'land': 'België',
        },
      });
    
      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: 4,
          email: 'test@test4.com',
          hashedPassword: 'gqsfgq',
          onbelegdVermogen: 1561,
          rijksregisterNummer: 4515414,
          voornaam: 'Test4',
          achternaam: 'Test4',
          adresId: 4,
          adres: expect.objectContaining({
            id: 4,
            straat: 'Test4straat',
            huisNummer: '4',
            stad: 'Test4',
            land: 'België',
          }),
        }),
      );
    });
  });

  describe('GET /api/accounts/:id/aandelen', () => {
    
    beforeAll(async () => {
      await prisma.adres.createMany({data: data.adresses});
      await prisma.account.createMany({ data: data.accounts }); 
      await prisma.accountAandeel.createMany({data: data.accountAandelen}); 
    });

    afterAll(async () => {
      await prisma.accountAandeel.deleteMany({
        where: { accountId: { in: dataToDelete.accountAandelen } },
      });
      await prisma.account.deleteMany({
        where: { id: { in: dataToDelete.accounts } },
      });
      await prisma.adres.deleteMany({
        where: { id: { in: dataToDelete.adresses } },
      });
    });
    
    it('should 200 and return all accountAandelen', async () => {
      const response = await request.get(`${url}/4/aandelen`);
      expect(response.status).toBe(200);
      expect(response.body.items).toEqual(
        expect.arrayContaining([
          {
            'accountId': 4,
            'aandeelId': 2,
            'aantal': 10,
            'aankoopPrijs': 5,
            'reden': 'ik denk dat dit goed is.',
            'geschatteDuur': '5 jaar',
          },
          {
            'accountId': 4,
            'aandeelId': 3,
            'aantal': 5,
            'aankoopPrijs': 20,
            'reden': 'ik denk dat dit goed is.',
            'geschatteDuur': '5 jaar',
          },
        ]),
      );
    });
  });
});
