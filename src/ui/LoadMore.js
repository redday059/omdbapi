import React from 'react';

const LoadMore = (props) => {
  const { handleClick } = props;
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center mb-5">
          <button onClick={handleClick} className="btn btn-primary mt-3">
            <span>Load more</span>
          </button>
        </div>
      </div>
    </div>
  )
};

export default LoadMore;
