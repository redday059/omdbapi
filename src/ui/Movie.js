import React, {Component} from 'react';

const renderDescription = (movieDataItems) => {
    return (Object.keys(movieDataItems)).map( key => {
      return (
        <dl key={key} className="row">
          <dt className="col-sm-5">{`${key}:`}</dt>
          <dd className="col-sm-7">
            {typeof movieDataItems[key] === 'string' ? movieDataItems[key]
              : typeof movieDataItems[key] === 'object' ?
                Object.keys(movieDataItems[key]).map( i => (
                  <dl key={i} className="row">
                    <dt className="col-sm-5">{movieDataItems[key][i]['Source']}{':'}</dt>
                    <dd className="col-sm-7">{movieDataItems[key][i]['Value']}</dd>
                  </dl>
                ))
                : ''}
          </dd>
        </dl>
      )
    })
  };

const Movie = (props) => {
  if (!props.movieData) {
    console.log('preloader');
    return (<div>Preloader</div>)
  }

  return (<div className='container o-h'>
    {renderDescription(props.movieData)}
  </div>)
}

export default Movie;
