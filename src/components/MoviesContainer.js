import React from 'react';
import qs from 'qs';
import Movies from "../ui/Movies";
import { OMDB_URL } from "../constants";

export default class MoviesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState()
  }

  getDefaultState = () => {
    return {
      movieList: [],
      totalResults: 0,
      lastQuery: '',
      page: 0,
      formData: {},
      notFound: false
    }
  };

  getNextState = () => {
    const { formData, lastQuery, page } = this.state;
    const queryString = qs.stringify(formData);
    const isTheSameQuery = queryString === lastQuery || lastQuery === '' ;

    return (isTheSameQuery) ?
      {
        ...this.state,
        page: page + 1,
        lastQuery: queryString
      } : {
        ...this.getDefaultState(),
        lastQuery: queryString,
        page: 1,
        formData
      };
  };

  fetchList = (onSuccess, onError) => {
    const nextState = this.getNextState();
    const {lastQuery: queryString, page} = nextState;

    return fetch(`${OMDB_URL}&${queryString}&page=${page}`, {method: 'GET'})
      .then(response => {
        if (response.ok) {
          return response;
        }

        throw new Error('unknown server error');
      })
      .then(response => response.json())
      .then(response => onSuccess(response, nextState))
      .catch(error => {
        onError(error)
      })
      ;
  };

  onFetchSuccess = (data, nextState) => {
    if (data.Response !== 'True') {
      this.setState({...this.getDefaultState(), notFound: true});
      return;
    }

    this.setState(state => ({
      ...nextState,
      ...{totalResults: data.totalResults},
      ...{movieList: [...nextState.movieList, ...data.Search]},
      notFound: false
    }))
  };

  onFetchError = data => console.log('Error', data);

  onSearchSubmit = (data) => {
    this.setState({ formData: data }, () => this.fetchList(this.onFetchSuccess, this.onFetchError));
  };

  loadMore = () => {
    this.fetchList(this.onFetchSuccess, this.onFetchError);
  };

  render() {
    const {movieList, totalResults, notFound} = this.state;
    return (
      <Movies
        onSearchSubmit={this.onSearchSubmit}
        movieList={movieList}
        totalResults={totalResults}
        loadMore={this.loadMore}
        notFound={notFound}
      />
    )
  }
}
