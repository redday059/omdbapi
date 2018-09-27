import React, {Component} from 'react';
import Movie from "./Movie";

class MovieFetcher extends Component {

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

  render() {
    return <Movie movieData={this.state.movieData}/>
  }
}

export default MovieFetcher;
