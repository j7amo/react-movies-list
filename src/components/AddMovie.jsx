/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react';
import * as PropTypes from 'prop-types';

import classes from './AddMovie.module.css';

function AddMovie(props) {
  const { onAddMovie } = props;

  const titleRef = useRef();
  const openingTextRef = useRef();
  const releaseDateRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    // could add validation here...

    const movie = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };

    onAddMovie(movie);
    titleRef.current.value = '';
    openingTextRef.current.value = '';
    releaseDateRef.current.value = '';
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" ref={titleRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="opening-text">Opening Text</label>
        <textarea rows="5" id="opening-text" ref={openingTextRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="date">Release Date</label>
        <input type="text" id="date" ref={releaseDateRef} />
      </div>
      <button type="submit">Add Movie</button>
    </form>
  );
}

AddMovie.propTypes = {
  onAddMovie: PropTypes.func.isRequired,
};

export default AddMovie;
