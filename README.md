# Examenopdracht Front-end Web Development & Web Services

> Schrap hierboven eventueel wat niet past

- Student: Jasper De Geest
- Studentennummer: 202396545
- E-mailadres: <mailto:jasper.degeest@student.hogent.be>

## Vereisten

Ik verwacht dat volgende software reeds geïnstalleerd is:

- [NodeJS](https://nodejs.org)
- [Yarn](https://yarnpkg.com)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)

> Vul eventueel aan

## Front-end

## Opstarten
> Schrijf hier hoe we de applicatie starten (.env bestanden aanmaken, commando's om uit te voeren...)
- git clone https://github.com/HOGENT-frontendweb/frontendweb-2425-JasperDeGeest.git
- cd portfolio-frontend
- Enable Corepack: corepack enable
- installeer de dependencies: yarn install
- .env bestand aanmaken in de root met volgende variabelen
```
VITE_API_URL=http://localhost:9000/api
```
- start de site: yarn dev
- de site loopt via link: http://localhost:5137

## Testen

> Schrijf hier hoe we de testen uitvoeren (.env bestanden aanmaken, commando's om uit te voeren...)
- git clone https://github.com/HOGENT-frontendweb/frontendweb-2425-JasperDeGeest.git
- cd portfolio-frontend
- Enable Corepack: corepack enable
- installeer de dependencies: yarn install
- .env bestand aanmaken in de root met volgende variabelen
```
VITE_API_URL=http://localhost:9000/api
```
- yarn test
- kies voor e2e testen in het scherm, kies je browser en druk op de start knop, de testen verschijnen in het browser venster.

## Back-end

## Opstarten
### Development
> Schrijf hier hoe we de applicatie starten (.env bestanden aanmaken, commando's om uit te voeren...)
- git clone https://github.com/HOGENT-frontendweb/frontendweb-2425-JasperDeGeest.git
- cd portfolio-webservice
- Enable Corepack: corepack enable
- Installeer alle dependencies: yarn install
- .env bestand aanmaken in de root met volgende variabelen
```
NODE_ENV=development
DATABASE_URL=mysql://<USERNAME>:<PASSWORD>@localhost:3306/<DATABASE_NAME>
AUTH_JWT_SECRET=<YOUR-JWT-SECRET>
```
- de databank opvullen: yarn prisma migrate deploy
- het project builden: yarn build
- Start the development server: yarn start:dev
## Testen

> Schrijf hier hoe we de testen uitvoeren (.env bestanden aanmaken, commando's om uit te voeren...)

- git clone https://github.com/HOGENT-frontendweb/frontendweb-2425-JasperDeGeest.git
- cd portfolio-webservice
- Enable Corepack: corepack enable
- Installeer alle dependencies: yarn install
- .env bestand aanmaken in de root met volgende variabelen
```
NODE_ENV=development
DATABASE_URL=mysql://<USERNAME>:<PASSWORD>@localhost:3306/<DATABASE_NAME>
AUTH_JWT_SECRET=<YOUR-JWT-SECRET>
```
- de databank opvullen: yarn migrate:test
- het project test: yarn test
- het project testen met coverage: yarn test:coverage
  - met behulp van __test__/coverage/Icov-report/index.html kun je in uw browser de resultaten duidelijk bekijken
