import type supertest from 'supertest';
import { prisma } from '../../src/data';
import withServer from '../helpers/withServer';
import { loginAdmin } from '../helpers/login';
import testAuthHeader from '../helpers/testAuthHeader';

const data = {
  aandelen: [
    {
      'id': 4,
      'isin': 'IE00BD8PGZ49',
      'afkorting': 'IUSV',
      'uitgever': 'iShares',
      'kosten': 0.10,
      'type': 'Verspreiden',
      'rating': 0,
      'sustainability': 3,
    },
    {
      'id': 5,
      'isin': 'LU1781541179',
      'afkorting': 'LCWD',
      'uitgever': 'Amundi',
      'kosten': 0.12,
      'type': 'Accumulatie',
      'rating': 4,
      'sustainability': 3,
    },
    {
      'id': 6,
      'isin': 'IE00B2NPKV68',
      'afkorting': 'SEMB',
      'uitgever': 'iShares',
      'kosten': 0.45,
      'type': 'Verspreiden',
      'rating': 4,
      'sustainability': 3,
    },
  ],
};

const dataToDelete = {
  aandelen: [4,5,6],
};

describe('Aandelen', () => {
  let request: supertest.Agent;
  let authHeader: string;
  let initialCount = 0;

  withServer((r) => {
    request = r;
  });

  beforeAll(async () => {
    authHeader = await loginAdmin(request);
    initialCount = await prisma.aandeel.count();
  });

  const url = '/api/aandelen';

  describe('GET /api/aandelen', () => {
    
    beforeAll(async () => {
      await prisma.aandeel.createMany({ data: data.aandelen });  
    });

    afterAll(async () => {
      await prisma.aandeel.deleteMany({
        where: { id: { in: dataToDelete.aandelen } },
      });
    });
    
    it('should 200 and return all transactions', async () => {
      const response = await request.get(url).set('Authorization', authHeader);
      expect(response.status).toBe(200);
      expect(response.body.items.length).toBe(initialCount + data.aandelen.length);
      expect(response.body.items).toEqual(
        expect.arrayContaining([
          {
            'id': 4,
            'isin': 'IE00BD8PGZ49',
            'afkorting': 'IUSV',
            'uitgever': 'iShares',
            'kosten': 0.10,
            'type': 'Verspreiden',
            'rating': 0,
            'sustainability': 3,
          },
          {
            'id': 5,
            'isin': 'LU1781541179',
            'afkorting': 'LCWD',
            'uitgever': 'Amundi',
            'kosten': 0.12,
            'type': 'Accumulatie',
            'rating': 4,
            'sustainability': 3,
          },
          {
            'id': 6,
            'isin': 'IE00B2NPKV68',
            'afkorting': 'SEMB',
            'uitgever': 'iShares',
            'kosten': 0.45,
            'type': 'Verspreiden',
            'rating': 4,
            'sustainability': 3,
          },
        ]),
      );
    });
    testAuthHeader(() => request.get(url));
  });

  describe('POST /api/aandelen', () => {
    const aandeelToDelete: number[] = [];
  
    afterAll(async () => {
      await prisma.aandeel.deleteMany({
        where: { id: { in: aandeelToDelete } },
      });
    });

    it('should 201 and return the created aandeel', async () => {
      const response = await request.post(url).set('Authorization', authHeader).send({
        'isin': 'IE00B5BMR105',
        'afkorting': 'AMFE',
        'uitgever': 'iShares',
        'kosten': 0.15,
        'type': 'Accumulatie',
        'rating': 1,
        'sustainability': 1,
      });
    
      expect(response.status).toBe(201);
      expect(response.body.id).toBeTruthy();
      expect(response.body.isin).toBe('IE00B5BMR105');
      expect(response.body.afkorting).toBe('AMFE');
      expect(response.body.uitgever).toBe('iShares');
      expect(response.body.kosten).toBe(0.15);
      expect(response.body.type).toBe('Accumulatie');
      expect(response.body.rating).toBe(1);
      expect(response.body.sustainability).toBe(1);
    
      aandeelToDelete.push(response.body.id);
    });
  });

  describe('PUT /api/aandelen/:id', () => {
    beforeAll(async () => {
      await prisma.aandeel.createMany({data: data.aandelen});
    });

    afterAll(async () => {
      await prisma.aandeel.deleteMany({
        where: {id: { in: dataToDelete.aandelen}},
      });
    });

    it('should 200 and return the updated aandeel', async () => {
      const response = await request.put(`${url}/4`).set('Authorization', authHeader)
        .send({
          'isin': 'IE00B5BMR090',
          'afkorting': 'AMFE',
          'uitgever': 'iShares',
          'kosten': 0.15,
          'type': 'Accumulatie',
          'rating': 1,
          'sustainability': 1,
        });

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(4);
      expect(response.body.isin).toBe('IE00B5BMR090');
      expect(response.body.afkorting).toBe('AMFE');
      expect(response.body.uitgever).toBe('iShares');
      expect(response.body.kosten).toBe(0.15);
      expect(response.body.type).toBe('Accumulatie');
      expect(response.body.rating).toBe(1);
      expect(response.body.sustainability).toBe(1);
    });
  });

  describe('DELETE /api/aandelen/:id', () => {
    beforeAll(async () => {
      await prisma.aandeel.createMany({data: data.aandelen});
    });

    afterAll(async () => {
      await prisma.aandeel.deleteMany({
        where: {id: { in: dataToDelete.aandelen}},
      });
    });

    it('should 204 and return nothing', async () => {
      const response = await request.delete(`${url}/4`).set('Authorization', authHeader);
      expect(response.statusCode).toBe(204);
      expect(response.body).toEqual({});
    });
  });

  describe('GET /api/aandelen/:id', () => {
    beforeAll(async () => {
      await prisma.aandeel.createMany({data: data.aandelen});
    });

    afterAll(async () => {
      await prisma.aandeel.deleteMany({
        where: {id: { in: dataToDelete.aandelen}},
      });
    });

    it('should 200 and return aandeel with id', async () => {
      const response = await request.get(`${url}/4`).set('Authorization', authHeader);
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(4);
      expect(response.body.isin).toBe('IE00BD8PGZ49');
      expect(response.body.afkorting).toBe('IUSV');
      expect(response.body.uitgever).toBe('iShares');
      expect(response.body.kosten).toBe(0.10);
      expect(response.body.type).toBe('Verspreiden');
      expect(response.body.rating).toBe(0);
      expect(response.body.sustainability).toBe(3);
    });
  });
});
