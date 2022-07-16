import { useState, useEffect, Fragment } from 'react';

import CollectionPoster from './CollectionPoster';
import MobileCollectionCarousel from './MobileCollectionCarousel';
import classes from './CollectionsCarousel.module.css';
import { Link } from 'react-router-dom';

const CollectionsCarousel = props => {
  const [splittedArray, setSplittedArray] = useState();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [carouselItemCount, setCarouselItemCount] = useState(
    window.innerWidth >= 1400 ? 14 : 10
  );

  const carouselSlideWidth = window.innerWidth >= 1400 ? 1380 : 980;
  const firstSlide = currentSlide === 0;
  const lastSlide = currentSlide === splittedArray?.length - 1;

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

  useEffect(() => {
    fetch(props.url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => splitToChunks(data.data, carouselItemCount))
      .catch(err => console.log(err));
  }, [props.url, carouselItemCount]);

  const collectionPosters = splittedArray?.map((chunk, i) => {
    return (
      <div key={i} className={classes.collectionsSlide}>
        {chunk.map(poster => {
          return <CollectionPoster key={poster.id} data={poster} />;
        })}
      </div>
    );
  });

  return (
    <Fragment>
      <div className={classes.wrapper}>
        <div className={classes.headerContainer}>
          <Link to="/collections" style={{ textDecoration: 'none' }}>
            <h1>{props.title}</h1>
          </Link>
          <div>
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

        <div className={classes.collectionsWrapper}>
          <div
            className={classes.collections}
            style={{
              transform: `translateX(-${carouselSlideWidth * currentSlide}px)`,
            }}
          >
            <div className={classes.collectionsContainer}>
              {collectionPosters}
            </div>
          </div>
        </div>
      </div>

      <div className={classes.mobileCollectionsWrapper}>
        <MobileCollectionCarousel title="კოლექციები" url={props.url} />
      </div>
    </Fragment>
  );
};

export default CollectionsCarousel;
