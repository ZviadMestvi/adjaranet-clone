import { Fragment, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import defaultPicture from '../../assets/default.png';
import MoviesCarousel from '../../components/carousel/MoviesCarousel';
import Header from '../../components/header/Header';
import SearchBar from '../../components/search/SearchBar';
import MoviePlayer from '../../components/video players/MoviePlayer';
import Footer from '../../components/footer/Footer';
import AppContext from '../../store/context';
import classes from './MoviePage.module.css';
import SeriesPlayer from '../../components/video players/SeriesPlayer';

const MoviePage = () => {
  const { state } = useLocation();
  const movieData = state.data;
  const context = useContext(AppContext);
  const [trailerIsOpen, setTrailerIsOpen] = useState(false);
  const [theaterMode, setTheaterMode] = useState(false);
  const [activeBtn, setActiveBtn] = useState('მსგავსი');
  const [actorsArray, setActorsArray] = useState();
  const [movieUrl, setMovieUrl] = useState();
  const [seriesEpisodes, setSeriesEpisodes] = useState();
  const [moviePlayerData, setMoviePlayerData] = useState();
  const [trailerUrl, setTrailerUrl] = useState(
    movieData.trailers.data[0]?.fileUrl
  );

  const relatedMoviesUrl = `https://api.adjaranet.com/api/v1/movies/${movieData.adjaraId}/related?page=1&per_page=10&filters%5Bwith_actors%5D=3&filters%5Bwith_directors%5D=1&source=adjaranet`;

  const actorsUrl = `https://api.adjaranet.com/api/v1/movies/${movieData.adjaraId}/persons?page=1&per_page=12&filters%5Brole%5D=cast&source=adjaranet	`;

  useEffect(() => {
    fetch(actorsUrl)
      .then(res => res.json())
      .then(data => setActorsArray(data.data))
      .catch(err => console.log(err));
  }, [actorsUrl]);

  useEffect(() => {
    fetch(
      `https://api.adjaranet.com/api/v1/movies/${movieData.id}/season-files/0?source=adjaranet`
    )
      .then(res => res.json())
      .then(data => {
        setSeriesEpisodes(data.data);
        setMoviePlayerData(data.data[0]);
        setMovieUrl(data.data[0].files[0].files[1].src);
      })
      .catch(err => console.log(err));
  }, []);

  const trailerLanguageHandler = value => {
    switch (value) {
      case 'GEO':
        setTrailerUrl(movieData.trailers.data[1].fileUrl);
        break;

      case 'RUS':
        setTrailerUrl(movieData.trailers.data[0].fileUrl);
        break;

      case 'ENG':
        setTrailerUrl(movieData.trailers.data[2].fileUrl);
        break;

      default:
        break;
    }
  };

  const dubsLanguageHandler = value => {
    setMovieUrl(moviePlayerData.files[value].files[0].src);

    // switch (value) {
    //   case 'GEO':
    //     setMovieUrl(moviePlayerData.files[0].files[0].src);
    //     break;

    //   case 'RUS':
    //     setMovieUrl(moviePlayerData.files[1].files[0].src);
    //     break;

    //   case 'ENG':
    //     setMovieUrl(moviePlayerData.files[2].files[0].src);
    //     break;

    //   default:
    //     break;
    // }
  };

  const qualityHandler = (quality, langValue) => {
    quality
      ? setMovieUrl(moviePlayerData.files[langValue].files[0].src)
      : setMovieUrl(moviePlayerData.files[langValue].files[1].src);
  };

  const actors = actorsArray?.map(actor => {
    return (
      <div key={actor.id} className={classes.actorContainer}>
        <img
          src={!actor.poster ? defaultPicture : actor.poster}
          alt={`${actor.originalName}`}
        />
        <p>{actor.originalName}</p>
      </div>
    );
  });

  return (
    <div
      className={`${classes.wrapper} ${
        theaterMode && classes.preventScrolling
      }`}
      data-theme={context.theme ? 'dark' : ''}
    >
      <div className={classes.headerContainer}>
        <Header />
        <SearchBar />
      </div>

      {trailerIsOpen && (
        <Fragment>
          <div
            className={classes.trailerShadow}
            onClick={() => setTrailerIsOpen(false)}
          />
          <div className={classes.trailerWrapper}>
            <div className={classes.closeBtnContainer}>
              <p className={classes.watchFilmBtn}>
                <span>
                  <svg viewBox="0 0 22 26">
                    <path
                      fill="#828282"
                      d="M1.37876 26c-.35587-.0022-.69752-.1324-.9556-.364-.13448-.1205-.24142-.2658-.3142-.4269-.07277-.1612-.10985-.3346-.10894-.5098V1.30083c-.00066-.2334.0653-.46264.19092-.66357C.31656.43634.4972.27116.7138.15916c.2166-.112.46116-.1667.70789-.15832.24674.00838.48651.07953.69405.20594L21.3688 11.906c.1936.1178.3529.2797.4631.4708.1103.1911.1681.4052.1681.6229s-.0578.4319-.1681.623c-.1102.1911-.2695.3529-.4631.4707L2.11574 25.7927c-.21968.1342-.47541.2061-.73698.2073zm1.3717-22.31839V22.3185l15.33264-9.3191L2.75046 3.68161z"
                    ></path>
                  </svg>
                </span>
                უყურე ფილმს
              </p>
              <p
                className={classes.closeFilmBtn}
                onClick={() => setTrailerIsOpen(false)}
              >
                X დახურვა
              </p>
            </div>
            <div>
              <MoviePlayer
                url={trailerUrl}
                playerData={movieData.trailers.data}
                toggleTheaterMode={setTheaterMode}
                changeLanguage={trailerLanguageHandler}
                trailer={true}
              />
            </div>
          </div>
        </Fragment>
      )}

      <div className={classes.mobileTitleContainer}>
        <div className={classes.titleContainer}>
          <h4>{movieData.primaryName}</h4>
          <h5>{movieData.secondaryName}</h5>
        </div>
        <div>
          <svg width="5" height="20" viewBox="0 0 5 20">
            <path
              d="M4.26775 0.732231C5.24406 1.70854 5.24406 3.29145 4.26775 4.26776C3.29145 5.24407 1.70853 5.24407 0.732229 4.26776C-0.244076 3.29145 -0.244076 1.70854 0.732229 0.732231C1.7085 -0.244077 3.29141 -0.244077 4.26775 0.732231Z"
              fill="#525252"
            ></path>
            <path
              d="M4.26775 8.23223C5.24406 9.20853 5.24406 10.7914 4.26775 11.7678C3.29145 12.7441 1.70853 12.7441 0.732229 11.7678C-0.244076 10.7914 -0.244076 9.20853 0.732229 8.23223C1.7085 7.25592 3.29141 7.25592 4.26775 8.23223Z"
              fill="#525252"
            ></path>
            <path
              d="M4.26775 15.7322C5.24406 16.7085 5.24406 18.2915 4.26775 19.2678C3.29145 20.2441 1.70853 20.2441 0.732229 19.2678C-0.244076 18.2915 -0.244076 16.7085 0.732229 15.7322C1.7085 14.7559 3.29141 14.7559 4.26775 15.7322Z"
              fill="#525252"
            ></path>
          </svg>
        </div>
      </div>

      <div
        className={classes.movieContainer}
        style={{ backgroundImage: `url(${movieData.covers.data[1050]})` }}
      >
        <div className={classes.movieShadow} />
        <div className={classes.moviePlayerWrapper}>
          {/* <MoviePlayer
            url={movieUrl}
            playerData={moviePlayerData?.files}
            toggleTheaterMode={setTheaterMode}
            changeLanguage={dubsLanguageHandler}
            changeQuality={qualityHandler}
            trailer={false}
          /> */}
          <SeriesPlayer
            url={movieUrl}
            playerData={{
              languages: moviePlayerData?.files,
              episodes: seriesEpisodes,
            }}
            toggleTheaterMode={setTheaterMode}
            changeLanguage={dubsLanguageHandler}
            changeQuality={qualityHandler}
          />

          <div className={classes.movieTitleContainer}>
            <div className={classes.movieTitle}>
              <h1>{movieData.primaryName}</h1>
              <h2>{movieData.secondaryName}</h2>
            </div>

            <div className={classes.ratingContainer}>
              <div onClick={() => window.open(movieData.imdbUrl, '_blank')}>
                <svg
                  className="svg-icon svg-icon--imdbRating"
                  width="47"
                  height="26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.4 7.8h1.4V18H7.4V7.8zm4.1 0h2l2.7 7 2.6-7h2V18h-1.3V9l-2.6 7h-1.4l-2.7-7v9h-1.3V7.8zM25 8.9v8h1.6c1.4 0 2.5-.4 3.1-1 .7-.6 1-1.6 1-3s-.3-2.4-1-3c-.6-.7-1.7-1-3-1H25zm-1.4-1.1h2.8c2 0 3.5.4 4.4 1.2 1 .9 1.4 2.1 1.4 3.9 0 1.7-.5 3-1.4 3.9-1 .8-2.4 1.2-4.4 1.2h-2.8V7.8zm16.2 6.4c0-1-.2-1.7-.6-2.2-.3-.5-.9-.8-1.5-.8-.7 0-1.2.3-1.6.8-.4.5-.6 1.3-.6 2.2 0 .9.2 1.6.6 2.2.4.5 1 .7 1.6.7.6 0 1.2-.2 1.5-.7.4-.6.6-1.3.6-2.2zm-4.3-2.7a2.6 2.6 0 0 1 2.5-1.3c1 0 1.7.3 2.2 1 .6.8 1 1.8 1 3s-.4 2.2-1 2.9c-.5.7-1.3 1.1-2.2 1.1a3 3 0 0 1-1.5-.3l-1-1V18h-1.2V7.4h1.2v4.1z"
                    fill="#fdfdfd"
                  ></path>
                  <rect
                    x="1"
                    y="1"
                    width="45"
                    height="24"
                    rx="3"
                    stroke="#1A90CF"
                    strokeWidth="2"
                  ></rect>
                </svg>
                <p>{movieData.rating.imdb.score.toFixed(1)}</p>
              </div>
              <button onClick={() => setTrailerIsOpen(true)}>თრეილერი</button>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.movieFiles}>
        <p>ფილმის ფაილები</p>
      </div>

      <div className={classes.infoContainer}>
        <div className={classes.imgContainer}>
          <div
            className={classes.image}
            style={{ backgroundImage: `url(${movieData.posters.data[400]})` }}
          />
          <button>
            <span>!</span>პრობლემების შეტყობინება
          </button>
        </div>

        <div className={classes.textContainer}>
          <div className={classes.topContainer}>
            <div>
              <p>
                გამოშვების წელი:{' '}
                <span>{new Date(movieData.releaseDate).getFullYear()}</span>
              </p>
            </div>
            <div>
              <p>
                ქვეყანა:{' '}
                <span>
                  {movieData.countries.data.map(
                    country => `${country.primaryName}, `
                  )}
                </span>
              </p>
            </div>
            <div>
              <p>
                ჟანრი:{' '}
                <span>
                  {movieData.genres?.data.map(
                    genre => `${genre.primaryName}, `
                  )}
                </span>
              </p>
            </div>
            <div>
              <p>
                ხანგრძლივობა:{' '}
                <span>
                  {`${Math.floor(movieData.duration / 60)} საათი ${
                    movieData.duration % 60
                  } წუთი`}
                </span>
              </p>
            </div>
          </div>

          <div className={classes.middleContainer}>
            <div>
              <p>
                რეჟისორი:{' '}
                <span>
                  {movieData.directors.data.map(
                    director => `${director.originalName}, `
                  )}
                </span>
              </p>
            </div>
            <div id={classes.budgetContainer}>
              {movieData.budget !== '' && (
                <p>
                  ბიუჯეტი: <span>{movieData.budget}</span>
                </p>
              )}

              {movieData.income !== '' && (
                <p>
                  შემოსავალი: <span>{movieData.income}</span>
                </p>
              )}
            </div>
          </div>

          <div className={classes.bottomContainer}>
            <div>
              <h1>აღწერა</h1>
            </div>
            <div>
              <p>{movieData.plot.data.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={classes.similarFilmsContainer}>
        <div className={classes.similarFilmsTitle}>
          <div
            onClick={el => setActiveBtn(el.target.innerText)}
            className={
              activeBtn === 'მსგავსი' ? classes.activeSimilarFilmsTitle : ''
            }
          >
            მსგავსი
          </div>
          <div
            onClick={el => setActiveBtn(el.target.innerText)}
            className={
              activeBtn === 'მსახიობები' ? classes.activeSimilarFilmsTitle : ''
            }
          >
            მსახიობები
          </div>
        </div>
        {activeBtn === 'მსგავსი' && (
          <MoviesCarousel title="" url={[relatedMoviesUrl]} />
        )}
        {activeBtn === 'მსახიობები' && (
          <div className={classes.actorsContainer}>{actors}</div>
        )}
      </div>

      <div className={classes.mobileInfoContainer}>
        <div className={classes.mobileInfoBtns}>
          <button
            onClick={el => setActiveBtn(el.target.innerText)}
            className={activeBtn === 'აღწერა' ? classes.activeBtn : ''}
          >
            აღწერა
          </button>
          <button
            onClick={el => setActiveBtn(el.target.innerText)}
            className={activeBtn === 'მსგავსი' ? classes.activeBtn : ''}
          >
            მსგავსი
          </button>
          <button
            onClick={el => setActiveBtn(el.target.innerText)}
            className={activeBtn === 'მსახიობები' ? classes.activeBtn : ''}
          >
            მსახიობები
          </button>
        </div>
        {activeBtn === 'აღწერა' && (
          <div>
            <div className={classes.mobileInfoWrapper}>
              <div>
                <div
                  className={classes.image}
                  style={{
                    backgroundImage: `url(${movieData.posters.data[400]})`,
                  }}
                />
              </div>

              <div className={classes.mobileTextContainer}>
                <p>
                  გამოშვების წელი:{' '}
                  <span>{new Date(movieData.releaseDate).getFullYear()}</span>
                </p>
                <p>
                  ქვეყანა:{' '}
                  <span>
                    {movieData.countries.data.map(
                      country => `${country.primaryName}, `
                    )}
                  </span>
                </p>
                <p>
                  ჟანრი:{' '}
                  <span>
                    {movieData.genres.data.map(
                      genre => `${genre.primaryName}, `
                    )}
                  </span>
                </p>
                <p>
                  ხანგრძლივობა:{' '}
                  <span>
                    {`${Math.floor(movieData.duration / 60)} საათი ${
                      movieData.duration % 60
                    } წუთი`}
                  </span>
                </p>
                <p>
                  რეჟისორი:{' '}
                  <span>
                    {movieData.directors.data.map(
                      director => `${director.originalName}, `
                    )}
                  </span>
                </p>
                <p>
                  IMDB: <span>{movieData.rating.imdb.score.toFixed(1)}</span>
                </p>
              </div>
            </div>
            <div className={classes.mobileInfoDescription}>
              <p>{movieData.plot.data.description}</p>
            </div>
          </div>
        )}
        {activeBtn === 'მსგავსი' && (
          <div>
            <MoviesCarousel title="" url={[relatedMoviesUrl]} />
          </div>
        )}
        {activeBtn === 'მსახიობები' && (
          <div>
            <div className={classes.actorsContainer}>{actors}</div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MoviePage;
