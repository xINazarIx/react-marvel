import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import ComicsPage from './pages/ComicsPage';
import MainPage from './pages/MainPage';
import Page404 from './pages/404';
import SingleComicPage from './pages/SingleComicPage';
import CharPage from './pages/SingleCharPage';


import decoration from '../../resources/img/vision.png';

const App = () => {

  return (
    <BrowserRouter>
      <div className="app">
        <AppHeader />

        <main>
          <Routes>
            <Route path="/" element={<MainPage/>} />
            <Route path="/comics" element={<ComicsPage/>} />
            <Route path="/comics/:comicId" element={<SingleComicPage />}/>
            <Route path="/:charId" element={<CharPage />}/>
            <Route path="*" element={<Page404 />}/>
          </Routes>

          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
