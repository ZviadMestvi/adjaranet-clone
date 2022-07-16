import { useState, useEffect, useContext, useRef } from 'react';
import { genresArray, countriesArray } from '../../HelperConsts';

import AppContext from '../../store/context';
import classes from './MobileAllMovies.module.css';

const MobileAllMovies = props => {
  const context = useContext(AppContext);
  const ratingProgressRef = useRef();
  const ratingRangeMinRef = useRef();
  const ratingRangeMaxRef = useRef();
  const dateProgressRef = useRef();
  const dateRangeMinRef = useRef();
  const dateRangeMaxRef = useRef();
  const [sortType, setSortType] = useState('დამატების თარიღით');
  const [openedSortingMenu, setOpenedSortingMenu] = useState(false);
  const [sideMenu, setSideMenu] = useState(true);
  const [filtersTitle, setFiltersTitle] = useState('ფილტრაცია');
  const [openedFilterMenu, setOpenedFilterMenu] = useState(true);
  const [openedGenres, setOpenedGenres] = useState(false);
  const [openedRating, setOpenedRating] = useState(false);
  const [openedLanguages, setOpenedLanguages] = useState(false);
  const [openedCountries, setOpenedCountries] = useState(false);
  const [openedDate, setOpenedDate] = useState(false);
  const [subtitlesFilter, setSubtitlesFilter] = useState(false);
  const [defaultSorting, setDefaultSorting] = useState();
  const [filteredGenres, setFilteredGenres] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [ratingFilterMinValue, setRatingFilterMinValue] = useState(0);
  const [ratingFilterMaxValue, setRatingFilterMaxValue] = useState(10);
  const [dateFilterMinValue, setDateFilterMinValue] = useState(0);
  const [dateFilterMaxValue, setDateFilterMaxValue] = useState(122);
  const [filteredLanguages, setFilteredLanguages] = useState([]);

  const openFilter = type => {
    switch (type) {
      case 'categories':
        setOpenedGenres(true);
        setFiltersTitle('ჟანრი');
        break;
      case 'rating':
        setOpenedRating(true);
        setFiltersTitle('IMDB რეიტინგი');
        break;
      case 'langs':
        setOpenedLanguages(true);
        setFiltersTitle('ენა');
        break;
      case 'countries':
        setOpenedCountries(true);
        setFiltersTitle('ქვეყანა');
        break;
      case 'date':
        setOpenedDate(true);
        setFiltersTitle('თარიღი');
        break;
      default:
        return;
    }

    setOpenedFilterMenu(false);
  };

  const backToFilterMenu = () => {
    setOpenedGenres(false);
    setOpenedRating(false);
    setOpenedLanguages(false);
    setOpenedCountries(false);
    setOpenedDate(false);

    setOpenedFilterMenu(true);
    setFiltersTitle('ფილტრაცია');
  };

  // დამატების თარიღით დალაგება
  const sortByDateAdded = () => {
    setSortType('დამატების თარიღი');
  };

  // რეიტინგის მიხედვით დალაგება
  const sortByRating = () => {
    setSortType('IMDB რეიტინგით');
  };

  // გამოშვების დროით დალაგება
  const sortByDate = () => {
    setSortType('გამოშვების წელი');
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

  // ენის მიხედვით გაფილტვრა
  const filterByLanguage = (array, el) => {
    // თუ ენა უკვე არის გაფილტრული
    if (filteredLanguages.includes(el.target.innerText)) {
      setFilteredLanguages(prevState =>
        prevState.filter(language => language !== el.target.innerText)
      );
      return;
    }

    setFilteredLanguages(prevState => [...prevState, el.target.innerText]);
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
      setSubtitlesFilter(false);
      return;
    }

    setSubtitlesFilter(true);
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
      })
      .catch(err => console.log(err));
  }, [props.url]);

  const movies = defaultSorting?.map(movie => {
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

  const genres = genresArray.map((genre, i) => {
    return (
      <button
        key={i}
        className={`${classes.filterBtn} ${
          filteredGenres.includes(genre) ? classes.activeBtn : ''
        } `}
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
        } `}
        onClick={filterByCountry.bind(this, defaultSorting)}
      >
        {country}
      </button>
    );
  });

  return (
    <div className={classes.wrapper} data-theme={context.theme ? 'dark' : ''}>
      <div className={classes.container}>
        <div className={classes.filtersBtn}>
          <button
            onClick={() => setSideMenu(true)}
            style={{ borderColor: context.theme ? '#3d3d3d' : '#dddddd' }}
          >
            ფილტრაცია
          </button>
        </div>

        <div>
          <div
            className={classes.sortMenu}
            onClick={() => setOpenedSortingMenu(!openedSortingMenu)}
          >
            <div
              className={classes.sortText}
              style={{ borderColor: context.theme ? '#3d3d3d' : '#dddddd' }}
            >
              {sortType}
              <svg width="18" height="11">
                <path
                  d="M8.707 7.293L16 0l1.414 1.414-8.707 8.707L0 1.414 1.414 0l7.293 7.293z"
                  fill="#999999"
                ></path>
              </svg>
            </div>
            {openedSortingMenu && (
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

        {sideMenu && (
          <div className={classes.sideFiltersContainer}>
            <div className={classes.sideFiltersHeader}>
              <h4 onClick={backToFilterMenu}>
                {!openedFilterMenu && (
                  <svg width="15" height="14" viewBox="0 0 15 14">
                    <path
                      d="M0.268815 6.06928L6.14216 0.265574C6.50051 -0.0885247 7.08168 -0.0885247 7.44003 0.265574C7.79845 0.619745 7.79845 1.19388 7.44003 1.54805L3.13332 5.80369H14.0823C14.5891 5.80369 15 6.20973 15 6.71052C15 7.21123 14.5891 7.61735 14.0823 7.61735H3.13332L7.43988 11.873C7.7983 12.2272 7.7983 12.8013 7.43988 13.1555C7.26075 13.3324 7.02581 13.4211 6.79095 13.4211C6.55609 13.4211 6.32123 13.3324 6.14202 13.1555L0.268815 7.35175C-0.0896063 6.99758 -0.0896063 6.42345 0.268815 6.06928Z"
                      fill={context.theme ? '#d5ddf5' : '#525252'}
                    ></path>
                  </svg>
                )}
                {filtersTitle}
              </h4>
              <button>გასუფთავება</button>
            </div>

            {openedFilterMenu && (
              <div className={classes.sideFilters}>
                <div className={classes.filterCategories}>
                  <div
                    className={classes.filterCategory}
                    onClick={openFilter.bind(null, 'categories')}
                  >
                    <p>ჟანრი</p>
                  </div>
                  <div
                    className={classes.filterCategory}
                    onClick={openFilter.bind(null, 'rating')}
                  >
                    <p>რეიტინგი</p>
                  </div>
                  <div
                    className={classes.filterCategory}
                    onClick={openFilter.bind(null, 'langs')}
                  >
                    <p>ენა</p>
                  </div>
                  <div
                    className={classes.filterCategory}
                    onClick={openFilter.bind(null, 'countries')}
                  >
                    <p>ქვეყანა</p>
                  </div>
                  <div
                    className={classes.filterCategory}
                    onClick={openFilter.bind(null, 'date')}
                  >
                    <p>თარიღით</p>
                  </div>
                  <div
                    className={classes.subtitles}
                    onClick={filterBySubtitles.bind(null, defaultSorting)}
                  >
                    <p>სუბტიტრები</p>
                    <div
                      className={classes.toggleSwitch}
                      style={{
                        backgroundColor: subtitlesFilter ? '#1683c6' : '',
                      }}
                    >
                      <div
                        className={classes.toggleCircle}
                        style={{
                          transform: subtitlesFilter ? 'translateX(11px)' : '',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {openedGenres && <div className={classes.categories}>{genres}</div>}

            {openedRating && (
              <div className={classes.ratingFilter}>
                <div className={classes.scoreContainer}>
                  <p>{ratingFilterMinValue}</p>
                  <p>{ratingFilterMaxValue}</p>
                </div>

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
            )}

            {openedLanguages && (
              <div className={classes.languages}>
                <button
                  className={`${classes.filterBtn} ${
                    filteredLanguages.includes('ქართულად')
                      ? classes.activeBtn
                      : ''
                  }`}
                  onClick={filterByLanguage.bind(this, defaultSorting)}
                >
                  ქართულად
                </button>
                <button
                  className={`${classes.filterBtn} ${
                    filteredLanguages.includes('ინგლისურად')
                      ? classes.activeBtn
                      : ''
                  }`}
                  onClick={filterByLanguage.bind(this, defaultSorting)}
                >
                  ინგლისურად
                </button>
                <button
                  className={`${classes.filterBtn} ${
                    filteredLanguages.includes('რუსულად')
                      ? classes.activeBtn
                      : ''
                  }`}
                  onClick={filterByLanguage.bind(this, defaultSorting)}
                >
                  რუსულად
                </button>
              </div>
            )}

            {openedCountries && (
              <div className={classes.countries}>{countries}</div>
            )}

            {openedDate && (
              <div className={classes.dateFilter}>
                <div className={classes.scoreContainer}>
                  <p>{dateFilterMinValue + 1900}</p>
                  <p>{dateFilterMaxValue + 1900}</p>
                </div>

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

            <div className={classes.setFiltersBtn}>
              <button>გაფილტვრა</button>
            </div>
          </div>
        )}
      </div>

      <div className={classes.resultsCount}>
        <p>შედეგი: {defaultSorting?.length}</p>
      </div>

      <div className={classes.moviesWrapper}>{movies}</div>

      {sideMenu && (
        <div
          className={classes.searchShadow}
          onClick={() => setSideMenu(false)}
        />
      )}
    </div>
  );
};

export default MobileAllMovies;
