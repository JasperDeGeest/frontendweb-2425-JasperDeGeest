// src/pages/about/About.jsx
import { LoremIpsum } from 'react-lorem-ipsum';
import { Outlet, Link } from 'react-router-dom'; // 👈

const About = () => (
  <div>
    <h1>Over ons</h1>
    <div>
      <LoremIpsum p={2} />

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
    </div>
    <Outlet /> {/* 👈 */}
  </div>
);

export default About;

export const Services = () => (
  <div>
    <h1>Onze diensten</h1>
    <LoremIpsum p={2} />
  </div>
);

export const History = () => (
  <div>
    <h1>Geschiedenis</h1>
    <LoremIpsum p={2} />
  </div>
);

export const Location = () => (
  <div>
    <h1>Locatie</h1>
    <LoremIpsum p={2} />
  </div>
);
