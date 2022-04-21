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
import { RedirectAuth, RequiresAuth } from './router';

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
            <Route path='/watch/:id' element={<Watch />} />

            <Route
              path='/login'
              element={
                <RedirectAuth>
                  <Login />
                </RedirectAuth>
              }
            />
            <Route
              path='/signup'
              element={
                <RedirectAuth>
                  <Signup />
                </RedirectAuth>
              }
            />

            <Route
              path='/history'
              element={
                <RequiresAuth>
                  <History />
                </RequiresAuth>
              }
            />
            <Route
              path='/liked'
              element={
                <RequiresAuth>
                  <Liked />
                </RequiresAuth>
              }
            />
            <Route
              path='/playlists'
              element={
                <RequiresAuth>
                  <Playlists />
                </RequiresAuth>
              }
            />
            <Route
              path='/watchLater'
              element={
                <RequiresAuth>
                  <WatchLater />
                </RequiresAuth>
              }
            />
          </Routes>
        </section>
      </main>
    </>
  );
}

export default App;
