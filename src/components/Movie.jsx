import React from 'react';
import * as PropTypes from 'prop-types';

import classes from './Movie.module.css';

function Movie(props) {
  const { releaseDate, openingText, title } = props;

  return (
    <li className={classes.movie}>
      <h2>{title}</h2>
      <h3>{releaseDate}</h3>
      <p>{openingText}</p>
    </li>
  );
}

Movie.propTypes = {
  releaseDate: PropTypes.string.isRequired,
  openingText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Movie;
