# Dossier

> Duid aan welke vakken je volgt en vermeld voor deze vakken de link naar jouw GitHub repository. In het geval je slechts één vak volgt, verwijder alle inhoud omtrent het andere vak uit dit document.
> Lees <https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet> om te weten hoe een Markdown-bestand opgemaakt moet worden.
> Verwijder alle instructies (lijnen die starten met >).

- Student: Jasper De Geest
- Studentennummer: 202396545
- E-mailadres: <mailto:jasper.degeest@student.hogent.be>
- Demo: <DEMO_LINK_HIER>
- GitHub-repository: <https://github.com/HOGENT-frontendweb/frontendweb-2425-JasperDeGeest>
- Front-end Web Development
  - Online versie: <https://frontendweb-2425-jasperdegeest-frontend.onrender.com>
- Web Services:
  - Online versie: <https://frontendweb-2425-jasperdegeest.onrender.com>

## Logingegevens

### Lokaal

- Gebruikersnaam/e-mailadres: thomas.aelbrecht@hogent.be
- Wachtwoord: 12345678
- Rollen: admin, user

- Gebruikersnaam/e-mailadres: pieter.vanderhelst@hogent.be
- Wachtwoord: 12345678
- Rollen: user

- Gebruikersnaam/e-mailadres: karine.samyn@hogent.be
- Wachtwoord: 12345678
- Rollen: user

### Online

- Gebruikersnaam/e-mailadres: thomas.aelbrecht@hogent.be
- Wachtwoord: 12345678
- Rollen: admin, user

- Gebruikersnaam/e-mailadres: pieter.vanderhelst@hogent.be
- Wachtwoord: 12345678
- Rollen: user

- Gebruikersnaam/e-mailadres: karine.samyn@hogent.be
- Wachtwoord: 12345678
- Rollen: user

> Vul eventueel aan met extra accounts voor administrators of andere rollen.

## Projectbeschrijving

> Omschrijf hier duidelijk waarover jouw project gaat. Voeg een domeinmodel (of EERD) toe om jouw entiteiten te verduidelijken.

In mijn project kan een gebruiker een account aanmaken, hiermeer inloggen en hiermee kan die aandelen toevoegen aan zijn account die die in bezit heeft. Hierdoor kan die een beter overzicht krijgen in welke aandelen er in die zijn bezit zijn, en enkele data zoals waarom, hoelang, hoeveel en welke prijs zien. De gebruiker kan aandelen toevoegen vanuit een lijst die wordt beheerd door de admins (gewone gebruikers kunnen die niet wijzigen). De gebruiker heeft ook een venster waar die zijn account gegevens en adres kan wijzigen

[Adres]
*id
straat
huisNummer
stad
land

[Account]
*id
email
hashedPassword
onbelegdVermogen
rijksregisterNummer
voornaam
achternaam
+adresId

[AccountAandeel]
*+accountId
*+aandeelId
aantal
aakoopPrijs
reden
geschatteDuur

[Aandeel]
*id
ISIN
afkorting
uitgever
kosten
type
rating
sustainability

Adres 1--1 Account
Account 1--* AccountAandeel
Aandeel 1--* AccountAandeel

## Screenshots

> Voeg enkele (nuttige!) screenshots toe die tonen wat de app doet.
> Dit is weinig zinvol indien je enkel Web Services volgt, verwijder dan deze sectie.

### De gebruiker kan inloggen
![inlogScherm](image.png)

### De lijst met aandelen die beheerd worden door de administratoren, zo zie je de edit, delete en add (+) knoppen die enkel zichtbaar en bruikbaar zijn voor admins.
![aandelenLijstAdminScherm](image-1.png)

### dit is hetzelfde scherm maar voor gewone users
![aandelenLijstUserScherm](image-2.png)

### hier kan de gebruiker zijn gegevens wijzigen
![editAccountScherm](image-3.png)

### hier ziet de gebruiker zijn opgeslagen aandelen (deze gebruiker heeft er geen)
![accountAandelenLijstSchermLeeg](image-4.png)

