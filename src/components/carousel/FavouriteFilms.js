// import { useContext, useEffect, useState } from 'react';

// import MoviePoster from './MoviePoster';
// import AuthContext from '../../store/context';
// import classes from './FavouriteFilms.module.css';

// const FavouriteFilms = props => {
//   const context = useContext(AuthContext);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [filmsData, setFilmsData] = useState();

//   const firstSlide = currentSlide === 0;
//   const lastSlide = currentSlide === context.favouriteFilms?.length - 1;

//   const prevSlide = () => {
//     if (firstSlide) return;
//     setCurrentSlide(currentSlide - 1);
//   };

//   const nextSlide = () => {
//     if (lastSlide) return;
//     setCurrentSlide(currentSlide + 1);
//   };

//   console.log(filmsData);

//   useEffect(() => {
//     fetch(
//       `https://adjaranet-68699-default-rtdb.europe-west1.firebasedatabase.app/users/${context.userKey}/favouriteFilms.json`
//     )
//       .then(res => res.json())
//       .then(data => setFilmsData(data));
//   }, [context.userKey]);

//   return (
//     <div className={classes.wrapper}>
//       <div className={classes.headerContainer}>
//         <div className={classes.titleContainer}>
//           <h1>{props.title}</h1>
//         </div>

//         <div className={classes.slideBtnsContainer}>
//           <button
//             className={firstSlide ? classes.unavailable : ''}
//             onClick={prevSlide}
//           >
//             <svg
//               className="svg-icon svg-icon--prevArrow"
//               fill="none"
//               viewBox="0 0 11 18"
//               width="11"
//             >
//               <path
//                 fill="#999"
//                 d="M2.828 8.707L10.121 16l-1.414 1.414L0 8.707 8.707 0l1.414 1.414-7.293 7.293z"
//               ></path>
//             </svg>
//           </button>

//           <button
//             className={lastSlide ? classes.unavailable : ''}
//             onClick={nextSlide}
//           >
//             <svg
//               className="svg-icon svg-icon--nextArrow"
//               fill="none"
//               viewBox="0 0 11 18"
//               width="11"
//             >
//               <path
//                 fill="#999"
//                 d="M7.29297 8.707L-.00003 16l1.414 1.414L10.121 8.707 1.41397 0l-1.414 1.414 7.293 7.293z"
//               ></path>
//             </svg>
//           </button>
//         </div>
//       </div>

//       <div className={classes.moviesWrapper}>
//         <div
//           className={classes.movies}
//           style={{
//             transform: `translateX(-${200 * currentSlide}px)`,
//           }}
//         >
//           <div className={classes.moviesContainer}>{}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FavouriteFilms;
