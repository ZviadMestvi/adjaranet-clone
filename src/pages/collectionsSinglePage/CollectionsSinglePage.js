import { useEffect, useState, useContext } from 'react';
import { collections as allCollections } from '../../HelperConsts';
import AppContext from '../../store/context';

import CollectionPoster from '../../components/carousel/CollectionPoster';
import SearchBar from '../../components/search/SearchBar';
import classes from './CollectionsSinglePage.module.css';

const CollectionsSinglePage = () => {
  const context = useContext(AppContext);
  const [openedFilter, setOpenedFilter] = useState(false);
  const [collectionsArray, setCollectionsArray] = useState();
  const [defaultSorting, setDefaultSorting] = useState();
  const [sortTypeDate, setSortTypeDate] = useState(false);
  const [carouselItemCount, setCarouselItemCount] = useState(
    window.innerWidth >= 1000 ? 5 : 2
  );

  const splitToChunks = (array, chunkSize) => {
    let result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }

    setCollectionsArray(result);
  };

  useEffect(() => {
    fetch(allCollections, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        splitToChunks(data.data, carouselItemCount);
        setDefaultSorting(data.data);
      })
      .catch(err => console.log(err));
  }, [carouselItemCount]);

  const sortByDate = () => {
    const result = defaultSorting?.slice().sort((a, b) => {
      return new Date(b.createDate) - new Date(a.createDate);
    });

    setSortTypeDate(true);
    splitToChunks(result, carouselItemCount);
  };

  const sortByPopularity = () => {
    setSortTypeDate(false);
    splitToChunks(defaultSorting, carouselItemCount);
  };

  const collections = collectionsArray?.map((chunk, i) => {
    return (
      <div key={i} className={classes.collectionsChunk}>
        {chunk.map(collection => {
          return <CollectionPoster key={collection.id} data={collection} />;
        })}
      </div>
    );
  });

  return (
    <div className={classes.wrapper} data-theme={context.theme ? 'dark' : ''}>
      <div className={classes.container}>
        <SearchBar />

        <div className={classes.headerContainer}>
          <h1>კოლექციები</h1>
          <div
            className={classes.filter}
            onClick={() => setOpenedFilter(!openedFilter)}
          >
            <div
              className={classes.filterText}
              style={{
                borderColor: context.theme ? '#3d3d3d' : '#dddddd',
                backgroundColor: context.theme ? 'transparent' : 'white',
              }}
            >
              {sortTypeDate ? 'დამატების თარიღით' : 'პოპულარობით'}
              <svg
                width="18"
                height="11"
                fill="none"
                className="fade-ready svg-icon svg-icon--arrow-down"
              >
                <path
                  d="M8.707 7.293L16 0l1.414 1.414-8.707 8.707L0 1.414 1.414 0l7.293 7.293z"
                  fill="#999999"
                ></path>
              </svg>
            </div>
            {openedFilter && (
              <ul>
                <li onClick={sortByPopularity}>
                  <p>პოპულარობით</p>
                </li>

                <li onClick={sortByDate}>
                  <p>დამატების თარიღით</p>
                </li>
              </ul>
            )}
          </div>
        </div>

        <div className={classes.resultsCount}>
          <p>შედეგი: {defaultSorting?.length}</p>
        </div>

        <div className={classes.collectionsWrapper}>{collections}</div>
      </div>
    </div>
  );
};

export default CollectionsSinglePage;
