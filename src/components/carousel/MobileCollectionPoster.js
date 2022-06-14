import classes from './MobileCollectionPoster.module.css';

const MobileCollectionPoster = props => {
  return (
    <div className={classes.collectionPoster}>
      <a href="#">
        <img src={props.data.posters.data['0'].covers['367']} alt="poster" />
        <div className={classes.titleContainer}>
          <h5>{props.data.name}</h5>
          <p>{`${props.data.moviesCount.data.count} ფილმი`}</p>
        </div>
      </a>
    </div>
  );
};

export default MobileCollectionPoster;
