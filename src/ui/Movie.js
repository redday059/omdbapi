import React from 'react';
import styled from "styled-components";
import './movie.css';
import ImageComponent from "../components/ImageComponent";

const Loading = styled.div`
  margin: 5em auto;
  text-align: center;
`;

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
    return (<Loading>Page is loading...</Loading>)
  }

  const poster = props.movieData['Poster'];
  const externalLink = props.movieData['Website'];

  // Poster and Website are rendered separately, and shouldn't be passed in renderDescription
  delete props.movieData['Poster'];
  delete props.movieData['Website'];
  // Doesn't need to be shown on the page.
  delete props.movieData['Response'];

  return (<div className='container movie o-h'>
    <div className="row">
      <div className="col-12 col-sm-3 col-md-4">
        <ImageComponent
          src={{ default: poster }}
          alt='movie poster'
          className='image-poster'
          width={{
            xsmall: '260',
            small: '100',
            medium: '200',
            large: '100%',
          }}
          withPreloader={true}
        />
      </div>
      <div className="col-12 col-sm-9 col-md-8">
        {renderDescription(props.movieData)}
        <dl key='external-link' className="row">
          <dt className="col-sm-5">Site</dt>
          <dd className="col-sm-7">
            {(!externalLink || externalLink === "N/A") ? 'N/A'
              : <a target="_blank" href={externalLink}>
              {externalLink ? externalLink.split('www.')[1].split('/')[0] : '' }
            </a>}
          </dd>
        </dl>
      </div>
    </div>
  </div>)
};

export default Movie;
