import type supertest from 'supertest';
import { prisma } from '../../src/data';
import withServer from '../helpers/withServer';
import { loginAdmin } from '../helpers/login';
import testAuthHeader from '../helpers/testAuthHeader';

const data = {
  accountAandelen: [
    {
      'accountId': 1,
      'aandeelId': 2,
      'aantal': 10,
      'aankoopPrijs': 5,
      'reden': 'ik denk dat dit goed is.',
      'geschatteDuur': '5 jaar',
    },
    {
      'accountId': 1,
      'aandeelId': 3,
      'aantal': 5,
      'aankoopPrijs': 20,
      'reden': 'ik denk dat dit goed is.',
      'geschatteDuur': '5 jaar',
    },
    {
      'accountId': 2,
      'aandeelId': 1,
      'aantal': 5,
      'aankoopPrijs': 20,
      'reden': 'ik denk dat dit goed is.',
      'geschatteDuur': '5 jaar',
    },
  ],
  aandelen: [
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
  ],
};

describe('Accounts', () => {
  let request: supertest.Agent;
  let authHeader: string;

  withServer((r) => (request = r));

  beforeAll(async () => {
    authHeader = await loginAdmin(request);
  });

  const url = '/api/accounts';

  describe('GET /api/accounts', () => {
    it('should 200 and return all accounts', async () => {
      const response = await request.get(url).set('Authorization', authHeader);
  
      // Expect the response status to be 200 (OK)
      expect(response.status).toBe(200);
  
      // Ensure that the response body contains 'items' as an array
      expect(response.body).toEqual(
        expect.objectContaining({
          items: expect.arrayContaining([ // Expect 'items' to be an array
            expect.objectContaining({
              id: 1,
              voornaam: 'Test',
              achternaam: 'User',
              email: 'test.user@hogent.be',
            }),
            expect.objectContaining({
              id: 2,
              voornaam: 'Admin',
              achternaam: 'User',
              email: 'admin.user@hogent.be',
            }),
          ]),
        }),
      );
    });
  });

  describe('GET /api/accounts/:id', () => {
    it('should 200 and return account with id', async () => {
      const response = await request.get(`${url}/1`).set('Authorization', authHeader);
      console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: 1,
          voornaam: 'Test',
          achternaam: 'User',
          email: 'test.user@hogent.be',
          onbelegdVermogen: 250,
          rijksregisterNummer: '12345678911',
          roles: '["user"]',
          adresId: 1,
          adres: expect.objectContaining({
            id: 1,
            straat: 'Straat1',
            huisNummer: '1',
            stad: 'Stad1',
            land: 'Land1',
          }),
        }),
      );
    });

    it('should 200 and return account with id', async () => {
      const response = await request.get(`${url}/me`).set('Authorization', authHeader);
      console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: 2,
          voornaam: 'Admin',
          achternaam: 'User',
          email: 'admin.user@hogent.be',
          onbelegdVermogen: 250,
          hashedPassword: expect.any(String),
          rijksregisterNummer: '12345678912',
          roles: '["admin","user"]',
          adresId: 2,
          adres: expect.objectContaining({
            id: 2,
            straat: 'Straat2',
            huisNummer: '2',
            stad: 'Stad2',
            land: 'Land2',
          }),
        }),
      );
    });
    testAuthHeader(() => request.get(url));
  });

  describe('POST /api/accounts', () => {
    it('should 201 and return the created account', async () => {
      const response = await request.post(url).send({
        email: 'test@test4.com',
        Password: 'wachtwoord123',
        onbelegdVermogen: 250,
        rijksregisterNummer: '12345678991',
        voornaam: 'test4',
        achternaam: 'test4',
        adres: { straat: 'ffff', huisNummer: '548', stad: 'Test', land: 'f' },
      });
  
      // Verify status code and response structure
      expect(response.status).toBe(201);
  
      // Expect the response body to match the expected object
      expect(response.body).toEqual(
        expect.objectContaining({
          token: expect.any(String), // Allow any string for the token field
        }),
      );
    });
  });

  describe('GET /api/accounts/:id/aandelen', () => {

    beforeAll(async () => {
      await prisma.aandeel.createMany({data: data.aandelen});
      await prisma.accountAandeel.createMany({data: data.accountAandelen}); 
    });

    afterAll(async () => {
      await prisma.accountAandeel.deleteMany();
      await prisma.aandeel.deleteMany();
    });
    
    it('should 200 and return all accountAandelen', async () => {
      const response = await request.get(`${url}/2/aandelen`).set('Authorization', authHeader);
      expect(response.status).toBe(200);
      expect(response.body.items).toEqual(
        expect.arrayContaining([
          {
            'aandeel': {
              'afkorting': 'CSPX', 
              'id': 1, 
              'isin': 'IE00B5BMR087', 
              'kosten': 0.07, 
              'rating': 5, 
              'sustainability': 3, 
              'type': 
              'Accumulatie', 
              'uitgever': 'iShares',
            }, 
            'aandeelId': 1, 
            'aankoopPrijs': 20, 
            'aantal': 5, 
            'accountId': 2, 
            'geschatteDuur': '5 jaar', 
            'reden': 'ik denk dat dit goed is.',
          }, 
        ]),
      );
    });

    it('should 200 and return all accountAandelen', async () => {
      const response = await request.get(`${url}/me/aandelen`).set('Authorization', authHeader);
      expect(response.status).toBe(200);
      expect(response.body.items).toEqual(
        expect.arrayContaining([
          {
            'aandeel': {
              'afkorting': 'CSPX', 
              'id': 1, 
              'isin': 'IE00B5BMR087', 
              'kosten': 0.07, 
              'rating': 5, 
              'sustainability': 3, 
              'type': 
              'Accumulatie', 
              'uitgever': 'iShares',
            }, 
            'aandeelId': 1, 
            'aankoopPrijs': 20, 
            'aantal': 5, 
            'accountId': 2, 
            'geschatteDuur': '5 jaar', 
            'reden': 'ik denk dat dit goed is.',
          }, 
        ]),
      );
    });
  });

  describe('PUT /api/accounts/:accountId/aandelen/:aandeelId', () => {
    beforeAll(async () => {
      await prisma.aandeel.createMany({data: data.aandelen});
      await prisma.accountAandeel.createMany({data: data.accountAandelen}); 
    });

    afterAll(async () => {
      await prisma.accountAandeel.deleteMany();
      await prisma.aandeel.deleteMany();
    });

    it('should 201 and return the edited accountAandeel', async () => {
      const response = await request.put(`${url}/2/aandelen/1`).set('Authorization', authHeader).send({
        aantal: 10,
        aankoopPrijs: 5,
        reden: 'ik denk dat dit goed is.',
        geschatteDuur: '5 jaar',
      });
    
      expect(response.status).toBe(201);
      expect(response.body).toEqual(
        expect.objectContaining({
          aandeel: expect.objectContaining({
            afkorting: 'CSPX',
            id: 1,
            isin: 'IE00B5BMR087',
            kosten: 0.07,
            rating: 5,
            sustainability: 3,
            type: 'Accumulatie',
            uitgever: 'iShares',
          }),
          accountId: 2,
          aandeelId: 1,
          aantal: 10,
          aankoopPrijs: 5,
          reden: 'ik denk dat dit goed is.',
          geschatteDuur: '5 jaar',
        }),
      );
    });

    it('should 201 and return the edited accountAandeel', async () => {
      const response = await request.put(`${url}/me/aandelen/1`).set('Authorization', authHeader).send({
        aantal: 15,
        aankoopPrijs: 15,
        reden: 'ik denk dat dit goed is.',
        geschatteDuur: '5 jaar',
      });
    
      expect(response.status).toBe(201);
      expect(response.body).toEqual(
        expect.objectContaining({
          aandeel: expect.objectContaining({
            afkorting: 'CSPX',
            id: 1,
            isin: 'IE00B5BMR087',
            kosten: 0.07,
            rating: 5,
            sustainability: 3,
            type: 'Accumulatie',
            uitgever: 'iShares',
          }),
          accountId: 2,
          aandeelId: 1,
          aantal: 15,
          aankoopPrijs: 15,
          reden: 'ik denk dat dit goed is.',
          geschatteDuur: '5 jaar',
        }),
      );
    });
  });

  describe('DELETE /api/accounts/:accountId/aandelen/:aandeelId', () => {
    beforeAll(async () => {
      await prisma.aandeel.createMany({data: data.aandelen});
      await prisma.accountAandeel.createMany({data: data.accountAandelen}); 
    });

    afterAll(async () => {
      await prisma.accountAandeel.deleteMany();
      await prisma.aandeel.deleteMany();
    });

    it('should 204 and delete the accountAandeel', async () => {
      const response = await request.delete(`${url}/1/aandelen/2`).set('Authorization', authHeader);
      expect(response.status).toBe(204);
    });

    it('should 204 and delete the accountAandeel', async () => {
      const response = await request.delete(`${url}/me/aandelen/1`).set('Authorization', authHeader);
      expect(response.status).toBe(204);
    });
  });

  describe('GET /api/accounts/:accountId/aandelen/:aandeelId', () => {
    beforeAll(async () => {
      await prisma.aandeel.createMany({data: data.aandelen});
      await prisma.accountAandeel.createMany({data: data.accountAandelen}); 
    });

    afterAll(async () => {
      await prisma.accountAandeel.deleteMany();
      await prisma.aandeel.deleteMany();
    });

    it('should 200 and return the accountAandeel', async () => {
      const response = await request.get(`${url}/2/aandelen/1`).set('Authorization', authHeader);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          aandeel: expect.objectContaining({
            afkorting: 'CSPX',
            id: 1,
            isin: 'IE00B5BMR087',
            kosten: 0.07,
            rating: 5,
            sustainability: 3,
            type: 'Accumulatie',
            uitgever: 'iShares',
          }),
          accountId: 2,
          aandeelId: 1,
          aantal: 5,
          aankoopPrijs: 20,
          reden: 'ik denk dat dit goed is.',
          geschatteDuur: '5 jaar',
        }),
      );
    });

    it('should 200 and return the accountAandeel', async () => {
      const response = await request.get(`${url}/me/aandelen/1`).set('Authorization', authHeader);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          aandeel: expect.objectContaining({
            afkorting: 'CSPX',
            id: 1,
            isin: 'IE00B5BMR087',
            kosten: 0.07,
            rating: 5,
            sustainability: 3,
            type: 'Accumulatie',
            uitgever: 'iShares',
          }),
          accountId: 2,
          aandeelId: 1,
          aantal: 5,
          aankoopPrijs: 20,
          reden: 'ik denk dat dit goed is.',
          geschatteDuur: '5 jaar',
        }),
      );
    });
  });

  describe('POST /api/accounts/:accountId/aandelen', () => {
    beforeAll(async () => {
      await prisma.aandeel.createMany({data: data.aandelen});
    });

    afterAll(async () => {
      await prisma.accountAandeel.deleteMany();
      await prisma.aandeel.deleteMany();
    });

    it('should 201 and return the created accountAandeel', async () => {
      const response = await request.post(`${url}/2/aandelen`).set('Authorization', authHeader).send({
        aandeelId: 2,
        aantal: 10,
        aankoopPrijs: 5,
        reden: 'ik denk dat dit goed is.',
        geschatteDuur: '5 jaar',
      });
    
      expect(response.status).toBe(201);
      expect(response.body).toEqual(
        expect.objectContaining({
          aandeel: expect.objectContaining({
            afkorting: 'IWDA',
            id: 2,
            isin: 'IE00B4L5Y983',
            kosten: 0.2,
            rating: 5,
            sustainability: 2,
            type: 'Accumulatie',
            uitgever: 'iShares',
          }),
          accountId: 2,
          aandeelId: 2,
          aantal: 10,
          aankoopPrijs: 5,
          reden: 'ik denk dat dit goed is.',
          geschatteDuur: '5 jaar',
        }),
      );
    });
  });
});
