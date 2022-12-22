import React from 'react';
import * as PropTypes from 'prop-types';

import classes from './MoviesList.module.css';
import Movie from './Movie';

function MovieList(props) {
  const { movies } = props;

  return (
    <ul className={classes['movies-list']}>
      {movies.map((movie) => (
        <Movie
          key={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
        />
      ))}
    </ul>
  );
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      releaseDate: PropTypes.string.isRequired,
      openingText: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default MovieList;
