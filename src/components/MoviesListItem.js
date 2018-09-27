import React from 'react';


const MoviesListItem = (props) => {
  const { Poster, Title, Type, Year, imdbID} = props;
  const sectionStyle = {
    width: "100%",
    height: "auto",
    backgroundImage: `url(${Poster})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div className="col-12 col-md-6 card" key={imdbID}>
      <div className="row p-3">
        <div className="col-3" style={sectionStyle}>
        </div>
        <div className="col-9">
          <dl className="row">
            <dt className="col-sm-4">Title:</dt>
            <dd className="col-sm-8">{Title}</dd>
            <dt className="col-sm-4">Type:</dt>
            <dd className="col-sm-8">{Type}</dd>
            <dt className="col-sm-4">Year:</dt>
            <dd className="col-sm-8">{Year}</dd>
            <dt className="col-sm-4">mdbID:</dt>
            <dd className="col-sm-8">{imdbID}</dd>
          </dl>
        </div>
      </div>
    </div>
  )
};

export default MoviesListItem;

{/*<div>*/}
{/*Title:*/}
{/*{' '}*/}
{/*{Title}*/}
{/*</div>*/}
{/*<div>*/}
{/*Type:*/}
{/*{' '}*/}
{/*{Type}</div>*/}
{/*<div>*/}
{/*Year:*/}
{/*{' '}*/}
{/*{Year}</div>*/}
{/*<div>*/}
{/*mdbID:*/}
{/*{' '}*/}
{/*{imdbID}*/}
{/*</div>*/}