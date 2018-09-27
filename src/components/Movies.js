import React from 'react';
import MoviesSearchForm from './MoviesSearchForm';
import MoviesList from './MoviesList';
import qs from 'qs';
import LoadMore from "./LoadMore";

export default class Movies extends React.Component {
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
    }
  };

  fetchList = (onSuccess, onError) => {

    const { formData, lastQuery, page } = this.state;
    const queryString = qs.stringify(formData);
    const isTheSameQuery = queryString === lastQuery || lastQuery === '' ;
    const nextPage = (isTheSameQuery) ? (page + 1) : 1;

    const nextState = (isTheSameQuery) ?
      {...this.state, ...{page: nextPage}, ...{lastQuery: queryString}} :
      {...this.getDefaultState(), ...{lastQuery: queryString}, ...{page: nextPage}, ...{formData: formData}};

    console.log('nextState', nextState);

    return fetch(`http://www.omdbapi.com?apikey=128ccc64&${queryString}&page=${nextPage}`, {method: 'GET'})
      .then(response => {
        if (response.ok) {
          return response;
        }

        throw new Error();
      })
      .then(response => response.json())
      .then(response => onSuccess(response, nextState))
      .catch(error => {
        onError(error)
      })
      ;
  };

  onFetchSuccess = (data, nextState) => {
    this.setState(state => ({
      ...nextState,
      ...{totalResults: data.totalResults},
      ...{movieList: [...nextState.movieList, ...data.Search]},
    }))
  };

  onFetchError = data => console.log('Error', data);

  onSearchSubmit = (data) => {
    this.setState({ formData: data }, () => this.fetchList(this.onFetchSuccess, this.onFetchError));
  };

  loadMore = () => {
    console.log('this.state', this.state);
    this.fetchList(this.onFetchSuccess, this.onFetchError);
  };

  renderSearchForm() {
    return <MoviesSearchForm onSubmit={this.onSearchSubmit}/>
  }

  renderList() {
    return <MoviesList list={this.state.movieList}/>
  }

  renderPagination() {
    const { totalResults, movieList } = this.state;
    if (!(totalResults > movieList.length)) {
      return null;
    }

    return <LoadMore handleClick={this.loadMore} />
  }

  render() {
    return (
      <div>
        {this.renderSearchForm()}
        {this.renderList()}
        {this.renderPagination()}
      </div>
    )
  }
}
