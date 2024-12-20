// __tests__/helpers/withServer.ts
import supertest from 'supertest'; // 👈 1
import type { Server } from '../../src/createServer'; // 👈 2
import createServer from '../../src/createServer'; // 👈 3
import { prisma } from '../../src/data'; // 👈 4
import { hashPassword } from '../../src/core/password'; // 👈 4
import Role from '../../src/core/roles'; // 👈 4

// 👇 1
export default function withServer(setter: (s: supertest.Agent) => void): void {
  let server: Server; // 👈 2

  beforeAll(async () => {
    server = await createServer(); // 👈 3

    // 👇 4
    const passwordHash = await hashPassword('12345678');
    await prisma.adres.createMany({
      data: [
        {
          id: 1,
          straat: 'Straat1',
          huisNummer: '1',
          stad: 'Stad1',
          land: 'Land1',
        },
        {
          id: 2,
          straat: 'Straat2',
          huisNummer: '2',
          stad: 'Stad2',
          land: 'Land2',
        },
      ],
    });
    await prisma.account.createMany({
      data: [
        {
          id: 1,
          voornaam: 'Test',
          achternaam: 'User',
          email: 'test.user@hogent.be',
          hashedPassword: passwordHash,
          onbelegdVermogen: 250,
          rijksregisterNummer: '12345678911',
          adresId: 1,
          roles: JSON.stringify([Role.USER]),
        },
        {
          id: 2,
          voornaam: 'Admin',
          achternaam: 'User',
          email: 'admin.user@hogent.be',
          hashedPassword: passwordHash,
          onbelegdVermogen: 250,
          rijksregisterNummer: '12345678912',
          adresId: 2,
          roles: JSON.stringify([Role.ADMIN, Role.USER]),
        },
      ],
    });

    // 👇 5
    setter(supertest(server.getApp().callback()));
  });

  afterAll(async () => {
    // 👇 6
    await prisma.accountAandeel.deleteMany();
    await prisma.aandeel.deleteMany();
    await prisma.account.deleteMany();
    await prisma.adres.deleteMany();

    // 👇 7
    await server.stop();
  });
}
