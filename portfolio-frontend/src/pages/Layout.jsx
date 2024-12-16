// src/pages/Layout.jsx
import { Outlet, ScrollRestoration } from 'react-router-dom'; // 👈
import Navbar from '../components/Navbar';
import '../App.css';

export default function Layout() {
  return (
    <div className='container-xl'>
      <Navbar />
      <Outlet />
      <ScrollRestoration /> {/* 👈 */}
    </div>
  );
}
