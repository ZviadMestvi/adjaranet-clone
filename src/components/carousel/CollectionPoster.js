import { useNavigate } from 'react-router-dom';

import classes from './CollectionPoster.module.css';

const CollectionPoster = props => {
  const navigate = useNavigate();

  const goToCollectionMovies = () => {
    navigate(`/collections/${props.data.id}`, {
      state: {
        collectionData: props.data,
        url: `https://api.adjaranet.com/api/v1/lists/${props.data.id}/movies?page=1&per_page=21&filters%5Bwith_actors%5D=3&filters%5Bwith_directors%5D=1&source=adjaranet`,
      },
    });
  };

  return (
    <div className={classes.collectionPoster} onClick={goToCollectionMovies}>
      <div className={classes.container}>
        <img src={props.data.posters?.data['0'].covers['367']} alt="poster" />
        <div className={classes.titleContainer}>
          <h5>{props?.data.name}</h5>
          <p>{`${props.data.moviesCount?.data.count} ფილმი`}</p>
        </div>
      </div>
    </div>
  );
};

export default CollectionPoster;
