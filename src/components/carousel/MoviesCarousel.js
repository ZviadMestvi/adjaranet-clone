import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MoviePoster from './MoviePoster';
import classes from './MoviesCarousel.module.css';

const MoviesCarousel = props => {
  const navigate = useNavigate();
  const [currentURL, setCurrentURL] = useState(0);
  const [splittedArray, setSplittedArray] = useState();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [carouselItemCount, setCarouselItemCount] = useState(
    window.innerWidth >= 1400 ? 7 : 5
  );

  const firstSlide = currentSlide === 0;
  const lastSlide = currentSlide === splittedArray?.length - 1;
  const carouselSlideWidth = window.innerWidth >= 1400 ? 1380 : 980;

  const prevSlide = () => {
    if (firstSlide) return;
    setCurrentSlide(currentSlide - 1);
  };

  const nextSlide = () => {
    if (lastSlide) return;
    setCurrentSlide(currentSlide + 1);
  };

  const splitToChunks = (array, chunkSize) => {
    let result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    setSplittedArray(result);
  };

  const changeURL = index => {
    setCurrentURL(index);
  };

  useEffect(() => {
    fetch(props.url[currentURL], {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => splitToChunks(data?.data, carouselItemCount))
      .catch(err => console.log(err));
  }, [props.url, currentURL, carouselItemCount]);

  const moviePosters = splittedArray?.map((chunk, i) => {
    return (
      <div key={i} className={classes.moviesSlide}>
        {chunk.map(poster => {
          return <MoviePoster key={poster.id} data={poster} />;
        })}
      </div>
    );
  });

  return (
    <div className={classes.wrapper}>
      <div className={classes.headerContainer}>
        <div className={classes.titleContainer}>
          <h1
            onClick={() =>
              navigate('/movies', { state: { url: props.linkUrl } })
            }
          >
            {props.title}
          </h1>
          {props.url.length > 1 && (
            <div>
              <p
                onClick={changeURL.bind(null, 0)}
                className={currentURL === 0 ? classes.active : ''}
              >
                დღის
              </p>
              <p
                onClick={changeURL.bind(null, 1)}
                className={currentURL === 1 ? classes.active : ''}
              >
                კვირის
              </p>
              <p
                onClick={changeURL.bind(null, 2)}
                className={currentURL === 2 ? classes.active : ''}
              >
                თვის
              </p>
            </div>
          )}
        </div>

        <div className={classes.slideBtnsContainer}>
          <button
            className={firstSlide ? classes.unavailable : ''}
            onClick={prevSlide}
          >
            <svg
              className="svg-icon svg-icon--prevArrow"
              fill="none"
              viewBox="0 0 11 18"
              width="11"
            >
              <path
                fill="#999"
                d="M2.828 8.707L10.121 16l-1.414 1.414L0 8.707 8.707 0l1.414 1.414-7.293 7.293z"
              ></path>
            </svg>
          </button>

          <button
            className={lastSlide ? classes.unavailable : ''}
            onClick={nextSlide}
          >
            <svg
              className="svg-icon svg-icon--nextArrow"
              fill="none"
              viewBox="0 0 11 18"
              width="11"
            >
              <path
                fill="#999"
                d="M7.29297 8.707L-.00003 16l1.414 1.414L10.121 8.707 1.41397 0l-1.414 1.414 7.293 7.293z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div className={classes.moviesWrapper}>
        <div
          className={classes.movies}
          style={{
            transform: `translateX(-${carouselSlideWidth * currentSlide}px)`,
          }}
        >
          <div className={classes.moviesContainer}>{moviePosters}</div>
        </div>
      </div>
    </div>
  );
};

export default MoviesCarousel;
