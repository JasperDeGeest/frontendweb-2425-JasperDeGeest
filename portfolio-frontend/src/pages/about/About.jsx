// src/pages/about/About.jsx
import { Outlet, Link } from 'react-router-dom'; // 👈

const About = () => (
  <div className='container'>
    <h1>Over ons</h1>
    <p>
      Welkom op onze website! Wij zijn een gepassioneerd team van creatieve professionals die 
      geloven in de kracht van design, innovatie en samenwerking. Met jarenlange ervaring en 
      een frisse blik brengen we ideeën tot leven en zorgen we ervoor dat jouw project een 
      blijvende indruk achterlaat.
    </p>

    <h2>Onze Missie</h2>
    <p>
      Wij streven ernaar om unieke en op maat gemaakte oplossingen te bieden die niet 
      alleen visueel aantrekkelijk zijn, maar ook functioneel en impactvol. Of het nu 
      gaat om webdesign, grafische vormgeving, fotografie of branding, wij geloven dat 
      elk project een verhaal vertelt – en wij helpen dat verhaal te delen.
    </p>

    <h2>Waarom kiezen voor ons?</h2>
    <ul>
      <li><strong>Creativiteit:</strong> We combineren artistieke flair met strategisch inzicht 
        om jouw visie werkelijkheid te maken.</li>
      <li><strong>Persoonlijke aanpak:</strong> Jouw ideeën staan centraal. We luisteren, 
        denken mee en werken nauw met je samen.</li>
      <li><strong>Kwaliteit:</strong> Elk detail telt. We streven naar perfectie in elk aspect van ons werk.</li>
    </ul>

    <h2>Wie zijn wij?</h2>
    <p>
      Ik ben Jasper, gedreven door nieuwsgierigheid en enthousiasme. 
      Of je nu een nieuwe website nodig hebt, een sterk visueel merk wilt neerzetten of een ander 
      creatief project voor ogen hebt – wij zijn er om het mogelijk te maken.
    </p>

    <ul>
      <li>
        <Link to='/about/services'>Onze diensten</Link> {/* 👈 */}
      </li>
      <li>
        <Link to='/about/history'>Geschiedenis</Link> {/* 👈 */}
      </li>
      <li>
        <Link to='/about/location'>Locatie</Link> {/* 👈 */}
      </li>
    </ul>
    <Outlet /> {/* 👈 */}
  </div>
);

export default About;

export const Services = () => (
  <div>
    <h1>Onze diensten</h1>
    <p>
      Wij bieden een breed scala aan diensten om jouw ideeën tot leven te brengen. 
      Of het nu gaat om design, strategie of branding, wij hebben de expertise om 
      jouw project naar een hoger niveau te tillen.
    </p>
    <ul>
      <li>
        <h3>Webdesign</h3>
        <p>Wij ontwerpen en ontwikkelen moderne, responsieve websites die 
          perfect aansluiten bij jouw merk en doelgroep.</p>
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
  <div>
    <h1>Geschiedenis</h1>
    <h2>Geschiedenis</h2>
    <p>
      Onze reis begon met een simpele ambitie: het leveren van creatieve 
      en op maat gemaakte oplossingen die een verschil maken. 
      Door de jaren heen hebben we ons ontwikkeld tot een team van 
      gedreven professionals, altijd gericht op innovatie en kwaliteit.
    </p>
    <p>
      Wat begon als een klein initiatief, groeide al snel uit 
      tot een volwaardig bureau dat klanten helpt hun visie 
      werkelijkheid te maken. Van onze eerste projecten tot de samenwerkingen
      met gerenommeerde merken, elke stap in onze geschiedenis heeft ons gevormd tot wie we vandaag zijn.
    </p>
    <p>
      Met trots kijken we terug op ons verleden en zien we hoe onze passie 
      en toewijding hebben geleid tot duurzame relaties met onze klanten. 
      Maar we kijken ook vooruit naar de toekomst, vol nieuwe kansen en uitdagingen.
    </p>
  </div>
);

export const Location = () => (
  <div>
    <h1>Locatie</h1>
    <p>
      Ons kantoor is gevestigd op de campus Schoonmeersen van HOGENT, 
      een centrale locatie in Gent die gemakkelijk bereikbaar is voor onze klanten en partners.
    </p>
    <p>
      Adres:<br></br>
      Valentin Vaerwyckweg 1<br></br>
      9000 Gent<br></br>
      België
    </p>
    <iframe
      src={
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2518.432123456789!' +
        '2d3.703456789012345!3d51.0456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!' +
        '4f13.1!3m3!1m2!1s0x47c37123456789ab%3A0x1234567890abcdef!' +
        '2sHOGENT%20Campus%20Schoonmeersen!5e0!3m2!1snl!2sbe!4v1600000000000!' +
        '5m2!1snl!2sbe'
      }
      width="100%"
      height="300"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      title="HOGENT Campus Schoonmeersen"
    />
    <p>
      Of je nu langskomt voor een afspraak of gewoon even wilt kennismaken, 
      je bent altijd welkom bij ons op kantoor. Neem contact met ons op om een bezoek te plannen!
    </p>
  </div>
);
