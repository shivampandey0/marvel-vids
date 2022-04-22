import { Routes, Route } from 'react-router-dom';
import { Navbar, Sidebar } from './component';
import {
  Error,
  History,
  Home,
  Liked,
  Login,
  Playlists,
  Signup,
  Watch,
  WatchLater,
} from './pages';

function App() {
  return (
    <>
      <Navbar />
      <main className='container'>
        <Sidebar />
        <section className='pos-relative'>
          <Routes>
            <Route path='*' element={<Error />} />
            <Route path='/' element={<Home />} />
            <Route path='/history' element={<History />} />
            <Route path='/liked' element={<Liked />} />
            <Route path='/playlists' element={<Playlists />} />
            <Route path='/watch/:id' element={<Watch />} />
            <Route path='/watchLater' element={<WatchLater />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </section>
      </main>
    </>
  );
}

export default App;
