import { Routes, Route } from 'react-router-dom';
import { Navbar, Sidebar } from './component';
import {
  Error404,
  History,
  Home,
  Liked,
  Login,
  Playlists,
  SearchResults,
  Signup,
  SinglePlaylist,
  Watch,
  WatchLater,
} from './pages';
import { RedirectAuth, RequiresAuth } from './router';

function App() {
  return (
    <>
      <Navbar />
      <main className='container'>
        <Sidebar />
        <section className='pos-relative'>
          <Routes>
            <Route path='*' element={<Error404 />} />
            <Route path='/' element={<Home />} />
            <Route path='/watch/:id' element={<Watch />} />
            <Route path='/results' element={<SearchResults />} />

            <Route element={<RedirectAuth />}>
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
            </Route>

            <Route element={<RequiresAuth />}>
              <Route path='/history' element={<History />} />
              <Route path='/liked' element={<Liked />} />
              <Route path='/playlists' element={<Playlists />} />
              <Route path='/playlists/:id' element={<SinglePlaylist />} />
              <Route path='/watchLater' element={<WatchLater />} />
            </Route>
          </Routes>
        </section>
      </main>
    </>
  );
}

export default App;
