import { useState, useEffect,lazy, Suspense  } from 'react';
import { Link, useParams, useNavigate, useLocation, Route, Routes } from 'react-router-dom';
import * as moviesAPI from '../../Services/moveis-api';

import styles from './MovieDetailsPage.module.css';

const Cast = lazy(() =>
  import('../../Components/Cast' /* webpackChunkName: 'cast' */),
);
const Reviews = lazy(() =>
  import('../../Components/Reviews' /* webpackChunkName: 'reviews' */),
);

const MovieDetailsPage = () => {
  const { state } = useLocation();
  const { movieId } = useParams();  
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
    
  useEffect(() => {
    moviesAPI.fetchMovieDetails(movieId).then(setMovie);
  }, [movieId]);
  
  const handleGoBack = () => {
    if (state?.query) {
      navigate({
        pathname: state.backUrl,
        search: `query=${state.query}`,
      });
      return;
    }

    if (!state?.query && state?.backUrl) {
      navigate({
        pathname: state.backUrl,
      });
      return;
    }

    navigate({
      pathname: '/',
    });
  };
  
  return (
    <>
      
      <button className={styles.btn} onClick={handleGoBack}>
        Go Back
      </button>
      {movie && (
        <>
          <h1>{movie.title}</h1>
          <p>User Score: {movie.vote_average * 10}%</p>
          <div className={styles.imageWrapper}>
            <img
              className={styles.img}
              src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
              alt={movie.title}
            />
            <div>
              <h2>Overview</h2>
              <p>{movie.overview}</p>

              <h2>Genres</h2>
              <p>{movie.genres.map(genre => `${genre.name} `)}</p>
            </div>
          </div>
          <div>
            <h3>Additional information</h3>
            <ul className={styles.list}>
              <li className={styles.link}>
                <Link to="cast">
                  Cast
                </Link>
              </li>
              <li className={styles.link}>
                <Link to="reviews">
                  Reviews
                </Link>
              </li>
            </ul>

            <Suspense fallback={<h1>Loading...</h1>}>
              <Routes>
                <Route path="cast" element={<Cast />} />         
                <Route path="reviews" element={<Reviews />} />
              </Routes>
            </Suspense>
          </div>
        </>
      )}
    </>
  );
};

export default MovieDetailsPage;