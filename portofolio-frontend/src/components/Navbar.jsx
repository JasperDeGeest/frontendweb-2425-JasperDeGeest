// src/components/Navbar.jsx
import { NavLink, Link } from 'react-router-dom';
//import { useContext } from 'react'; // 👈 1
//import { ThemeContext } from '../contexts/Theme.context'; // 👈 1
import { useTheme } from '../contexts/theme'; // 👈 1
import { IoMoonSharp, IoSunny } from 'react-icons/io5'; // 👈 4
import { useAuth } from '../contexts/auth'; // 👈 2

export default function Navbar() {
  const { theme, toggleTheme } = useTheme(); // 👈 2
  const { isAuthed } = useAuth(); // 👈 1

  return (
    <nav className={`navbar fixed-top bg-${theme} text-bg-${theme} mb-4`}>
      <div className='container-fluid flex-column flex-sm-row align-items-start align-items-sm-center'>
        <div className='nav-item my-2 mx-sm-3 my-sm-0'>
          <NavLink className='nav-link' to='/aandelen'>
            Aandelen
          </NavLink>
        </div>
        <div className='nav-item my-2 mx-sm-3 my-sm-0'>
          <NavLink end className='nav-link' to='/accounts'>
            Accounts
          </NavLink>
        </div>
        <div className='nav-item my-2 mx-sm-3 my-sm-0'>
          <NavLink className='nav-link' to='/accounts/me/aandelen'>
            AccountAandelen
          </NavLink>
        </div>
        <div className='nav-item my-2 mx-sm-3 my-sm-0'>
          <NavLink className='nav-link' to='/about'>
            About us
          </NavLink>
        </div>
        <div className='flex-grow-1'></div>
        {
          // 👇 2
          isAuthed ? (
            // 👇 3
            <div className='nav-item my-2 mx-sm-3 my-sm-0'>
              <Link className='nav-link' to='/logout'>
                Logout
              </Link>
            </div>
          ) : (
            // 👇 4
            <div className='nav-item my-2 mx-sm-3 my-sm-0'>
              <Link className='nav-link' to='/login'>
                Login
              </Link>
            </div>
          )
        }
        <button
          className='btn btn-secondary'
          type='button'
          onClick={toggleTheme}
        >
          {theme === toggleTheme ? <IoMoonSharp /> : <IoSunny />}
        </button>
      </div>
    </nav>
  );
}