### hetzelfde scherm maar met aandelen
![accountAandelenLijstSchermGevuld](image-5.png)

### admin scherm voor aandeel toe te voegen
![AdminAddAandeelScherm](image-6.png)

### admin scherm voor aandeel aan te passen
![AdminEditAandeelScherm](image-7.png)

### scherm waar een gebruiken aandelen kan kiezen uit een lijst van beschikbare aandelen en data kan invullen om deze op te slaan
![AddAccountAandeelScherm](image-8.png)

### zelfde scherm maar voor aan te passen
![EditAccountAandeelScherm](image-9.png)

## API calls

> Maak hier een oplijsting van alle API cals in jouw applicatie. Groepeer dit per entiteit. Hieronder een voorbeeld.
> Dit is weinig zinvol indien je enkel Front-end Web Development volgt, verwijder dan deze sectie.
> Indien je als extra Swagger koos, dan voeg je hier een link toe naar jouw online documentatie. Swagger geeft nl. exact (en nog veel meer) wat je hieronder moet schrijven.

### Accounts

- `GET /api/accounts/:id`: een gebruiker moet zijn eigen account incl. adres kunnen zien
- `PUT /api/accounts/:id` een gebruiker moet zijn eigen account en adress kunnen aanpassen
- `POST /api/accounts` een gebruiker moet een account kunnen maken
- `GET /api/accounts` een admin moet alle account kunnen ophalen
- `GET /api/accounts/:id/aandelen` een gebruiker moet al zijn opgeslagen aandelen kunnen zien
- `PUT /api/accounts/:id/aandelen/:aandeelId` een gebruiker moet een opgeslagen aandeel kunnen wijzigen
- `GET /api/accounts/:id/aandelen/:aandeelId` een gebruiker moet gegevens van een opgeslagen aandeel kunnen zien
- `POST /api/accounts/:id/aandelen` een gebruiker moet een opgeslagen aandeel kunnen toevoegen
- `DELETE /api/accounts/:id/aandelen/:aandeelId` een gebruiker moet een opgeslagen aandeel kunnen verwijderen

### Aandelen

- `GET /api/aandelen`: alle aandelen ophalen
- `GET /api/aandelen/:id`: aandeel met bepaald id ophalen
- `PUT /api/aandelen/:id`: aandeel met bepaald id aanpassen
- `DELETE /api/aandelen/:id`: aandeel met bepaald id verwijderen
- `POST /api/aandelen`  een aandeel toevoegen

## Behaalde minimumvereisten

> Duid per vak aan welke minimumvereisten je denkt behaald te hebben

### Front-end Web Development

#### Componenten

- [x] heeft meerdere componenten - dom & slim (naast login/register)
- [x] applicatie is voldoende complex
- [x] definieert constanten (variabelen, functies en componenten) buiten de component
- [x] minstens één form met meerdere velden met validatie (naast login/register)
- [x] login systeem

#### Routing

- [x] heeft minstens 2 pagina's (naast login/register)
- [x] routes worden afgeschermd met authenticatie en autorisatie

#### State management

- [x] meerdere API calls (naast login/register)
- [x] degelijke foutmeldingen indien API-call faalt
- [x] gebruikt useState enkel voor lokale state
- [x] gebruikt gepast state management voor globale state - indien van toepassing

#### Hooks

- [x] gebruikt de hooks op de juiste manier

#### Algemeen

- [x] een aantal niet-triviale én werkende e2e testen
- [x] minstens één extra technologie
- [x] node_modules, .env, productiecredentials... werden niet gepushed op GitHub
- [x] maakt gebruik van de laatste ES-features (async/await, object destructuring, spread operator...)
- [x] de applicatie start zonder problemen op gebruikmakend van de instructies in de README
- [x] de applicatie draait online
- [x] duidelijke en volledige README.md
- [x] er werden voldoende (kleine) commits gemaakt
- [x] volledig en tijdig ingediend dossier

### Web Services

#### Datalaag

- [x] voldoende complex en correct (meer dan één tabel (naast de user tabel), tabellen bevatten meerdere kolommen, 2 een-op-veel of veel-op-veel relaties)
- [x] één module beheert de connectie + connectie wordt gesloten bij sluiten server
- [x] heeft migraties - indien van toepassing
- [x] heeft seeds

