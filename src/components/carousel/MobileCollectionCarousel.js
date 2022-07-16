import { useState, useEffect } from 'react';

import MobileCollectionPoster from './MobileCollectionPoster';
import classes from './MobileCollectionCarousel.module.css';
import { Link } from 'react-router-dom';

const MobileCollectionCarousel = props => {
  const [collectionsData, setCollectionsData] = useState();

  useEffect(() => {
    fetch(props.url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => setCollectionsData(data.data.slice(0, 6)))
      .catch(err => console.log(err));
  }, [props.url]);

  const collectionPosters = collectionsData?.map(poster => {
    return <MobileCollectionPoster key={poster.id} data={poster} />;
  });

  return (
    <div>
      <div className={classes.headerContainer}>
        <Link to="/collections" style={{ textDecoration: 'none' }}>
          <h1>{props.title}</h1>
        </Link>
      </div>

      <div className={classes.collectionsContainer}>{collectionPosters}</div>
    </div>
  );
};

export default MobileCollectionCarousel;
