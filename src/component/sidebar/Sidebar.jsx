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
    <aside className='drawer flex-column'>
      <div className='drawer-nav'>
        <nav className='drawer-list flex-column'>
          <NavLink
            to={'/'}
            className={({ isActive }) =>
              isActive ? 'nav-item active' : 'nav-item'
            }
          >
            <FaHome />
            Home
          </NavLink>
          <NavLink
            to={'/playlists'}
            className={({ isActive }) =>
              isActive ? 'nav-item active' : 'nav-item'
            }
          >
            <FaListAlt />
            Playlists
          </NavLink>
          <NavLink
            to={'/liked'}
            className={({ isActive }) =>
              isActive ? 'nav-item active' : 'nav-item'
            }
          >
            <FaHeart />
            Liked
          </NavLink>
          <NavLink
            to={'/watchLater'}
            className={({ isActive }) =>
              isActive ? 'nav-item active' : 'nav-item'
            }
          >
            <FaStopwatch />
            Watch Later
          </NavLink>
          <NavLink
            to={'/history'}
            className={({ isActive }) =>
              isActive ? 'nav-item active' : 'nav-item'
            }
          >
            <FaHistory />
            History
          </NavLink>
        </nav>
      </div>
    </aside>
  );
};
