import React from 'react';
import { Link } from 'react-router-dom';
import ImageComponent from "../components/ImageComponent";
import '../components/style.css'

const MoviesListItem = (props) => {
  const { Poster, Title, Type, Year, imdbID} = props;

  return (
    <div className="col-12 col-md-6 card" key={imdbID}>
      <div className="row p-3">
        <div className="col-3">
          {Poster !== 'N/A' ?
            <ImageComponent
            src={{ default: Poster }}
            alt='movie poster'
            width='100%'
            className='image-preview'
            withPreloader={true}
            />
              : <div>No image</div>}
        </div>
        <div className="col-9">
          <dl className="row">
            <dt className="col-sm-5">Title:</dt>
            <dd className="col-sm-7">{Title}</dd>
            <dt className="col-sm-5">Type:</dt>
            <dd className="col-sm-7">{Type}</dd>
            <dt className="col-sm-5">Year:</dt>
            <dd className="col-sm-7">{Year}</dd>
            <dt className="col-sm-5">imdbID:</dt>
            <dd className="col-sm-7">{imdbID}</dd>
          </dl>
        </div>
      </div>
      <div className="card-body d-flex flex-row-reverse">
        <Link className="btn btn-primary btn-danger float-right mt-auto" to={`/movie/${imdbID}`}>
          Go to movie page
        </Link>
      </div>
    </div>
  )
};

export default MoviesListItem;
