import { Fragment, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import HoverInfo from './HoverInfo';

import classes from './MoviePoster.module.css';

const MoviePoster = props => {
  const posterRef = useRef();
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const topPosition =
    window.scrollY + posterRef.current?.getBoundingClientRect().top;
  const rightPosition =
    window.scrollX + posterRef.current?.getBoundingClientRect().right;

  return (
    <Fragment>
      <div
        ref={posterRef}
        className={classes.moviePoster}
        style={{ backgroundImage: `url(${props.data.posters?.data['240']})` }}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        onClick={() =>
          navigate(
            `/movies/${props.data.adjaraId}/${props.data.secondaryName}`,
            { state: { data: props.data } }
          )
        }
      >
        {hover && window.innerWidth >= 1000 ? (
          <div className={classes.movieLink}>
            <div className={classes.shadow} />

            <div className={classes.circle}>
              <svg
                className="svg-icon svg-icon--play-button"
                width="22"
                fill="none"
                viewBox="0 0 22 26"
              >
                <path
                  fill="#1A90CF"
                  d="M1.37876 26c-.35587-.0022-.69752-.1324-.9556-.364-.13448-.1205-.24142-.2658-.3142-.4269-.07277-.1612-.10985-.3346-.10894-.5098V1.30083c-.00066-.2334.0653-.46264.19092-.66357C.31656.43634.4972.27116.7138.15916c.2166-.112.46116-.1667.70789-.15832.24674.00838.48651.07953.69405.20594L21.3688 11.906c.1936.1178.3529.2797.4631.4708.1103.1911.1681.4052.1681.6229s-.0578.4319-.1681.623c-.1102.1911-.2695.3529-.4631.4707L2.11574 25.7927c-.21968.1342-.47541.2061-.73698.2073zm1.3717-22.31839V22.3185l15.33264-9.3191L2.75046 3.68161z"
                ></path>
              </svg>
            </div>

            <div className={classes.langContainer}>
              <a href="#">GEO</a>
              <a href="#">ENG</a>
              <a href="#">RUS</a>
            </div>
          </div>
        ) : (
          ''
        )}

        {hover && window.innerWidth >= 1000
          ? ReactDOM.createPortal(
              <HoverInfo
                topPosition={topPosition}
                rightPosition={rightPosition}
                data={props.data}
              />,
              document.getElementById('movie-info-wrapper')
            )
          : ''}
      </div>
    </Fragment>
  );
};

export default MoviePoster;
