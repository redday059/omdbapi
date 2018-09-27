import React from 'react';

const LoadMore = (props) => {
  const { handleClick } = props;
  return (
    <button onClick={handleClick}>
      <span>Load more</span>
    </button>
  )
};

export default LoadMore;
