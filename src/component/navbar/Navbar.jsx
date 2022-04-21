import { Link } from 'react-router-dom';
import { useAuth } from '../../context';
import './Navbar.css';

export const Navbar = () => {
  const {
    authState: { token, user },
    handleLogout,
    loading,
  } = useAuth();

  return (
    <header className='header'>
      <nav className='navbar' role='navigation' aria-label='navigation'>
        <div className='nav-brand'>
          <Link to={'/'} className='nav-logo'>
            MarvelVids
          </Link>
        </div>

        <div className='search'>
          <i className='fa-solid fa-magnifying-glass icon' />
          <input
            className='search-field'
            type='text'
            placeholder='Search...'
            aria-label='Search Products'
          />
        </div>

        <div>
          {token ? (
            <button onClick={handleLogout} className='btn btn-primary'>
              {loading && <i className='fas fa-circle-notch fa-spin'></i>}{' '}
              {user?.firstname}
            </button>
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
