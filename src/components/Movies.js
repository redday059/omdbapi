import React from 'react';
import MoviesSearchForm from './MoviesSearchForm';
import MoviesList from './MoviesList';
import qs from 'qs';

export default class Movies extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      movieList: []
    }
  }

  fetchList = (values, onSuccess, onError) => {

    // TODO:

    return fetch(`http://www.omdbapi.com?apikey=128ccc64&${qs.stringify(values)}`, {method: 'GET'})
      .then(response => {
        console.log(response);
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
    console.log('fetch success', data)
    this.setState({movieList: data.Search})
  }
  onFetchError = data => console.log(data)
  onSearchSubmit = (data) => {
    this.fetchList(data, this.onFetchSuccess, this.onFetchError)
  }

  renderSearchForm() {
    return <MoviesSearchForm onSubmit={this.onSearchSubmit}/>
  }

  renderList() {
    return <MoviesList list={this.state.movieList}/>
  }
  render() {
    return (
      <div>
        {this.renderSearchForm()}
        {this.renderList()}
      </div>
    )
  }
}
