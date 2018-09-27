import React from 'react';
import MoviesSearchForm from './MoviesSearchForm';
import MoviesList from './MoviesList';
import LoadMore from "./LoadMore";

const NotFound = props => {
  return (
    <React.Fragment>
      { props.notFound ? (<div>Movie not found</div>) : null}
    </React.Fragment>
  )
};

const Movies = ({ onSearchSubmit, movieList, totalResults, loadMore, notFound }) => {
  const renderSearchForm = () => {
    return <MoviesSearchForm onSubmit={onSearchSubmit}/>
  };

  const renderList = () => {
    return <MoviesList list={movieList}/>
  };

  const renderPagination = () => {
    if (!(totalResults > movieList.length)) {
      return null;
    }

    return <LoadMore handleClick={loadMore} />
  };

  const renderNotFound = () => {
    return <NotFound notFound={notFound}/>
  };

    return (
      <div>
        {renderSearchForm()}
        {renderNotFound()}
        {renderList()}
        {renderPagination()}
      </div>
    )
};

export default Movies;
