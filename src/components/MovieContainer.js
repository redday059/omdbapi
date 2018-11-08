import React, {Component} from 'react';
import Movie from "../ui/Movie";
import {OMDB_URL} from "../constants";
import configWebfonts from "../config/webfonts-movie";
import WebfontLoader from "./WebfontLoader";

class MovieContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      movieData: null,
    }
  }

  fetchMovieData = (id, onSuccess, onError) => {

    return fetch(`${OMDB_URL}&i=${id}`, {method: 'GET'})
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
    return (
      <WebfontLoader {...configWebfonts}>
        <Movie movieData={this.state.movieData} />
      </WebfontLoader>
    )
  }
}

export default MovieContainer;
