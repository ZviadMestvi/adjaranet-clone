import { useContext, Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  topSeriesDay,
  topSeriesWeek,
  topSeriesMonth,
  collections,
  filmsInGeorgianURL,
  seriesInGeorgianURL,
  trailers,
  moviesUrl,
  topSeries,
  seriesUrl,
} from './HelperConsts';

import Header from './components/header/Header';
import MainCarousel from './components/main carousel/MainCarousel';
import MoviesCarousel from './components/carousel/MoviesCarousel';
import CollectionsCarousel from './components/carousel/CollectionsCarousel';
import CollectionsSinglePage from './pages/collectionsSinglePage/CollectionsSinglePage';
import CollectionMoviesPage from './pages/collectionMoviesPage/CollectionMoviesPage';
import MoviesSinglePage from './pages/moviesSinglePage/MoviesSinglePage';
import MoviePage from './pages/moviePage/MoviePage';
import Footer from './components/footer/Footer';
import AppContext from './store/context';
import './App.css';

const App = () => {
  const context = useContext(AppContext);

  return (
    <Fragment>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Fragment>
              <MainCarousel />
              <div className="body" data-theme={context.theme ? 'dark' : ''}>
                <div className="fb-container">
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg
                      fill="none"
                      viewBox="0 0 409 409"
                      className="svg-icon svg-icon--facebook"
                    >
                      <path fill="#fff" d="M97 53h276v356H97z"></path>
                      <path
                        fill="#4267B2"
                        d="M353.699 0H55.085C24.663 0 0 24.662 0 55.085v298.616c0 30.423 24.662 55.085 55.085 55.085H202.36l.251-146.078H164.66c-4.932 0-8.935-3.988-8.954-8.92l-.182-47.087c-.019-4.959 3.996-8.989 8.955-8.989h37.882v-45.498c0-52.8 32.247-81.55 79.348-81.55h38.65c4.945 0 8.955 4.009 8.955 8.955v39.704c0 4.944-4.007 8.952-8.95 8.955l-23.719.011c-25.615 0-30.575 12.172-30.575 30.035v39.389h56.285c5.363 0 9.524 4.683 8.892 10.009l-5.581 47.087c-.534 4.506-4.355 7.901-8.892 7.901h-50.453l-.251 146.078h87.631c30.422 0 55.084-24.662 55.084-55.084V55.085C408.784 24.662 384.122 0 353.699 0z"
                      ></path>
                    </svg>
                  </a>
                </div>
                <div className="container">
                  <MoviesCarousel
                    title="ფილმები ქართულად"
                    url={[filmsInGeorgianURL]}
                    linkUrl={[moviesUrl]}
                  />
                  <MoviesCarousel
                    title="სერიალები ქართულად"
                    url={[seriesInGeorgianURL]}
                    linkUrl={[seriesUrl]}
                  />
                  <MoviesCarousel
                    title="ტოპ სერიალები"
                    url={[topSeriesDay, topSeriesWeek, topSeriesMonth]}
                    linkUrl={[topSeries]}
                  />
                  <CollectionsCarousel title="კოლექციები" url={collections} />
                  <MoviesCarousel
                    title="თრეილერები"
                    url={[trailers]}
                    linkUrl={[trailers]}
                  />
                </div>
              </div>
              <Footer theme={context.theme} />
            </Fragment>
          }
        />
        <Route path="collections" element={<CollectionsSinglePage />} />
        <Route path="movies" element={<MoviesSinglePage />} />
        <Route path="movies/:id/:secondaryName" element={<MoviePage />} />
        <Route path="collections/:id" element={<CollectionMoviesPage />} />
      </Routes>
    </Fragment>
  );
};

export default App;
