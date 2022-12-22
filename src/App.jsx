import React, { useEffect, useState } from 'react';

import './App.css';
import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie'; // const dummyMovies = [

// const dummyMovies = [
//   {
//     id: 1,
//     title: 'Some Dummy Movie',
//     openingText: 'This is the opening text of the movie',
//     releaseDate: '2021-05-18',
//   },
//   {
//     id: 2,
//     title: 'Some Dummy Movie 2',
//     openingText: 'This is the second opening text of the movie',
//     releaseDate: '2021-05-19',
//   },
// ];

function App() {
  const [isFetchingMovies, setIsFetchingMovies] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = () => {
    setIsFetchingMovies(true);
  };

  const addMovieHandler = async (movie) => {
    // POST
    try {
      const response = await fetch(
        'https://react-movies-b2487-default-rtdb.europe-west1.firebasedatabase.app/movies.json',
        {
          method: 'POST',
          body: JSON.stringify(movie),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(movie);
    }
  };

  // 1) we can do it in Promise style
  // useEffect(() => {
  //   if (isFetchingMovies) {
  //     fetch('https://swapi.dev/api/films/', { method: 'GET' })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const fetchedMovies = data.results.map((movie) => ({
  //           id: movie.episode_id,
  //           title: movie.title,
  //           openingText: movie.opening_crawl,
  //           releaseDate: movie.release_date,
  //         }));
  //
  //         setError(null);
  //         setIsFetchingMovies(false);
  //         setMovies(fetchedMovies);
  //       })
  //       .catch((error) => {
  //         setError(error);
  //         setIsFetchingMovies(false);
  // });
  //   }
  // }, [isFetchingMovies]);

  // 2) we can do it in async-await style
  useEffect(() => {
    if (isFetchingMovies) {
      setError(null);
      const fetchAndSetData = async () => {
        try {
          // GET
          // const response = await fetch('https://swapi.dev/api/films/', {
          //   method: 'GET',
          // });
          const response = await fetch(
            'https://react-movies-b2487-default-rtdb.europe-west1.firebasedatabase.app/movies.json',
            {
              method: 'GET',
            },
          );

          if (!response.ok) {
            throw new Error('Something went wrong');
          }

          const data = await response.json();
          const fetchedMovies = Object.entries(data).map(
            ([id, { title, openingText, releaseDate }]) => ({
              id,
              title,
              openingText,
              releaseDate,
            }),
          );

          setError(null);
          setMovies(fetchedMovies);
        } catch (err) {
          setError(err);
        }
        setIsFetchingMovies(false);
      };

      fetchAndSetData();
    }
  }, [isFetchingMovies]);

  let content = <p>You have no movies to show for now. Please fetch movies!</p>;

  if (isFetchingMovies) {
    content = <p>Your movies are loading...</p>;
  }

  if (error && !isFetchingMovies) {
    content = <p>Something went wrong. Please try again later...</p>;
  }

  if (!isFetchingMovies && movies.length !== 0 && !error) {
    content = <MoviesList movies={movies} />;
  }

  return (
    <>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button type="button" onClick={fetchMoviesHandler}>
          Fetch Movies
        </button>
      </section>
      <section>{content}</section>
    </>
  );
}

export default App;
