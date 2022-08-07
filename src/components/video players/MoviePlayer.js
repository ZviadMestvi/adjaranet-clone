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
  const videoThumbnail = useRef();
  const timeProgress = useRef();
  const timeProgressHover = useRef();
  const timeProgressHoverThumbnail = useRef();
  const timeTooltip = useRef();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState();
  const [isPaused, setIsPaused] = useState(true);
  const [volumeLevel, setVolumeLevel] = useState(50);
  const [fitScreen, setFitScreen] = useState(false);
  const [settingsVis, setSettingsVis] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [dubsLanguage, setDubsLanguage] = useState(['GEO', 0]); // second value is needed to set quality on correct video language
  const [highQuality, setHighQuality] = useState(true);
  const [picInPic, setPicInPic] = useState(false);
  const [theaterMode, setTheaterMode] = useState(false);

  const arrowKeysHandler = event => {
    if (event.key === 'ArrowLeft') videoRef.current.currentTime -= 5;
    if (event.key === 'ArrowRight') videoRef.current.currentTime += 5;
  };

  useEffect(() => {
    window.addEventListener('keydown', arrowKeysHandler);

    return () => window.removeEventListener('keydown', arrowKeysHandler);
  }, []);

  const remainingTime = () => {
    const video = videoRef.current;
    const vidDuration = Math.round(video.duration - video.currentTime);

    setDuration(vidDuration);
  };

  const updateTimer = () => {
    const video = videoRef.current;
    const currentTime = Math.round(video.currentTime);

    setCurrentTime(currentTime);
    remainingTime();
    timeProgress.current.value = currentTime;
  };

  const progressHandler = e => {
    const video = videoRef.current;

    video.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };

  const togglePlay = () => {
    const video = videoRef.current;

    if (video.paused === true) {
      video.play();
      setIsPaused(false);
    } else {
      video.pause();
      setIsPaused(true);
    }
  };

  const volumeLevelHandler = e => {
    const video = videoRef.current;

    video.volume = e.target.value / 100;
    setVolumeLevel(e.target.value);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    const volumeLevelEl = document.querySelector('#volumeInput');

    if (volumeLevel !== 0) {
      video.volume = 0;
      setVolumeLevel(0);
      volumeLevelEl.value = 0;
    } else {
      video.volume = 0.5;
      setVolumeLevel(50);
      volumeLevelEl.value = 50;
    }
  };

  const pictureInPictureHandler = () => {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
      setPicInPic(false);
    } else {
      videoRef.current.requestPictureInPicture();
      setPicInPic(true);
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

  const toggleTheaterMode = () => {
    props.toggleTheaterMode(!theaterMode);
    setTheaterMode(!theaterMode);
  };

  const fullscreenHandler = () => {
    videoRef.current.requestFullscreen();
  };

  const showMouseDisplay = e => {
    const x = e.nativeEvent.offsetX;
    const progressWidthValue = e.target.getBoundingClientRect().width;
    const videoDuration = videoRef.current?.duration;
    const progressTime = Math.floor((x / progressWidthValue) * videoDuration);

    let hours = Math.floor(progressTime / 3600);
    let minutes = Math.floor((progressTime - hours * 3600) / 60); // get minutes
    let seconds = progressTime - hours * 3600 - minutes * 60; //  get seconds

    if (seconds < 10) seconds = '0' + seconds;
    if (minutes < 10) minutes = '0' + minutes;

    // -100 is needed to position thumbnail above cursor
    timeProgressHoverThumbnail.current.style.left = x - 100 + 'px';
    timeProgressHover.current.style.width = x + 'px';

    timeTooltip.current.innerText = `${hours}:${minutes}:${seconds}`;

    if (!props.trailer) videoThumbnail.current.currentTime = progressTime;
  };

  const trailerLanguages = props.playerData?.map((lang, index) => {
    return (
      <p
        key={lang.language}
        onClick={e => {
          props.changeLanguage(e.target.innerText);
          setDubsLanguage([e.target.innerText, index]);
        }}
        className={
          dubsLanguage[0] === lang.language ? classes.activeOption : ''
        }
      >
        {lang.language}
      </p>
    );
  });

  const languages = props.playerData?.map((lang, index) => {
    return (
      <p
        key={lang.lang}
        onClick={e => {
          props.changeLanguage(e.target.innerText);
          setDubsLanguage([e.target.innerText, index]);
        }}
        className={dubsLanguage[0] === lang.lang ? classes.activeOption : ''}
      >
        {lang.lang}
      </p>
    );
  });

  return (
    <div
      className={`${classes.moviePlayerContainer} ${
        theaterMode && classes.theaterMode
      }`}
    >
      <div className={classes.moviePlayer}>
        <video
          ref={videoRef}
          id={classes.movie}
          className={fitScreen ? classes.fitScreen : ''}
          onLoadedData={remainingTime}
          onTimeUpdate={updateTimer}
          onClick={togglePlay}
          src={props.url}
          preload="metadata"
        />

        <div className={classes.controlBar}>
          {/* control movie progress */}
          <div
            className={classes.progressControl}
            onMouseMoveCapture={showMouseDisplay}
          >
            <input
              ref={timeProgress}
              id="timeProgressInput"
              type="range"
              min="0"
              max={videoRef.current?.duration}
              defaultValue="0"
              onChange={progressHandler}
            />
            <div className={classes.loadProgress}></div>
            <div ref={timeProgressHover} className={classes.mouseDisplay}>
              <div
                ref={timeProgressHoverThumbnail}
                className={classes.mdtContainer}
              >
                <div ref={timeTooltip} className={classes.timeTooltip}>
                  0:00:00
                </div>
                {!props.trailer && (
                  <video
                    ref={videoThumbnail}
                    className={classes.videoThumbnail}
                    src={props.url}
                    preload="metadata"
                  />
                )}
              </div>
            </div>
            <div
              className={classes.playProgress}
              style={{
                width: `${(currentTime / videoRef.current?.duration) * 100}%`,
              }}
            ></div>
          </div>

          {/* control holder left */}
          <div className={classes.controlsHolderLeft}>
            <button className={classes.playBtn} onClick={togglePlay}>
              {isPaused ? (
                <svg viewBox="0 0 36 36">
                  <g>
                    <path
                      d="M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z"
                      fill="#e5e5e5"
                    ></path>
                  </g>
                </svg>
              ) : (
                <svg viewBox="0 0 36 36">
                  <g>
                    <path
                      d="M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z"
                      fill="#e5e5e5"
                    ></path>
                  </g>
                </svg>
              )}
              <span className={classes.controlDesc}>
                {isPaused ? 'ჩართვა' : 'დაპაუზება'}
              </span>
            </button>

            <div className={classes.volumePanel}>
              <button onClick={toggleMute}>
                <svg height="100%" width="100%" viewBox="0 0 36 36">
                  <defs>
                    <clipPath id="hedgehog-svg-volume-animation-mask">
                      <path d="m 14.35,-0.14 -5.86,5.86 20.73,20.78 5.86,-5.91 z"></path>
                      <path d="M 7.07,6.87 -1.11,15.33 19.61,36.11 27.80,27.60 z"></path>
                      <path d="M 9.09,5.20 6.47,7.88 26.82,28.77 29.66,25.99 z"></path>
                    </clipPath>
                    <clipPath id="hedgehog-svg-volume-animation-slash-mask">
                      <path d="m -11.45,-15.55 -4.44,4.51 20.45,20.94 4.55,-4.66 z"></path>
                    </clipPath>
                  </defs>
                  <path
                    d="M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 Z"
                    fill="#fff"
                    id="hedge-id-15"
                  ></path>
                  {
                    <path
                      className={
                        videoRef.current?.volume >= 0.5 ||
                        videoRef.current?.volume === 0
                          ? classes.iconOpacityOn
                          : classes.iconOpacityOff
                      }
                      id="hedge-id-17"
                      fill="#fff"
                      d="M19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.77 C23.01,25.86 26,22.28 26,18 C26,13.72 23.01,10.14 19,9.23 L19,11.29 Z"
                    ></path>
                  }
                  {
                    <path
                      id={
                        videoRef.current?.volume === 0
                          ? ''
                          : classes.muteAnimation
                      }
                      d="M 9.25,9 7.98,10.27 24.71,27 l 1.27,-1.27 Z"
                      fill="#fff"
                    ></path>
                  }
                </svg>
                <span className={classes.controlDesc}>
                  {videoRef.current?.volume === 0
                    ? 'ხმის ჩართვა'
                    : 'ხმის გათიშვა'}
                </span>
              </button>
              <div className={classes.volumeControl}>
                <input
                  id="volumeInput"
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
              <p>{!currentTime ? '0:00' : convertHMS(currentTime)}</p>
              <span>/</span>
              <p>{!duration ? '0:00:00' : `-${convertHMS(duration)}`}</p>
            </div>
          </div>

          {/* control holder right */}
          <div className={classes.controlsHolderRight}>
            <div
              className={classes.rightControl}
              onClick={pictureInPictureHandler}
            >
              <svg className={classes.controlIcon} viewBox="0 0 36 36">
                <path
                  d="M24 17H16V22H24V17ZM28 26V10H8V26H28ZM26 24.02H10V11.97H26V24.02Z"
                  fill={picInPic ? '#0083ca' : '#e6e6e6'}
                ></path>
              </svg>
              <span className={classes.controlDesc}>სურათი სურათში</span>
            </div>
            <div className={classes.rightControl} onClick={fitScreenHandler}>
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
              <span className={classes.controlDesc}>გამოსახულების გაწელვა</span>
            </div>
            <div className={classes.rightControl} onClick={settingsVisHandler}>
              <div
                className={`${classes.settingsMenu} ${
                  settingsVis ? classes.settingsVisOn : classes.settingsVisOff
                }`}
              >
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
                      className={playbackRate === 1 ? classes.activeOption : ''}
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
                    {props.trailer ? trailerLanguages : languages}
                  </div>
                </div>

                {!props.trailer && (
                  <div>
                    <div className={classes.settingsSectionTitle}>
                      <h5>ხარისხი</h5>
                    </div>
                    <div className={classes.settingsSectionOptions}>
                      <p
                        onClick={() => {
                          props.changeQuality(true, dubsLanguage[1]);
                          setHighQuality(true);
                        }}
                        className={highQuality ? classes.activeOption : ''}
                      >
                        HD
                      </p>
                      <p
                        onClick={() => {
                          props.changeQuality(false, dubsLanguage[1]);
                          setHighQuality(false);
                        }}
                        className={!highQuality ? classes.activeOption : ''}
                      >
                        SD
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <svg
                viewBox="0 0 36 36"
                id={settingsVis ? classes.settingsIconActive : ''}
                className={classes.controlIcon}
              >
                <g>
                  <use href="#hedge-id-svg-movie-cog"></use>
                  <path
                    d="m 23.94,18.78 c .03,-0.25 .05,-0.51 .05,-0.78 0,-0.27 -0.02,-0.52 -0.05,-0.78 l 1.68,-1.32 c .15,-0.12 .19,-0.33 .09,-0.51 l -1.6,-2.76 c -0.09,-0.17 -0.31,-0.24 -0.48,-0.17 l -1.99,.8 c -0.41,-0.32 -0.86,-0.58 -1.35,-0.78 l -0.30,-2.12 c -0.02,-0.19 -0.19,-0.33 -0.39,-0.33 l -3.2,0 c -0.2,0 -0.36,.14 -0.39,.33 l -0.30,2.12 c -0.48,.2 -0.93,.47 -1.35,.78 l -1.99,-0.8 c -0.18,-0.07 -0.39,0 -0.48,.17 l -1.6,2.76 c -0.10,.17 -0.05,.39 .09,.51 l 1.68,1.32 c -0.03,.25 -0.05,.52 -0.05,.78 0,.26 .02,.52 .05,.78 l -1.68,1.32 c -0.15,.12 -0.19,.33 -0.09,.51 l 1.6,2.76 c .09,.17 .31,.24 .48,.17 l 1.99,-0.8 c .41,.32 .86,.58 1.35,.78 l .30,2.12 c .02,.19 .19,.33 .39,.33 l 3.2,0 c .2,0 .36,-0.14 .39,-0.33 l .30,-2.12 c .48,-0.2 .93,-0.47 1.35,-0.78 l 1.99,.8 c .18,.07 .39,0 .48,-0.17 l 1.6,-2.76 c .09,-0.17 .05,-0.39 -0.09,-0.51 l -1.68,-1.32 0,0 z m -5.94,2.01 c -1.54,0 -2.8,-1.25 -2.8,-2.8 0,-1.54 1.25,-2.8 2.8,-2.8 1.54,0 2.8,1.25 2.8,2.8 0,1.54 -1.25,2.8 -2.8,2.8 l 0,0 z"
                    id="hedge-id-svg-movie-cog"
                    fill={settingsVis ? '#0083ca' : '#fff'}
                  ></path>
                </g>
              </svg>
              <span className={classes.controlDesc}>კონფიგურაცია</span>
            </div>
            <div className={classes.rightControl} onClick={toggleTheaterMode}>
              {theaterMode ? (
                <svg viewBox="0 0 36 36" className={classes.controlIcon}>
                  <g>
                    <path
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
                      href="#hedge-id-theaterMode"
                    ></use>
                    <path
                      id="hedge-id-theaterMode"
                      className="hedgehog-svg-fill"
                      fillRule="evenodd"
                      d="m 28,11 0,14 -20,0 0,-14 z m -18,2 16,0 0,10 -16,0 0,-10 z"
                      fill="#fff"
                    ></path>
                  </g>
                </svg>
              )}
              <span className={classes.controlDesc}>თეატრის რეჟიმი</span>
            </div>
            <div className={classes.rightControl} onClick={fullscreenHandler}>
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
              <span className={classes.controlDesc}>მთელ ეკრანზე</span>
            </div>
          </div>
        </div>
        <div className={classes.bottomShadow} />
      </div>
    </div>
  );
};

export default MoviePlayer;

// props.playerData?.files[0].files[highQuality[1]]