#### Repositorylaag

- [x] definieert één repository per entiteit - indien van toepassing
- [x] mapt OO-rijke data naar relationele tabellen en vice versa - indien van toepassing
- [x] er worden kindrelaties opgevraagd (m.b.v. JOINs) - indien van toepassing

#### Servicelaag met een zekere complexiteit

- [x] bevat alle domeinlogica
- [x] er wordt gerelateerde data uit meerdere tabellen opgevraagd
- [x] bevat geen services voor entiteiten die geen zin hebben zonder hun ouder (bv. tussentabellen)
- [x] bevat geen SQL-queries of databank-gerelateerde code

#### REST-laag

- [x] meerdere routes met invoervalidatie
- [x] meerdere entiteiten met alle CRUD-operaties
- [x] degelijke foutboodschappen
- [x] volgt de conventies van een RESTful API
- [x] bevat geen domeinlogica
- [x] geen API calls voor entiteiten die geen zin hebben zonder hun ouder (bv. tussentabellen)
- [x] degelijke autorisatie/authenticatie op alle routes

#### Algemeen

- [x] er is een minimum aan logging en configuratie voorzien
- [x] een aantal niet-triviale én werkende integratietesten (min. 1 entiteit in REST-laag >= 90% coverage, naast de user testen)
- [x] node_modules, .env, productiecredentials... werden niet gepushed op GitHub
- [x] minstens één extra technologie die we niet gezien hebben in de les
- [x] maakt gebruik van de laatste ES-features (async/await, object destructuring, spread operator...)
- [x] de applicatie start zonder problemen op gebruikmakend van de instructies in de README
- [x] de API draait online
- [x] duidelijke en volledige README.md
- [x] er werden voldoende (kleine) commits gemaakt
- [x] volledig en tijdig ingediend dossier

## Projectstructuur

### Front-end Web Development

> Hoe heb je jouw applicatie gestructureerd (mappen, design patterns, hiërarchie van componenten, state...)?

Mappenstructuur
api/: Bevat de API-aanroepen en mock data.
components/: Bevat herbruikbare componenten zoals formulieren, knoppen, en tabellen.
aandelen/: Componenten gerelateerd aan aandelen.
accountAandeel/: Componenten gerelateerd aan account aandelen.
accounts/: Componenten gerelateerd aan accounts.
contexts/: Bevat contexten voor state management zoals authenticatie en thema.
pages/: Bevat de verschillende pagina's van de applicatie.
assets/: Bevat statische bestanden zoals afbeeldingen en stijlen.
cypress/: Bevat end-to-end tests.

