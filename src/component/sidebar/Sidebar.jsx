import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import {
  FaHome,
  FaListAlt,
  FaHeart,
  FaStopwatch,
  FaHistory,
} from 'react-icons/fa';

export const Sidebar = () => {
  return (
    <aside className='drawer'>
      <div className='drawer-nav'>
        <nav className='drawer-list'>
          <NavLink
            title='Home'
            to={'/'}
            className={({ isActive }) =>
              isActive ? 'nav-item active' : 'nav-item'
            }
          >
            <FaHome />
            <span className='title'>Home</span>
          </NavLink>
          <NavLink
            title='Playlists'
            to={'/playlists'}
            className={({ isActive }) =>
              isActive ? 'nav-item active' : 'nav-item'
            }
          >
            <FaListAlt />
            <span className='title'>Playlists</span>
          </NavLink>
          <NavLink
            title='Liked'
            to={'/liked'}
            className={({ isActive }) =>
              isActive ? 'nav-item active' : 'nav-item'
            }
          >
            <FaHeart />
            <span className='title'>Liked</span>
          </NavLink>
          <NavLink
            to={'/watchLater'}
            className={({ isActive }) =>
              isActive ? 'nav-item active' : 'nav-item'
            }
          >
            <FaStopwatch />
            <span className='title'>Watch Later</span>
          </NavLink>
          <NavLink
            title='History'
            to={'/history'}
            className={({ isActive }) =>
              isActive ? 'nav-item active' : 'nav-item'
            }
          >
            <FaHistory />
            <span className='title'>History</span>
          </NavLink>
        </nav>
      </div>
    </aside>
  );
};
