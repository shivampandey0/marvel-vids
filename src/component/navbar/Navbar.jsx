import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context';
import './Navbar.css';
import { SearchField } from './SearchField';

export const Navbar = () => {
  const {
    authState: { token, user },
    handleLogout,
    loading,
  } = useAuth();

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleShowDropdown = () => setShowDropdown((prev) => !prev);
  const openDropdown = () => setShowDropdown(true);
  const closeDropdown = () => setShowDropdown(false);

  return (
    <header className='header'>
      <nav className='navbar' role='navigation' aria-label='navigation'>
        <div className='nav-brand'>
          <Link to={'/'} className='nav-logo'>
            MarvelVids
          </Link>
        </div>

        <SearchField />

        <div className='actions'>
          {token ? (
            <div
              className='btn btn-primary user'
              onClick={toggleShowDropdown}
              onMouseEnter={openDropdown}
              onMouseLeave={closeDropdown}
            >
              <div className='flex-row align-cntr gap-1'>
                <FaUserCircle />
                {loading && (
                  <i className='fas fa-circle-notch fa-spin'></i>
                )}{' '}
                {user?.firstname}
              </div>

              {!showDropdown ? <FiChevronDown /> : <FiChevronUp />}
              {showDropdown ? (
                <div className='dropdown'>
                  <div className='dropdown-item' onClick={handleLogout}>
                    Logout
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <Link to={'/login'} className='btn btn-primary'>
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};
