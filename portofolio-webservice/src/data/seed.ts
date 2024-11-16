import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed aandelen
  // ===========
  await prisma.aandeel.createMany({
    data: [
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
  });

  // Seed adresses
  // =================
  await prisma.adres.createMany({
    data: [
      // Account Thomas
      // ===========
      {
        id: 1,
        straat: 'Plezanstraat',
        huisNummer: '3',
        stad: 'Gent',
        land: 'België',
      },
      // Account Jonas
      // ===========
      {
        id: 2,
        straat: 'Groenlaan',
        huisNummer: '95',
        stad: 'Antwerpen',
        land: 'België',
      },
      // Account Tom
      // ===========
      {
        id: 3,
        straat: 'Koekendreef',
        huisNummer: '105',
        stad: 'Hasselt',
        land: 'België', 
      },
    ],
  });

  // Seed accounts
  // ==========
  await prisma.account.createMany({
    data: [
      {
        id: 1,
        email: 'test@test1.com',
        hashedPassword: 'fjqlsdfm',
        onbelegdVermogen: 250,
        rijksregisterNummer: 123456789,
        voornaam: 'Thomas',
        achternaam: 'De Muur',
        adresId: 1,
      },
      {
        id: 2,
        email: 'test@test2.com',
        hashedPassword: 'qdfsfqsd',
        onbelegdVermogen: 300,
        rijksregisterNummer: 95514614,
        voornaam: 'Jonas',
        achternaam: 'De Bruin',
        adresId: 2,
      },
      {
        id: 3,
        email: 'test@test3.com',
        hashedPassword: 'erztaatr',
        onbelegdVermogen: 8960,
        rijksregisterNummer: 74844646,
        voornaam: 'Tom',
        achternaam: 'De Man',
        adresId: 3,
      },
    ],
  });

  // Seed accountAandeel
  // =================
  await prisma.accountAandeel.createMany({
    data: [
      // Account Thomas
      // ===========
      {
        accountId: 1,
        aandeelId: 1,
        aantal: 5,
        aankoopPrijs: 20,
        reden: 'ik denk dat dit goed is.',
        geschatteDuur: '5 jaar',
      },
      // Account Thomas
      // ===========
      {
        accountId: 1,
        aandeelId: 2,
        aantal: 2,
        aankoopPrijs: 150,
        reden: 'ik wil het lang bijhouden.',
        geschatteDuur: '40 jaar',
      },
      // Account Jonas
      // ===========
      {
        accountId: 2,
        aandeelId: 3,
        aantal: 1,
        aankoopPrijs: 3500,
        reden: 'goede investering.',
        geschatteDuur: '25 jaar',
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
