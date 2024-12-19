import { Heading, Text, List, ListItem, Link, VStack, Container, Button, Divider } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const About = () => (
  <Container maxW="container.md" p={6}>
    <VStack spacing={6} align="flex-start">
      <Heading as="h1" size="2xl" color="teal.600">Over ons</Heading>
      <Text fontSize="lg" color="gray.700">
        Welkom op onze website! Wij zijn een gepassioneerd team van creatieve professionals die 
        geloven in de kracht van design, innovatie en samenwerking. Met jarenlange ervaring en 
        een frisse blik brengen we ideeën tot leven en zorgen we ervoor dat jouw project een 
        blijvende indruk achterlaat.
      </Text>

      <Heading as="h2" size="lg" color="teal.600">Onze Missie</Heading>
      <Text fontSize="lg" color="gray.700">
        Wij streven ernaar om unieke en op maat gemaakte oplossingen te bieden die niet 
        alleen visueel aantrekkelijk zijn, maar ook functioneel en impactvol. Of het nu 
        gaat om webdesign, grafische vormgeving, fotografie of branding, wij geloven dat 
        elk project een verhaal vertelt – en wij helpen dat verhaal te delen.
      </Text>

      <Heading as="h2" size="lg" color="teal.600">Waarom kiezen voor ons?</Heading>
      <List spacing={3}>
        <ListItem>
          <Text fontSize="md" fontWeight="bold" color="gray.800">Creativiteit:</Text>
          <Text fontSize="md" color="gray.700">We combineren artistieke flair met strategisch inzicht 
            om jouw visie werkelijkheid te maken.</Text>
        </ListItem>
        <ListItem>
          <Text fontSize="md" fontWeight="bold" color="gray.800">Persoonlijke aanpak:</Text>
          <Text fontSize="md" color="gray.700">Jouw ideeën staan centraal. We luisteren, 
            denken mee en werken nauw met je samen.</Text>
        </ListItem>
        <ListItem>
          <Text fontSize="md" fontWeight="bold" color="gray.800">Kwaliteit:</Text>
          <Text fontSize="md" color="gray.700">Elk detail telt. We streven 
            naar perfectie in elk aspect van ons werk.</Text>
        </ListItem>
      </List>

      <Heading as="h2" size="lg" color="teal.600">Wie zijn wij?</Heading>
      <Text fontSize="lg" color="gray.700">
        Ik ben Jasper, gedreven door nieuwsgierigheid en enthousiasme. 
        Of je nu een nieuwe website nodig hebt, een sterk visueel merk wilt neerzetten of een ander 
        creatief project voor ogen hebt – wij zijn er om het mogelijk te maken.
      </Text>

      <List spacing={3}>
        <ListItem>
          <Link as={RouterLink} to="#services" color="teal.500" fontSize="lg" fontWeight="bold">
            Onze diensten
          </Link>
        </ListItem>
        <ListItem>
          <Link as={RouterLink} to="#history" color="teal.500" fontSize="lg" fontWeight="bold">
            Geschiedenis
          </Link>
        </ListItem>
        <ListItem>
          <Link as={RouterLink} to="#location" color="teal.500" fontSize="lg" fontWeight="bold">
            Locatie
          </Link>
        </ListItem>
      </List>

      <Button as={RouterLink} to="/contact" colorScheme="teal" size="lg" mt={6}>
        Neem contact met ons op
      </Button>
    </VStack>

    <Divider my={6} />

    <VStack spacing={6} align="flex-start" id="services">
      <Heading as="h2" size="xl" color="teal.600">Onze diensten</Heading>
      <Text fontSize="lg" color="gray.700">
        Wij bieden een breed scala aan diensten om jouw ideeën tot leven te brengen. 
        Of het nu gaat om design, strategie of branding, wij hebben de expertise om 
        jouw project naar een hoger niveau te tillen.
      </Text>
      <List spacing={6}>
        <ListItem>
          <Heading as="h3" size="md" color="teal.500">Webdesign</Heading>
          <Text fontSize="md" color="gray.700">Wij ontwerpen en ontwikkelen moderne, responsieve websites die 
            perfect aansluiten bij jouw merk en doelgroep.</Text>
        </ListItem>
        <ListItem>
          <Heading as="h3" size="md" color="teal.500">Branding</Heading>
          <Text fontSize="md" color="gray.700">Wij helpen je bij het creëren van een sterk
            en herkenbaar merk dat jouw visie en waarden weerspiegelt.</Text>
        </ListItem>
        <ListItem>
          <Heading as="h3" size="md" color="teal.500">Fotografie</Heading>
          <Text fontSize="md" color="gray.700">Professionele fotografie om jouw producten, evenementen of 
            merkverhaal op de best mogelijke manier vast te leggen.</Text>
        </ListItem>
        <ListItem>
          <Heading as="h3" size="md" color="teal.500">Marketingstrategie</Heading>
          <Text fontSize="md" color="gray.700">Op maat gemaakte marketingstrategieën 
            om jouw bedrijf zichtbaar te maken en je doelen te bereiken.</Text>
        </ListItem>
      </List>
    </VStack>

    <Divider my={6} />

    <VStack spacing={6} align="flex-start" id="history">
      <Heading as="h2" size="xl" color="teal.600">Geschiedenis</Heading>
      <Text fontSize="lg" color="gray.700">
        Onze reis begon met een simpele ambitie: het leveren van creatieve 
        en op maat gemaakte oplossingen die een verschil maken. 
        Door de jaren heen hebben we ons ontwikkeld tot een team van 
        gedreven professionals, altijd gericht op innovatie en kwaliteit.
      </Text>
      <Text fontSize="lg" color="gray.700">
        Wat begon als een klein initiatief, groeide al snel uit 
        tot een volwaardig bureau dat klanten helpt hun visie 
        werkelijkheid te maken. Van onze eerste projecten tot de samenwerkingen
        met gerenommeerde merken, elke stap in onze geschiedenis heeft ons gevormd tot wie we vandaag zijn.
      </Text>
      <Text fontSize="lg" color="gray.700">
        Met trots kijken we terug op ons verleden en zien we hoe onze passie 
        en toewijding hebben geleid tot duurzame relaties met onze klanten. 
        Maar we kijken ook vooruit naar de toekomst, vol nieuwe kansen en uitdagingen.
      </Text>
    </VStack>

    <Divider my={6} />

    <VStack spacing={6} align="flex-start" id="location">
      <Heading as="h2" size="xl" color="teal.600">Locatie</Heading>
      <Text fontSize="lg" color="gray.700">
        Ons kantoor is gevestigd op de campus Schoonmeersen van HOGENT, 
        een centrale locatie in Gent die gemakkelijk bereikbaar is voor onze klanten en partners.
      </Text>
      <Text fontSize="lg" color="gray.700">
        Adres:<br />
        Valentin Vaerwyckweg 1<br />
        9000 Gent<br />
        België
      </Text>

      <iframe
        src="https://www.google.com/maps/embed?pb=..."
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        title="HOGENT Campus Schoonmeersen"
      />
      <Text fontSize="lg" color="gray.700">
        Of je nu langskomt voor een afspraak of gewoon even wilt kennismaken, 
        je bent altijd welkom bij ons op kantoor. Neem contact met ons op om een bezoek te plannen!
      </Text>

      <Button colorScheme="teal" 
        size="lg" as="a" href="https://www.google.com/maps?q=Valentin+Vaerwyckweg+1,+9000+Gent" target="_blank">
        Bekijk op Google Maps
      </Button>
    </VStack>
  </Container>
);