```plaintext
portfolio-frontend/
├── .env
├── .gitignore
├── .yarnrc.yml
├── cypress/
│   ├── e2e/
│   ├── fixtures/
│   └── support/
├── cypress.config.js
├── eslint.config.js
├── index.html
├── package.json
├── public/
├── README.md
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   │   ├── aandelen/
│   │   │   ├── Aandeel.jsx
│   │   │   ├── AandeelForm.jsx
│   │   │   ├── AandeelList.jsx
│   │   │   ├── AandelenTable.jsx
│   │   │   └── Aandeel.module.css
│   │   ├── accountAandeel/
│   │   │   ├── AccountAandeel.jsx
│   │   │   ├── AccountAandeelForm.jsx
│   │   │   ├── AccountAandeelList.jsx
│   │   │   └── AccountAandeel.module.css
│   │   ├── accounts/
│   │   │   ├── AccountForm.jsx
│   │   │   ├── AccountList.jsx
│   │   │   └── Account.module.css
│   │   ├── AsyncData.jsx
│   │   ├── AsyncData.module.css
│   │   ├── Error.jsx
│   │   ├── Error.module.css
│   │   ├── LabelInput.jsx
│   │   ├── LabelInput.module.css
│   │   ├── Layout.jsx
│   │   ├── Layout.module.css
│   │   ├── Loader.jsx
│   │   ├── Loader.module.css
│   │   ├── Navbar.jsx
│   │   ├── Navbar.module.css
│   │   └── PrivateRoute.jsx
│   ├── contexts/
│   │   ├── Auth.context.jsx
│   │   ├── Theme.context.jsx
│   │   └── auth.js
│   ├── pages/
│   │   ├── about/
│   │   │   ├── About.jsx
│   │   │   ├── About.module.css
│   │   │   ├── History.jsx
│   │   │   ├── History.module.css
│   │   │   ├── Location.jsx
│   │   │   ├── Location.module.css
│   │   │   ├── Services.jsx
│   │   │   └── Services.module.css
│   │   ├── accounts/
│   │   │   ├── EditAccounts.jsx
│   │   │   └── EditAccounts.module.css
│   │   ├── aandelen/
│   │   │   ├── AddOrEditAandelen.jsx
│   │   │   └── AddOrEditAandelen.module.css
│   │   ├── accountAandelen/
│   │   │   ├── AddOrEditAccountAandelen.jsx
│   │   │   └── AddOrEditAccountAandelen.module.css
│   │   ├── Login.jsx
│   │   ├── Login.module.css
│   │   ├── Logout.jsx
│   │   ├── Logout.module.css
│   │   ├── NotFound.jsx
│   │   ├── NotFound.module.css
│   │   ├── Register.jsx
│   │   ├── Register.module.css
│   │   └── Layout.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── vite.config.js
```

Hiërarchie van Componenten
- Layout Component: De Layout component bevat de algemene structuur van de    applicatie, zoals de navigatiebalk en de hoofdinhoud.
- Page Components: Elke pagina heeft zijn eigen component in de pages map, zoals Login, Register, About, etc.
- Reusable Components: Herbruikbare componenten zoals LabelInput, NumberInput, en SelectList worden gebruikt binnen de pagina's en andere componenten.

State Management
React Hook Form: Voor formulierbeheer heb ik react-hook-form gebruikt.
Context API: Voor globale state management, zoals authenticatie en thema heb ik Context API gebruikt.
SWR: Voor data fetching en caching wordt swr gebruikt
### Web Services

> Hoe heb je jouw applicatie gestructureerd (mappen, design patterns...)?

- tests/: map voor test bestanden
  - helpers/: Bevat helperfuncties voor tests.
  - rest/: Bevat REST API gerelateerde tests.
- apidoc/: Bevat bestanden voor API-documentatie.
  - assets/: assets map automatisch aangemaakt door apidoc
  - index.html: De hoofdpagina voor de API-documentatie.
  - build/: build map van apidoc
- config/: Bevat configuratiebestanden voor verschillende omgevingen.
  - custom-environment-variables.ts: Specifieke omgevingsvariabelen.
  - development.ts: Configuratie voor de ontwikkelomgeving.
  - production.ts: Configuratie voor de productieomgeving.
  - testing.ts: Configuratie voor de testomgeving.
- coverage/: Bevat bestanden voor test:coverage
- src/: Bevat de broncode van de applicatie.
  - core/: Bevat kernfunctionaliteiten zoals servercreatie en foutafhandeling.
    - createServer.ts: Functie om de server te creëren.
  - data/: Bevat databasemodellen en -configuraties.
    - index.ts: Hoofdbestand voor dataconfiguratie.
  - rest/: Bevat REST API gerelateerde bestanden.
    - aandeel.ts: Beheer van aandelen.
    - ...
  - service/: Bevat servicelogica voor verschillende entiteiten.
    - aandeel.ts: Servicefuncties voor aandelen.
    - ...
  - types/: Bevat TypeScript types en interfaces.

