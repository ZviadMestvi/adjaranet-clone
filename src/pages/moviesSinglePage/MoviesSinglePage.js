import { useLocation } from 'react-router-dom';

import AllMovies from '../../components/all movies/AllMovies';
import MobileAllMovies from '../../components/all movies/MobileAllMovies';
import classes from './MoviesSinglePage.module.css';

const MoviesSinglePage = () => {
  const { state } = useLocation();

  return (
    <div className={classes.wrapper}>
      <div className={classes.desktopView}>
        <AllMovies url={state.url} />
      </div>
      <div className={classes.mobileView}>
        <MobileAllMovies url={state.url} />
      </div>
    </div>
  );
};

export default MoviesSinglePage;
