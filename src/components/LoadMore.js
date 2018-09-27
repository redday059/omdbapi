import React from 'react';

const LoadMore = (props) => {
  const { handleClick } = props;
  return (
    <button onClick={handleClick} className="btn btn-primary mt-3">
      <span>Load more</span>
    </button>
  )
};

export default LoadMore;