```plaintext
portfolio-webservice/
├── __tests__/
│   ├── coverage/
│   │   └── clover.xml
│   ├── helpers/
│   │   └── login.ts
│   └── rest/
├── .editorconfig
├── .env
├── .env.test
├── .gitattributes
├── .gitignore
├── .yarnrc.yml
├── apidoc/
│   ├── assets/
│   └── index.html
├── build/
├── core/
│   └── index.js
├── config/
│   ├── custom-environment-variables.ts
│   ├── development.ts
│   ├── production.ts
│   └── testing.ts
├── coverage/
│   ├── clover.xml
│   ├── coverage-final.json
│   └── lcov-report/
│       └── lcov.info
├── eslint.config.mjs
├── jest.config.ts
├── package.json
├── README.md
├── src/
│   ├── core/
│   │   └── createServer.ts
│   ├── data/
│   │   └── schema.prisma
│   ├── index.ts
│   ├── rest/
│   │   ├── account.ts
│   │   └── aandeel.ts
│   ├── service/
│   └── types/
│       ├── accountAandeel.ts
│       └── aandeel.ts
├── test.log
└── tsconfig.json
```

## Extra technologie

### Front-end Web Development

> Wat is de extra technologie? Hoe werkt het? Voeg een link naar het npm package toe!

Als extra technologie heb ik chakra v2 toegevoegd. Dit is een UI-Libraby die componenten bevat die je kan gebruiken om je site mooier te maken.

hiervoor heb ik volgende packages geinstalleerd.

https://www.npmjs.com/package/@chakra-ui/react  
https://www.npmjs.com/package/@emotion/react  
https://www.npmjs.com/package/@emotion/styled  
https://www.npmjs.com/package/framer-motion  

Dit heb ik gedaan met het yarn commando: 
- yarn add @chakra-ui/react@^2 @emotion/react@^11 @emotion/styled@^11 framer-motion@^6  

na het commando moest ik enkel nog in main.jsx ChakraProvider importeren en deze wrappen.

Ik heb specifiek gekozen voor v2 omdat ik dit een duidelijkere manier vond dan v3 en deze ook word gesupport in versie 18 van react die wij gebruiken

### Web Services

> Wat is de extra technologie? Hoe werkt het? Voeg een link naar het npm package toe!

Ik heb gekozen om apidoc te gebruiken i.p.v. swagger.  
npm link: https://www.npmjs.com/package/apidoc  
Ik heb apidoc geinstalleerd met volgend commando:
- yarn add apidoc

vervolgens heb ik deze guide gebruikt: https://apidocjs.com/#getting-started  

## Gekende bugs

### Front-end Web Development

> Zijn er gekende bugs?

Er zijn geen gekende bugs meer, aangezien ik de gevonden bugs heb opgelost.

### Web Services

> Zijn er gekende bugs?

Er zijn geen gekende bugs meer, aangezien ik de gevonden bugs heb opgelost.

## Reflectie

> Wat vond je van dit project? Wat heb je geleerd? Wat zou je anders doen? Wat vond je goed? Wat vond je minder goed?

### Wat vond je van dit project?
Ik vond het zeer leerzaam, maar ook zeer tijdrovend om het deftig in orde te zetten. Ik vond het leuk maar zoeken naar die kleine domme foutjes kon me soms wel ergeren.

### Wat heb je geleerd?
Alles uit de cursussen was nieuw voor mij, ik heb dus heel veel bijgeleerd. Ik weet nu dat er eigenlijk nog een pak meer bij komt kijken bij het maken van een website dan enkel html code zoals we vorig jaar leerden.

### Wat zou je anders doen?
Uiteraard zou ik het compleet anders doen, minder zoeken hoe alles werkt aangezien ik nu wel een basis kennis heb van hoe alles werkt.

### Wat vond je goed?
Ik vond de cursussen over het algemeen zeer duidelijk. Ik had zelden momenten dat ik echt dingen moest gaan zoeken omdat ik het niet goed begreep.

### Wat vond je minder goed?
Ik vond de refactoring in de cursussen soms onduidelijk, eerst moet je iets doen op een specifieke manier om het erna terug aan te passen.
> Wat zou je aanpassen aan de cursus? Wat zou je behouden? Wat zou je toevoegen?

Ik vond het soms niet heel duidelijk over welk bestand de voorbeeld code ging (vooral in de front-end cursus). Ik denk dat de cursussen al een zeer mooie basis vormden voor de leerstof, dus vind niet dat er iets specifiek aan toegevoegd moet worden.
