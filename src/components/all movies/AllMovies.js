import { useContext, useState, useEffect, useRef } from 'react';
import { genresArray, countriesArray } from '../../HelperConsts';
import AppContext from '../../store/context';
import MoviePoster from '../carousel/MoviePoster';
import SearchBar from '../search/SearchBar';
import classes from './AllMovies.module.css';

const AllMovies = props => {
  const context = useContext(AppContext);
  const ratingProgressRef = useRef();
  const ratingRangeMinRef = useRef();
  const ratingRangeMaxRef = useRef();
  const dateProgressRef = useRef();
  const dateRangeMinRef = useRef();
  const dateRangeMaxRef = useRef();
  const [openedCountries, setOpenedCountries] = useState(false);
  const [openedDateFilter, setOpenedDateFilter] = useState(false);
  const [openedRatingFilter, setOpenedRatingFilter] = useState(false);
  const [categoriesPosition, setCategoriesPosition] = useState(0);
  const [countriesPosition, setCountriesPosition] = useState(0);
  const [openedSortMenu, setOpenedSortMenu] = useState(false);
  const [sortType, setSortType] = useState('დამატების თარიღით');
  const [defaultSorting, setDefaultSorting] = useState();
  const [moviesArray, setMoviesArray] = useState();
  const [subtitlesFilter, setSubtitlesFilter] = useState(false);
  const [filteredGenres, setFilteredGenres] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [ratingFilterMinValue, setRatingFilterMinValue] = useState(0);
  const [ratingFilterMaxValue, setRatingFilterMaxValue] = useState(10);
  const [dateFilterMinValue, setDateFilterMinValue] = useState(0);
  const [dateFilterMaxValue, setDateFilterMaxValue] = useState(122);
  const [carouselItemCount, setCarouselItemCount] = useState(
    window.innerWidth >= 1400 ? 7 : 5
  );

  const splitToChunks = (defaultArray = defaultSorting) => {
    const result = [];
    for (let i = 0; i < defaultArray?.length; i += carouselItemCount) {
      result.push(defaultArray.slice(i, i + carouselItemCount));
    }

    setMoviesArray(result);
  };

  useEffect(() => {
    fetch(props.url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setDefaultSorting(data.data);
        splitToChunks(data.data);
      })
      .catch(err => console.log(err));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.url]);

  // დამატების თარიღით დალაგება
  const sortByDateAdded = () => {
    setSortType('დამატების თარიღი');
    splitToChunks(defaultSorting);
  };

  // რეიტინგის მიხედვით დალაგება
  const sortByRating = (array, el) => {
    const result = array?.slice().sort((a, b) => {
      return b.rating.imdb.score - a.rating.imdb.score;
    });

    setSortType('IMDB რეიტინგით');
    splitToChunks(result, carouselItemCount);
  };

  // გამოშვების დროით დალაგება
  const sortByDate = array => {
    const result = array?.slice().sort((a, b) => {
      return new Date(b.releaseDate) - new Date(a.releaseDate);
    });

    setSortType('გამოშვების წელი');
    splitToChunks(result, carouselItemCount);
  };

  // ჟანრით გაფილტვრა
  const filterByGenre = (array, el) => {
    // თუ ჟანრით უკვე არის გაფილტრული
    if (filteredGenres.includes(el.target.innerText)) {
      setFilteredGenres(prevState =>
        prevState.filter(genre => genre !== el.target.innerText)
      );
      return;
    }

    setFilteredGenres(prevState => [...prevState, el.target.innerText]);
  };

  // IMDB რეითინგით გაფილტვრა
  const filterByRating = (array, el) => {
    let minValue = parseInt(ratingRangeMinRef.current?.value),
      maxValue = parseInt(ratingRangeMaxRef.current?.value);
    const ratingGap = 1;

    // thumb-ები ერთმანეთი რო არ გადაკვეთონ
    if (maxValue - minValue < ratingGap) {
      if (el.target.id === 'ratingRangeMin') {
        ratingRangeMinRef.current.value = maxValue - ratingGap;
        return;
      } else {
        ratingRangeMaxRef.current.value = minValue + ratingGap;
        return;
      }
    }

    const result = [];
    array.forEach(item => {
      if (
        item.rating.imdb.score > minValue &&
        item.rating.imdb.score < maxValue
      )
        result.push(item);
    });

    // პროგრესის სტილის გაკეთება (ლურჯი ხაზი)
    if (el.target.id === 'ratingRangeMin') {
      ratingProgressRef.current.style.left =
        (ratingRangeMinRef.current?.value / ratingRangeMinRef.current?.max) *
          100 +
        '%';
      setRatingFilterMinValue(minValue);
    } else {
      ratingProgressRef.current.style.right =
        100 -
        (ratingRangeMaxRef.current?.value / ratingRangeMaxRef.current?.max) *
          100 +
        '%';
      setRatingFilterMaxValue(maxValue);
    }
  };

  // ქვეყნით გაფილტვრა
  const filterByCountry = (array, el) => {
    // თუ ქვეყანა უკვე არის გაფილტრული
    if (filteredCountries.includes(el.target.innerText)) {
      setFilteredCountries(prevState =>
        prevState.filter(country => country !== el.target.innerText)
      );
      return;
    }

    setFilteredCountries(prevState => [...prevState, el.target.innerText]);
  };

  // თარიღის მიხედვით გაფილტვრა
  const filterByDate = (array, el) => {
    let minValue = parseInt(dateRangeMinRef.current?.value),
      maxValue = parseInt(dateRangeMaxRef.current?.value);
    const ratingGap = 1;

    // thumb-ები ერთმანეთი რო არ გადაკვეთონ
    if (maxValue - minValue < ratingGap) {
      if (el.target.id === 'dateRangeMin') {
        dateRangeMinRef.current.value = maxValue - ratingGap;
        return;
      } else {
        dateRangeMaxRef.current.value = minValue + ratingGap;
        return;
      }
    }

    // პროგრესის სტილის გაკეთება (ლურჯი ხაზი)
    if (el.target.id === 'dateRangeMin') {
      dateProgressRef.current.style.left =
        (dateRangeMinRef.current?.value / dateRangeMinRef.current?.max) * 100 +
        '%';
      setDateFilterMinValue(minValue);
    } else {
      dateProgressRef.current.style.right =
        100 -
        (dateRangeMaxRef.current?.value / dateRangeMaxRef.current?.max) * 100 +
        '%';
      setDateFilterMaxValue(maxValue);
    }

    const result = [];
    array.forEach(item => {
      const releaseDate = new Date(item.releaseDate).getFullYear();
      if (releaseDate >= minValue + 1900 && releaseDate <= maxValue + 1900)
        result.push(item);
    });
  };

  // სუბტიტრების მიხედვით გაფილტვრა
  const filterBySubtitles = array => {
    if (subtitlesFilter) {
      splitToChunks(defaultSorting, carouselItemCount);
      setSubtitlesFilter(false);
      return;
    }

    const result = [];
    array.forEach(item => {
      if (item.hasSubtitles) result.push(item);
    });

    splitToChunks();
    setSubtitlesFilter(true);
  };

  const movies = moviesArray?.map((chunk, i) => {
    return (
      <div key={i} className={classes.moviesChunk}>
        {chunk.map(movie => {
          return <MoviePoster key={movie.id} data={movie} />;
        })}
      </div>
    );
  });

  const genres = genresArray.map((genre, i) => {
    return (
      <button
        key={i}
        className={`${classes.filterBtn} ${
          filteredGenres.includes(genre) ? classes.activeBtn : ''
        }`}
        onClick={filterByGenre.bind(this, defaultSorting)}
      >
        {genre}
      </button>
    );
  });

  const countries = countriesArray.map((country, i) => {
    return (
      <button
        key={i}
        className={`${classes.filterBtn} ${
          filteredCountries.includes(country) ? classes.activeBtn : ''
        }`}
        onClick={filterByCountry.bind(this, defaultSorting)}
      >
        {country}
      </button>
    );
  });

  return (
    <div className={classes.wrapper} data-theme={context.theme ? 'dark' : ''}>
      <SearchBar />

      <div className={classes.filtersWrapper}>
        <div className={classes.categoriesWrapper}>
          <button
            className={classes.prevBtn}
            onClick={() => setCategoriesPosition(categoriesPosition - 1)}
            style={{
              display: `${categoriesPosition === 0 ? 'none' : 'flex'}`,
            }}
          >
            <svg viewBox="0 0 11 18" width="11">
              <path
                fill="#999"
                d="M2.828 8.707L10.121 16l-1.414 1.414L0 8.707 8.707 0l1.414 1.414-7.293 7.293z"
              ></path>
            </svg>
          </button>
          <div className={classes.categoriesContainer}>
            <div
              className={classes.categories}
              style={{
                transform: `translateX(-${categoriesPosition * 337}px)`,
              }}
            >
              {genres}
            </div>
          </div>
          <button
            className={classes.nextBtn}
            onClick={() => setCategoriesPosition(categoriesPosition + 1)}
            style={{
              display: `${categoriesPosition === 6 ? 'none' : 'flex'}`,
            }}
          >
            <svg viewBox="0 0 11 18" width="11">
              <path
                fill="#999"
                d="M7.29297 8.707L-.00003 16l1.414 1.414L10.121 8.707 1.41397 0l-1.414 1.414 7.293 7.293z"
              ></path>
            </svg>
          </button>
        </div>

        <div className={classes.filterContainer}>
          <div className={classes.filterBtnsContainer}>
            <button
              onClick={() => setOpenedRatingFilter(!openedRatingFilter)}
              style={{
                backgroundColor: `${openedRatingFilter ? '#1a90cf' : ''}`,
                color: `${openedRatingFilter ? '#fdfdfd' : ''}`,
              }}
            >
              რეიტინგი
            </button>
            <button
              onClick={() => setOpenedCountries(!openedCountries)}
              style={{
                backgroundColor: `${openedCountries ? '#1a90cf' : ''}`,
                color: `${openedCountries ? '#fdfdfd' : ''}`,
              }}
            >
              ქვეყანა
            </button>
            <button
              onClick={() => setOpenedDateFilter(!openedDateFilter)}
              style={{
                backgroundColor: `${openedDateFilter ? '#1a90cf' : ''}`,
                color: `${openedDateFilter ? '#fdfdfd' : ''}`,
              }}
            >
              თარიღით
            </button>
            <button
              onClick={filterBySubtitles.bind(null, defaultSorting)}
              className={subtitlesFilter ? classes.activeBtn : ''}
            >
              სუბტიტრები
            </button>
          </div>

          <div
            className={classes.sortMenu}
            onClick={() => setOpenedSortMenu(!openedSortMenu)}
          >
            <div
              className={classes.sortText}
              style={{
                borderColor: context.theme ? '#3d3d3d' : '#dddddd',
                backgroundColor: context.theme ? 'transparent' : 'white',
              }}
            >
              {sortType}
              <svg
                width="18"
                height="11"
                fill="none"
                className="fade-ready svg-icon svg-icon--arrow-down"
              >
                <path
                  d="M8.707 7.293L16 0l1.414 1.414-8.707 8.707L0 1.414 1.414 0l7.293 7.293z"
                  fill="#999999"
                ></path>
              </svg>
            </div>
            {openedSortMenu && (
              <ul>
                <li onClick={sortByDateAdded}>
                  <p>დამატების თარიღით</p>
                </li>
                <li onClick={sortByRating.bind(null, defaultSorting)}>
                  <p>IMDB რეიტინგით</p>
                </li>
                <li onClick={sortByDate.bind(null, defaultSorting)}>
                  <p>გამოშვების წელი</p>
                </li>
              </ul>
            )}
          </div>
        </div>

        {openedDateFilter && (
          <div className={classes.dateFilter}>
            <span>
              {dateFilterMinValue + 1900} - {dateFilterMaxValue + 1900}
            </span>

            <div className={classes.sliderContainer}>
              <div className={classes.slider}>
                <div ref={dateProgressRef} className={classes.progress} />
              </div>

              <div className={classes.sliderHandles}>
                <input
                  ref={dateRangeMinRef}
                  id="dateRangeMin"
                  type="range"
                  min="0"
                  max="122"
                  step="1"
                  defaultValue="0"
                  className={classes.dateRangeMin}
                  onChange={filterByDate.bind(null, defaultSorting)}
                />
                <input
                  ref={dateRangeMaxRef}
                  id="dateRangeMax"
                  type="range"
                  min="0"
                  max="122"
                  step="1"
                  defaultValue="122"
                  className={classes.dateRangeMax}
                  onChange={filterByDate.bind(null, defaultSorting)}
                />
              </div>
            </div>
          </div>
        )}

        {openedRatingFilter && (
          <div className={classes.ratingFilter}>
            <div className={classes.logoContainer}>
              <svg width="47" height="26" fill="none">
                <path
                  d="M7.4 7.8h1.4V18H7.4V7.8zm4.1 0h2l2.7 7 2.6-7h2V18h-1.3V9l-2.6 7h-1.4l-2.7-7v9h-1.3V7.8zM25 8.9v8h1.6c1.4 0 2.5-.4 3.1-1 .7-.6 1-1.6 1-3s-.3-2.4-1-3c-.6-.7-1.7-1-3-1H25zm-1.4-1.1h2.8c2 0 3.5.4 4.4 1.2 1 .9 1.4 2.1 1.4 3.9 0 1.7-.5 3-1.4 3.9-1 .8-2.4 1.2-4.4 1.2h-2.8V7.8zm16.2 6.4c0-1-.2-1.7-.6-2.2-.3-.5-.9-.8-1.5-.8-.7 0-1.2.3-1.6.8-.4.5-.6 1.3-.6 2.2 0 .9.2 1.6.6 2.2.4.5 1 .7 1.6.7.6 0 1.2-.2 1.5-.7.4-.6.6-1.3.6-2.2zm-4.3-2.7a2.6 2.6 0 0 1 2.5-1.3c1 0 1.7.3 2.2 1 .6.8 1 1.8 1 3s-.4 2.2-1 2.9c-.5.7-1.3 1.1-2.2 1.1a3 3 0 0 1-1.5-.3l-1-1V18h-1.2V7.4h1.2v4.1z"
                  fill="#999"
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
              <span>IMDB</span>
            </div>

            <div className={classes.ratingSliderWrapper}>
              <span>
                {ratingFilterMinValue} - {ratingFilterMaxValue}
              </span>

              <div className={classes.sliderContainer}>
                <div className={classes.slider}>
                  <div ref={ratingProgressRef} className={classes.progress} />
                </div>

                <div className={classes.sliderHandles}>
                  <input
                    ref={ratingRangeMinRef}
                    id="ratingRangeMin"
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    defaultValue="0"
                    className={classes.ratingRangeMin}
                    onChange={filterByRating.bind(null, defaultSorting)}
                  />
                  <input
                    ref={ratingRangeMaxRef}
                    id="ratingRangeMax"
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    defaultValue="10"
                    className={classes.ratingRangeMax}
                    onChange={filterByRating.bind(null, defaultSorting)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {openedCountries && (
          <div className={classes.countriesContainer}>
            <button
              className={classes.prevBtn}
              onClick={() => setCountriesPosition(countriesPosition - 1)}
              style={{
                display: `${countriesPosition === 0 ? 'none' : 'block'}`,
              }}
            >
              <svg viewBox="0 0 11 18" width="11">
                <path
                  fill="#999"
                  d="M2.828 8.707L10.121 16l-1.414 1.414L0 8.707 8.707 0l1.414 1.414-7.293 7.293z"
                ></path>
              </svg>
            </button>
            <div
              className={classes.countries}
              style={{
                transform: `translateX(-${countriesPosition * 337}px)`,
              }}
            >
              {countries}
            </div>
            <button
              className={classes.nextBtn}
              onClick={() => setCountriesPosition(countriesPosition + 1)}
              style={{
                display: `${countriesPosition === 6 ? 'none' : 'block'}`,
              }}
            >
              <svg viewBox="0 0 11 18" width="11">
                <path
                  fill="#999"
                  d="M7.29297 8.707L-.00003 16l1.414 1.414L10.121 8.707 1.41397 0l-1.414 1.414 7.293 7.293z"
                ></path>
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className={classes.moviesWrapper}>{movies}</div>
    </div>
  );
};

export default AllMovies;
