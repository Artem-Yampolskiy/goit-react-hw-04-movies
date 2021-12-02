import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AppBar from './Components/AppBar';
import Container from './Components/Container';

const HomePage = lazy(() =>
  import('./Pages/HomePage' /* webpackChunkName: 'home-page' */),
);
const MoviesPage = lazy(() =>
  import('./Pages/MoviesPage' /* webpackChunkName: 'movies-page' */),
);
const NotFoundPage = lazy(() =>
  import('./Pages/NotFoundPage' /* webpackChunkName: 'not-found-page' */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './Pages/MovieDetailsPage' /* webpackChunkName: 'movie-details-page' */
  ),
);

export default function App() {
  return (
    <Container>
      <AppBar />

      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/movies" element={<MoviesPage />} />

          <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />

          <Route element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Container>
  );
}
