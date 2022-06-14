import { useContext } from 'react';
import AuthContext from '../../store/context';
import classes from './HoverInfo.module.css';

const HoverInfo = props => {
  const context = useContext(AuthContext);
  const topPosition = props.topPosition - 15;
  const displayRight = props.rightPosition + 10;
  const displayLeft = props.rightPosition - 594;
  const posterPosition = props.rightPosition >= window.innerWidth / 2;

  const addFavouriteFilm = () => {
    fetch(
      `https://adjaranet-68699-default-rtdb.europe-west1.firebasedatabase.app/users/${context.userKey}/favouriteFilms.json`,
      {
        method: 'POST',
        body: JSON.stringify(props.data),
        headers: { 'Content-Type': 'application/json' },
      }
    );
  };

  return (
    <div
      className={classes.wrapper}
      style={{
        top: topPosition,
        left: posterPosition ? displayLeft : displayRight,
      }}
      data-theme={context.theme ? 'dark' : ''}
    >
      <div>
        <div className={classes.titleContainer}>
          <div>
            <h4>{props.data.originalName}</h4>
            <h5>{props.data.primaryName}</h5>
          </div>

          <div className={classes.timeContainer}>
            <svg fill="none" viewBox="0 0 17 17" width="17">
              <path stroke="#1A90CF" d="M7 9.5h5M7.5 10V5"></path>
              <circle cx="8.5" cy="8.5" r="8" stroke="#0083C9"></circle>
            </svg>
            <span>{`${Math.floor(props.data.duration / 60)}:${
              props.data.duration % 60
            }`}</span>
          </div>
        </div>

        <div className={classes.infoContainer}>
          <div>
            <p>გამოშვების წელი:</p>
            <span>{props.data.year}</span>
          </div>
          <div>
            <p>ქვეყანა:</p>
            <span>{props.data.countries.data[0]?.primaryName}</span>
          </div>
          <div>
            <p>რეჟისორი:</p>
            <span>{props.data.directors.data[0]?.primaryName}</span>
          </div>
          <div>
            <p>როლებში:</p>
            <span>{props.data.actors.data[0]?.primaryName}</span>
          </div>
        </div>

        <div className={classes.description}>
          <h5>მოკლე აღწერა:</h5>
          <p>{props.data.plot.data.description}</p>
        </div>
      </div>

      <div className={classes.bottomContainer}>
        <div>
          <svg fill="none" viewBox="0 0 10 12" width="10">
            <path
              fill="#1A90CF"
              d="M.62671 12c-.16176-.001-.31705-.0611-.43436-.168-.06113-.0556-.10974-.1227-.14282-.1971a.5709.5709 0 0 1-.04952-.2352V.60038C-.0003.49266.02969.38686.08679.29412.1439.2014.226.12515.32446.07346.4229.02176.53407-.00348.64621.00039c.11216.00386.22114.0367.31548.09505l8.7514 5.39964c.088.05437.16038.12908.21051.21728.05012.08819.07639.18705.07639.28751s-.02627.19932-.07639.28751c-.05013.0882-.12251.16291-.21051.21728L.9617 11.9043c-.09985.062-.2161.0952-.33499.0957zm.6235-10.30079v8.60159l6.96938-4.30108-6.96938-4.30051z"
            ></path>
          </svg>
          <span>ტრეილერი</span>
        </div>
        <div onClick={addFavouriteFilm}>
          <svg fill="none" viewBox="0 0 22 12" width="22">
            <path
              stroke="#1A90CF"
              d="M21.5 6.00003c0 1.38811-1.0384 2.75487-2.9613 3.80369C16.6348 10.8422 13.9704 11.5 11 11.5c-2.97039 0-5.63481-.6578-7.53875-1.69628C1.53841 8.7549.5 7.38814.5 6.00003c0-1.38811 1.03841-2.75487 2.96125-3.80369C5.36519 1.15783 8.02961.50004 11 .50004c2.9704 0 5.6348.65779 7.5387 1.6963C20.4616 3.24516 21.5 4.61192 21.5 6.00003z"
            ></path>
            <circle cx="11" cy="6" r="2.5" stroke="#1A90CF"></circle>
          </svg>
          <span>ვაპირებ ყურებას</span>
        </div>
        <div>
          <svg
            fill="none"
            viewBox="0 0 40 22"
            width="40"
            className="svg-icon svg-icon--imdb"
          >
            <path
              fill={!context.theme ? '#828282' : '#d5ddf5'}
              d="M7.07959 6.98099h1.08496V15H7.07959V6.98099zm3.24411 0h1.6167l2.0464 5.45701 2.0571-5.45701h1.6167V15h-1.0581V7.95853l-2.0678 5.49997h-1.0904l-2.0678-5.49997V15h-1.0528V6.98099zm10.5811.8916v6.23581h1.3105c1.1065 0 1.9157-.2506 2.4278-.7519.5156-.5013.7734-1.2927.7734-2.374 0-1.07427-.2578-1.86024-.7734-2.35796-.5121-.5013-1.3213-.75195-2.4278-.75195h-1.3105zm-1.085-.8916h2.229c1.5541 0 2.6945.32405 3.4214.97217.7269.64453 1.0903 1.65429 1.0903 3.02934 0 1.3821-.3652 2.3973-1.0957 3.0454-.7304.6481-1.8691.9721-3.416.9721h-2.229V6.98099zm12.751 5.01661c0-.7269-.1504-1.2962-.4512-1.708-.2972-.41538-.7072-.62307-1.23-.62307-.5227 0-.9345.20769-1.2353.62307-.2972.4118-.4458.9811-.4458 1.708s.1486 1.298.4458 1.7134c.3008.4118.7126.6176 1.2353.6176.5228 0 .9328-.2058 1.23-.6176.3008-.4154.4512-.9865.4512-1.7134zm-3.3623-2.10011c.2077-.35807.4691-.62305.7842-.79492.3187-.17546.6982-.26318 1.1386-.26318.7305 0 1.3231.29004 1.7779.87011.4583.5801.6875 1.3428.6875 2.2881s-.2292 1.708-.6875 2.2881c-.4548.5801-1.0474.8701-1.7779.8701-.4404 0-.8199-.0859-1.1386-.2578-.3151-.1755-.5765-.4422-.7842-.8003V15h-.9937V6.64261h.9937v3.25488z"
            ></path>
            <rect
              width="39"
              height="21"
              x=".5"
              y=".50003"
              stroke="#0093E6"
              rx="3.5"
            ></rect>
          </svg>
          <span>{props.data.rating.imdb.score.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

export default HoverInfo;
