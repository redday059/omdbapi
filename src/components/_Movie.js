import React, {Component} from 'react';

class Movie extends Component {

  constructor(props) {
    super(props);

    this.state = {
      movieData: null,
    }
  }

  fetchMovieData = (id, onSuccess, onError) => {

    return fetch(`http://www.omdbapi.com?apikey=128ccc64&i=${id}`, {method: 'GET'})
      .then(response => {
        if (response.ok) {
          return response;
        }

        throw new Error();
      })
      .then(response => response.json())
      .then(response => onSuccess(response))
      .catch(error => {
        onError(error)
      })
      ;
  };

  onFetchSuccess = data => {
    this.setState({ movieData: data });
  };

  onFetchError = data => console.log('error from error:', data);

  componentDidMount() {
    const imbID = this.props.match.params.id;
    this.fetchMovieData(imbID, this.onFetchSuccess, this.onFetchError);
  }

  renderDescription = (movieDataItems) => {
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
                    {/*<dd className="col-sm-7"> {(movieData[key][i]).toString()}</dd>*/}
                    <dd className="col-sm-7">{movieDataItems[key][i]['Value']}</dd>
                  </dl>
                ))
                : ''}
          </dd>
        </dl>
      )
    })
  };

  render() {
    if (!this.state.movieData) {
      console.log('preloader');
      return (<div>Preloader</div>)
    }

    const { movieData } = this.state;

    return (<div className='container o-h'>
      {this.renderDescription(movieData)}
    </div>)
  }
}

export default Movie;