export default About;

export const Services = () => (
  <div id="services">
    <h1>Onze diensten</h1>
    <p>
      Wij bieden een breed scala aan diensten om jouw ideeën tot leven te brengen. 
      Of het nu gaat om design, strategie of branding, wij hebben de expertise om 
      jouw project naar een hoger niveau te tillen.
    </p>
    <ul>
      <li>
        <h3>Webdesign</h3>
        <p>Wij ontwerpen en ontwikkelen moderne, responsieve websites 
          die perfect aansluiten bij jouw merk en doelgroep.</p>
      </li>
      <li>
        <h3>Branding</h3>
        <p>Wij helpen je bij het creëren van een sterk en herkenbaar merk dat jouw visie en waarden weerspiegelt.</p>
      </li>
      <li>
        <h3>Fotografie</h3>
        <p>Professionele fotografie om jouw producten, evenementen of 
          merkverhaal op de best mogelijke manier vast te leggen.</p>
      </li>
      <li>
        <h3>Marketingstrategie</h3>
        <p>Op maat gemaakte marketingstrategieën om jouw bedrijf zichtbaar te maken en je doelen te bereiken.</p>
      </li>
    </ul>
  </div>
);

export const History = () => (
  <div id="history">
    <h1>Geschiedenis</h1>
    <p>
      Onze reis begon met een simpele ambitie: het leveren van 
      creatieve en op maat gemaakte oplossingen die een verschil maken. 
      Door de jaren heen hebben we ons ontwikkeld tot een team van 
      gedreven professionals, altijd gericht op innovatie en kwaliteit.
    </p>
  </div>
);

export const Location = () => (
  <div id="location">
    <h1>Locatie</h1>
    <p>Ons kantoor is gevestigd op de campus Schoonmeersen van HOGENT, 
      een centrale locatie in Gent die gemakkelijk bereikbaar is voor onze klanten en partners.</p>
  </div>
);

