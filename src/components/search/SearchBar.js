import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './SearchBar.module.css';

const SearchBar = () => {
  const navigate = useNavigate();
  const [resultsArray, setResultsArray] = useState();

  // const openMovie = data => {
  //   navigate(`/movies/${data.adjaraId}/${data.secondaryName}`, {
  //     state: { data: data },
  //   });
  // };

  const getSearchResults = el => {
    if (el.target.value.length === 0) setResultsArray();
    if (el.target.value.length < 2) return;

    const value = `https://api.adjaranet.com/api/v1/search?filters%5Btype%5D=movie%2Ccast&keywords=${el.target.value}&source=adjaranet`;
    fetch(value, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => setResultsArray(() => data.data))
      .catch(err => console.log(err));
  };

  const results = resultsArray?.map((result, i) => {
    if (!result.adjaraId) return;
    if (i > 10) return;

    return (
      <div
        key={result.id}
        className={classes.resultContainer}
        // onClick={openMovie.bind(null, result)}
      >
        <div
          className={classes.resultBg}
          style={{
            background: `url(${result.posters?.data[240]}) center center / cover no-repeat`,
          }}
        />
        <div className={classes.titleContainer}>
          <h4>{result.secondaryName}</h4>
          <h5>{result.primaryName}</h5>
        </div>
      </div>
    );
  });

  return (
    <div className={classes.searchContainer}>
      <input
        id="search"
        type="text"
        autoComplete="off"
        spellCheck="off"
        placeholder="ძიება..."
        className={classes.search}
        onChange={getSearchResults.bind(this)}
      />
      <label htmlFor="search">
        <svg viewBox="0 0 20 20" width="20">
          <path
            fill="#C4C4C4"
            d="M18.293 19.707l-5.387-5.387A7.92268 7.92268 0 0 1 8 16a8.00035 8.00035 0 0 1-4.44456-1.3482 8.00036 8.00036 0 0 1-2.94647-3.5903A8 8 0 0 1 11.0615.60897a8.00036 8.00036 0 0 1 3.5903 2.94647A8.00035 8.00035 0 0 1 16 8a7.92184 7.92184 0 0 1-1.68 4.906l5.387 5.386-1.414 1.414v.001zM8 2a6.00002 6.00002 0 0 0-5.88471 7.17055 5.99996 5.99996 0 0 0 1.64207 3.07205 5.99939 5.99939 0 0 0 3.0721 1.6421 6.00028 6.00028 0 0 0 3.46664-.3414 5.99968 5.99968 0 0 0 2.6927-2.2099A5.99986 5.99986 0 0 0 14 8c-.0018-1.59073-.6346-3.11577-1.7594-4.24059C11.1158 2.63459 9.59073 2.00186 8 2z"
          ></path>
        </svg>
      </label>

      <div className={classes.resultsWrapper}>
        <div className={classes.resultsTitleContainer}>
          <div className={classes.resultsTitle}>
            <p>ზოგადი</p>
            <span>20</span>
          </div>
        </div>

        <div className={classes.resultsContainer}>{results}</div>
      </div>

      <div className={classes.searchShadow} />
    </div>
  );
};

export default SearchBar;
