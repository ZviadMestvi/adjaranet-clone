import { useRef, useState, useEffect } from 'react';

import classes from './MoviePlayer.module.css';

const convertHMS = function (value) {
  const sec = parseInt(value, 10); // convert value to number if it's string
  let hours = Math.floor(sec / 3600); // get hours
  let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
  let seconds = sec - hours * 3600 - minutes * 60; //  get seconds

  if (seconds < 10) seconds = '0' + seconds;
  if (minutes < 10 && hours !== 0) minutes = '0' + minutes;

  return `${hours < 1 ? '' : hours + ':'}${minutes}:${seconds}`; // Return is HH : MM : SS
};

const MoviePlayer = props => {
  const videoRef = useRef();
  const [currentTime, setCurrentTime] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [volumeLevel, setVolumeLevel] = useState(50);
  const [fitScreen, setFitScreen] = useState(false);
  const [settingsVis, setSettingsVis] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [dubsLanguage, setDubsLanguage] = useState(['GEO', 0]);
  const [highQuality, setHighQuality] = useState([true, 0]);
  const [fullWindow, setFullWindow] = useState(false);
  const [timePassed, setTimePassed] = useState(0);
  const [movieUrl, setMovieUrl] = useState();
  const [moviePlayerData, setMoviePlayerData] = useState();

  const arrowKeysHandler = event => {
    if (event.key === 'ArrowLeft') videoRef.current.currentTime -= 5;
    if (event.key === 'ArrowRight') videoRef.current.currentTime += 5;
  };

  useEffect(() => {
    fetch(
      `https://api.adjaranet.com/api/v1/movies/${props.movieData.id}/season-files/0?source=adjaranet`
    )
      .then(res => res.json())
      .then(data => {
        setMoviePlayerData(data.data[0]);
        setMovieUrl(data.data[0].files[0].files[0].src);
      })
      .catch(err => console.log(err));
  }, [props.movieData.id]);

  useEffect(() => {
    window.addEventListener('keydown', arrowKeysHandler);

    let interval = null;

    if (!isPaused) {
      interval = setInterval(() => {
        setTimePassed(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', arrowKeysHandler);
    };
  }, [isPaused]);

  const progressHandler = el => {
    const video = videoRef.current;

    video.currentTime = el.target.value;
    setCurrentTime(el.target.value);
  };

  const playPauseVideo = () => {
    const video = videoRef.current;

    if (video.paused === true) {
      video.play();
      setIsPaused(false);
    } else {
      video.pause();
      setIsPaused(true);
    }
  };

  const volumeLevelHandler = el => {
    const video = videoRef.current;

    video.volume = el.target.value / 100;
    setVolumeLevel(el.target.value);
  };

  const pictureInPictureHandler = () => {
    // დასახვეწია: შეცვლისას icon-ის ფერს ლურჯად (ან თეთრად) ვერ ანახლებს

    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
      return;
    }

    if (document.pictureInPictureEnabled) {
      videoRef.current.requestPictureInPicture();
    }
  };

  const fitScreenHandler = () => {
    setFitScreen(!fitScreen);
  };

  const settingsVisHandler = () => {
    setSettingsVis(!settingsVis);
  };

  const playbackSpeedHandler = value => {
    videoRef.current.playbackRate = value;
    setPlaybackRate(value);
  };

  const dubsLanguageHandler = value => {
    switch (value) {
      case 'GEO':
        setMovieUrl(moviePlayerData.files[0].files[highQuality[1]].src);
        setDubsLanguage([value, 0]);
        break;

      case 'RUS':
        setMovieUrl(moviePlayerData.files[1].files[highQuality[1]].src);
        setDubsLanguage([value, 1]);
        break;

      case 'ENG':
        setMovieUrl(moviePlayerData.files[2].files[highQuality[1]].src);
        setDubsLanguage([value, 2]);
        break;

      default:
        break;
    }
  };

  const qualityHandler = () => {
    if (highQuality[0]) {
      setMovieUrl(moviePlayerData.files[dubsLanguage[1]].files[0].src);
      setHighQuality([false, 0]);
    } else {
      setMovieUrl(moviePlayerData.files[dubsLanguage[1]].files[1].src);
      setHighQuality([true, 1]);
    }
  };

  const togglefullWindow = () => {
    setFullWindow(!fullWindow);
    props.toggleFullWindow(!fullWindow);
  };

  const fullscreenHandler = () => {
    videoRef.current.requestFullscreen();
  };

  const languages = props.movieData.languages.data.map(lang => {
    return (
      <p
        key={lang.code}
        onClick={dubsLanguageHandler.bind(null, lang.code)}
        className={dubsLanguage[0] === lang.code ? classes.activeOption : ''}
      >
        {lang.code}
      </p>
    );
  });

  return (
    <div
      className={`${classes.moviePlayerContainer} ${
        fullWindow && classes.fullWindow
      }`}
    >
      <div className={classes.moviePlayer}>
        <video
          ref={videoRef}
          id={classes.movie}
          className={fitScreen ? classes.fitScreen : ''}
          src={movieUrl}
          autoPlay={true}
        />

        <div className={classes.controlBar}>
          {/* control movie progress */}
          <div className={classes.progressControl}>
            <input
              type="range"
              min="0"
              max={videoRef.current?.duration}
              defaultValue="0"
              onChange={progressHandler}
            />
            <div className={classes.loadProgress}></div>
            <div
              className={classes.playProgress}
              style={{
                width: `${(currentTime / videoRef.current?.duration) * 100}%`,
              }}
            ></div>
          </div>

          {/* control holder left */}
          <div className={classes.controlsHolderLeft}>
            <button className={classes.playBtn} onClick={playPauseVideo}>
              {isPaused ? (
                <svg viewBox="0 0 36 36">
                  <g>
                    <use
                      className="hedgehog-svg-shadow"
                      href="#hedge-id-1"
                    ></use>
                    <path
                      className="hedgehog-svg-fill"
                      d="M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z"
                      id="hedge-id-1"
                      fill="#e5e5e5"
                    ></path>
                  </g>
                </svg>
              ) : (
                <svg viewBox="0 0 36 36">
                  <g>
                    <use
                      className="hedgehog-svg-shadow"
                      href="#hedge-id-1"
                    ></use>
                    <path
                      className="hedgehog-svg-fill"
                      d="M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z"
                      id="hedge-id-1"
                      fill="#e5e5e5"
                    ></path>
                  </g>
                </svg>
              )}
            </button>

            <div className={classes.volumePanel}>
              <button>
                <svg
                  id="volumeIcon"
                  height="100%"
                  width="100%"
                  viewBox="0 0 36 36"
                >
                  <use className="hedgehog-svg-shadow"></use>
                  <use className="hedgehog-svg-shadow"></use>
                  <defs>
                    <clipPath id="hedgehog-svg-volume-animation-mask">
                      <path d="m 14.35,-0.14 -5.86,5.86 20.73,20.78 5.86,-5.91 z"></path>
                      <path d="M 7.07,6.87 -1.11,15.33 19.61,36.11 27.80,27.60 z"></path>
                      <path
                        className="hedgehog-svg-volume-animation-mover"
                        d="M 9.09,5.20 6.47,7.88 26.82,28.77 29.66,25.99 z"
                      ></path>
                    </clipPath>
                    <clipPath id="hedgehog-svg-volume-animation-slash-mask">
                      <path
                        className="hedgehog-svg-volume-animation-mover"
                        d="m -11.45,-15.55 -4.44,4.51 20.45,20.94 4.55,-4.66 z"
                      ></path>
                    </clipPath>
                  </defs>
                  <path
                    className="hedgehog-svg-fill hedgehog-svg-volume-animation-speaker"
                    d="M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 Z"
                    fill="#fff"
                    id="hedge-id-15"
                  ></path>
                  {videoRef.current?.volume >= 0.5 ||
                  videoRef.current?.volume === 0 ? (
                    <path
                      className="hedgehog-svg-fill"
                      id="hedge-id-17"
                      fill="#fff"
                      d="M19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.77 C23.01,25.86 26,22.28 26,18 C26,13.72 23.01,10.14 19,9.23 L19,11.29 Z"
                      style={{ opacity: 1 }}
                    ></path>
                  ) : (
                    ''
                  )}
                  {videoRef.current?.volume === 0 ? (
                    <path
                      className="hedgehog-svg-fill hedgehog-svg-volume-animation-hider"
                      d="M 9.25,9 7.98,10.27 24.71,27 l 1.27,-1.27 Z"
                      fill="#fff"
                      id="hedge-id-16"
                    ></path>
                  ) : (
                    ''
                  )}
                </svg>
              </button>
              <div className={classes.volumeControl}>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="50"
                  onChange={volumeLevelHandler}
                />
                <div className={classes.volumeBar}>
                  <div
                    className={classes.volumeLevel}
                    style={{ width: `${volumeLevel}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className={classes.timeControl}>
              <p>
                {videoRef.current?.currentTime === undefined
                  ? '0:00'
                  : convertHMS(Math.round(videoRef.current?.currentTime))}
              </p>
              <span>/</span>
              <p>
                {videoRef.current?.currentTime === undefined
                  ? '0:00:00'
                  : `-${convertHMS(
                      Math.round(
                        videoRef.current?.duration -
                          videoRef.current?.currentTime
                      )
                    )}`}
              </p>
            </div>
          </div>

          {/* control holder right */}
          <div className={classes.controlsHolderRight}>
            <div onClick={pictureInPictureHandler}>
              <svg className={classes.controlIcon} viewBox="0 0 36 36">
                <path
                  d="M24 17H16V22H24V17ZM28 26V10H8V26H28ZM26 24.02H10V11.97H26V24.02Z"
                  fill={
                    document.pictureInPictureElement ? '#0083ca' : '#e6e6e6'
                  }
                ></path>
              </svg>
            </div>
            <div onClick={fitScreenHandler}>
              <svg fill="none" id={classes.fitScreenIcon}>
                <path
                  stroke={fitScreen ? '#0083ca' : '#fff'}
                  strokeWidth="2"
                  d="M1 1h18v14H1z"
                ></path>
                <path
                  d="M7 3h6l-3 3-3-3zm6 10H7l3-3 3 3z"
                  fill={fitScreen ? '#0083ca' : '#fff'}
                ></path>
              </svg>
            </div>
            <div onClick={settingsVisHandler}>
              {settingsVis && (
                <div className={classes.settingsMenu}>
                  <div>
                    <div className={classes.settingsSectionTitle}>
                      <h5>სიჩქარე</h5>
                    </div>
                    <div className={classes.settingsSectionOptions}>
                      <p
                        onClick={playbackSpeedHandler.bind(null, 1.5)}
                        className={
                          playbackRate === 1.5 ? classes.activeOption : ''
                        }
                      >
                        1.5x
                      </p>
                      <p
                        onClick={playbackSpeedHandler.bind(null, 1.25)}
                        className={
                          playbackRate === 1.25 ? classes.activeOption : ''
                        }
                      >
                        1.25x
                      </p>
                      <p
                        onClick={playbackSpeedHandler.bind(null, 1)}
                        className={
                          playbackRate === 1 ? classes.activeOption : ''
                        }
                      >
                        NORMAL
                      </p>
                      <p
                        onClick={playbackSpeedHandler.bind(null, 0.75)}
                        className={
                          playbackRate === 0.75 ? classes.activeOption : ''
                        }
                      >
                        0.75x
                      </p>
                      <p
                        onClick={playbackSpeedHandler.bind(null, 0.5)}
                        className={
                          playbackRate === 0.5 ? classes.activeOption : ''
                        }
                      >
                        0.5x
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className={classes.settingsSectionTitle}>
                      <h5>გახმოვანება</h5>
                    </div>
                    <div className={classes.settingsSectionOptions}>
                      {languages}
                    </div>
                  </div>

                  <div>
                    <div className={classes.settingsSectionTitle}>
                      <h5>ხარისხი</h5>
                    </div>
                    <div className={classes.settingsSectionOptions}>
                      <p
                        onClick={qualityHandler}
                        className={highQuality[0] ? classes.activeOption : ''}
                      >
                        HD
                      </p>
                      <p
                        onClick={qualityHandler}
                        className={!highQuality[0] ? classes.activeOption : ''}
                      >
                        SD
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <svg
                viewBox="0 0 36 36"
                id={settingsVis ? classes.settingsIconActive : ''}
                className={classes.controlIcon}
              >
                <g>
                  <use
                    className="hedgehog-svg-shadow"
                    href="#hedge-id-svg-movie-cog"
                  ></use>
                  <path
                    className="hedgehog-svg-fill"
                    d="m 23.94,18.78 c .03,-0.25 .05,-0.51 .05,-0.78 0,-0.27 -0.02,-0.52 -0.05,-0.78 l 1.68,-1.32 c .15,-0.12 .19,-0.33 .09,-0.51 l -1.6,-2.76 c -0.09,-0.17 -0.31,-0.24 -0.48,-0.17 l -1.99,.8 c -0.41,-0.32 -0.86,-0.58 -1.35,-0.78 l -0.30,-2.12 c -0.02,-0.19 -0.19,-0.33 -0.39,-0.33 l -3.2,0 c -0.2,0 -0.36,.14 -0.39,.33 l -0.30,2.12 c -0.48,.2 -0.93,.47 -1.35,.78 l -1.99,-0.8 c -0.18,-0.07 -0.39,0 -0.48,.17 l -1.6,2.76 c -0.10,.17 -0.05,.39 .09,.51 l 1.68,1.32 c -0.03,.25 -0.05,.52 -0.05,.78 0,.26 .02,.52 .05,.78 l -1.68,1.32 c -0.15,.12 -0.19,.33 -0.09,.51 l 1.6,2.76 c .09,.17 .31,.24 .48,.17 l 1.99,-0.8 c .41,.32 .86,.58 1.35,.78 l .30,2.12 c .02,.19 .19,.33 .39,.33 l 3.2,0 c .2,0 .36,-0.14 .39,-0.33 l .30,-2.12 c .48,-0.2 .93,-0.47 1.35,-0.78 l 1.99,.8 c .18,.07 .39,0 .48,-0.17 l 1.6,-2.76 c .09,-0.17 .05,-0.39 -0.09,-0.51 l -1.68,-1.32 0,0 z m -5.94,2.01 c -1.54,0 -2.8,-1.25 -2.8,-2.8 0,-1.54 1.25,-2.8 2.8,-2.8 1.54,0 2.8,1.25 2.8,2.8 0,1.54 -1.25,2.8 -2.8,2.8 l 0,0 z"
                    id="hedge-id-svg-movie-cog"
                    fill={settingsVis ? '#0083ca' : '#fff'}
                  ></path>
                </g>
              </svg>
            </div>
            <div onClick={togglefullWindow}>
              {fullWindow ? (
                <svg viewBox="0 0 36 36" className={classes.controlIcon}>
                  <g>
                    <use
                      className="hedgehog-svg-shadow"
                      href="#hedge-id-exitFullWindow"
                    ></use>
                    <path
                      id="hedge-id-exitFullWindow"
                      className="hedgehog-svg-fill"
                      fillRule="evenodd"
                      d="m 26,13 0,10 -16,0 0,-10 z m -14,2 12,0 0,6 -12,0 0,-6 z"
                      fill="#0083ca"
                    ></path>
                  </g>
                </svg>
              ) : (
                <svg viewBox="0 0 36 36" className={classes.controlIcon}>
                  <g>
                    <use
                      className="hedgehog-svg-shadow"
                      href="#hedge-id-fullWindow"
                    ></use>
                    <path
                      id="hedge-id-fullWindow"
                      className="hedgehog-svg-fill"
                      fillRule="evenodd"
                      d="m 28,11 0,14 -20,0 0,-14 z m -18,2 16,0 0,10 -16,0 0,-10 z"
                      fill="#fff"
                    ></path>
                  </g>
                </svg>
              )}
            </div>
            <div onClick={fullscreenHandler}>
              <svg viewBox="0 0 36 36" className={classes.controlIcon}>
                <g>
                  <use
                    className="hedgehog-svg-shadow"
                    href="#hedge-id-23"
                  ></use>
                  <path
                    id="hedge-id-23"
                    className="hedgehog-svg-fill"
                    d="m 10,16 2,0 0,-4 4,0 0,-2 L 10,10 l 0,6 0,0 z"
                    fill="#fff"
                  ></path>
                </g>
                <g>
                  <use
                    className="hedgehog-svg-shadow"
                    href="#hedge-id-24"
                  ></use>
                  <path
                    id="hedge-id-24"
                    className="hedgehog-svg-fill"
                    d="m 20,10 0,2 4,0 0,4 2,0 L 26,10 l -6,0 0,0 z"
                    fill="#fff"
                  ></path>
                </g>
                <g>
                  <use
                    className="hedgehog-svg-shadow"
                    href="#hedge-id-25"
                  ></use>
                  <path
                    id="hedge-id-25"
                    className="hedgehog-svg-fill"
                    d="m 24,24 -4,0 0,2 L 26,26 l 0,-6 -2,0 0,4 0,0 z"
                    fill="#fff"
                  ></path>
                </g>
                <g>
                  <use
                    className="hedgehog-svg-shadow"
                    href="#hedge-id-26"
                  ></use>
                  <path
                    id="hedge-id-26"
                    className="hedgehog-svg-fill"
                    d="M 12,20 10,20 10,26 l 6,0 0,-2 -4,0 0,-4 0,0 z"
                    fill="#fff"
                  ></path>
                </g>
              </svg>
            </div>
          </div>
        </div>
        <div className={classes.bottomShadow} />
      </div>
    </div>
  );
};

export default MoviePlayer;
