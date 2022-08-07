import { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import MoviePoster from '../../components/carousel/MoviePoster';
import SearchBar from '../../components/search/SearchBar';
import Footer from '../../components/footer/Footer';
import AppContext from '../../store/context';
import classes from './CollectionMoviesPage.module.css';

const CollectionMoviesPage = () => {
  const { state } = useLocation();
  const context = useContext(AppContext);
  const [activeBtn, setActiveBtn] = useState('');
  const [ogMoviesArray, setOgMoviesArray] = useState();
  const [moviesArray, setMoviesArray] = useState();
  const [splitMoviesArray, setSplitMoviesArray] = useState();
  const [carouselItemCount, setCarouselItemCount] = useState(
    window.innerWidth >= 1400 ? 7 : 5
  );

  const splitToChunks = array => {
    const result = [];
    for (let i = 0; i < array?.length; i += carouselItemCount) {
      result.push(array.slice(i, i + carouselItemCount));
    }

    setSplitMoviesArray(result);
  };

  useEffect(() => {
    fetch(state.url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setOgMoviesArray(data.data);
        setMoviesArray(data.data);
        splitToChunks(data.data);
      })
      .catch(err => console.log(err));
  }, [state.url]);

  const filterByLanguage = (array, el) => {
    if (activeBtn === el.target.innerText) {
      setMoviesArray(ogMoviesArray);
      splitToChunks(ogMoviesArray);
      setActiveBtn('');
      return;
    }

    const result = [];
    array?.map(movieData => {
      movieData.movie.data.languages.data.map(lang => {
        if (lang.primaryNameTurned === el.target.innerText)
          result.push(movieData);
      });
    });

    setMoviesArray(result);
    splitToChunks(result);
    setActiveBtn(el.target.innerText);
  };

  const sortByRating = (array, el) => {
    if (activeBtn === el.target.innerText) {
      setMoviesArray(ogMoviesArray);
      splitToChunks(ogMoviesArray);
      setActiveBtn('');
      return;
    }

    const result = array?.slice().sort((a, b) => {
      return b.movie.data.rating.imdb.score - a.movie.data.rating.imdb.score;
    });

    setMoviesArray(result);
    splitToChunks(result);
    setActiveBtn(el.target.innerText);
  };

  const movies = splitMoviesArray?.map((chunk, i) => {
    return (
      <div key={i} className={classes.moviesChunk}>
        {chunk.map(movieData => {
          const movie = movieData.movie.data;
          return <MoviePoster key={movie.id} data={movie} />;
        })}
      </div>
    );
  });

  const mobileViewMovies = moviesArray?.map(movieData => {
    const movie = movieData.movie.data;
    return (
      <div key={movie.id} className={classes.movieContainer}>
        <div className={classes.imgContainer}>
          <img
            src={movie.posters.data[240]}
            alt={`poster of ${movie.primaryName}`}
          />
        </div>

        <div className={classes.textContainer}>
          <div>
            <h2>{movie.primaryName}</h2>
            <h3>{`${movie.secondaryName} (${new Date(
              movie.releaseDate
            ).getFullYear()})`}</h3>
          </div>

          <p>
            IMDB: <span>{movie.rating.imdb.score.toFixed(1)}</span>
          </p>
        </div>
      </div>
    );
  });

  return (
    <div className={classes.wrapper} data-theme={context.theme ? 'dark' : ''}>
      <div className={classes.container}>
        <SearchBar />

        <div className={classes.filterContainer}>
          <div>
            <div className={classes.title}>
              <p>{state.collectionData.name}</p>
            </div>

            <div className={classes.filmCount}>
              <p>{state.collectionData.moviesCount.data.count} ფილმი</p>
            </div>
          </div>

          <div className={classes.btnsContainer}>
            <button
              className={activeBtn === 'ქართულად' ? classes.activeBtn : ''}
              onClick={filterByLanguage.bind(this, ogMoviesArray)}
            >
              ქართულად
            </button>
            <button
              className={activeBtn === 'ინგლისურად' ? classes.activeBtn : ''}
              onClick={filterByLanguage.bind(this, ogMoviesArray)}
            >
              ინგლისურად
            </button>
            <button
              className={activeBtn === 'რუსულად' ? classes.activeBtn : ''}
              onClick={filterByLanguage.bind(this, ogMoviesArray)}
            >
              რუსულად
            </button>
            <button
              className={activeBtn === 'რეიტინგით' ? classes.activeBtn : ''}
              onClick={sortByRating.bind(this, ogMoviesArray)}
            >
              რეიტინგით
            </button>
          </div>

          <div>
            <button
              className={classes.backBtn}
              onClick={() => window.history.back()}
            >
              უკან
            </button>
          </div>
        </div>

        <div className={classes.moviesList}>{movies}</div>
        <div className={classes.resultCount}>
          <p>შედეგი: {moviesArray?.length}</p>
        </div>
        <div className={classes.mobileMoviesList}>{mobileViewMovies}</div>
      </div>

      <Footer />
    </div>
  );
};

export default CollectionMoviesPage;
