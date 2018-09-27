import React from 'react';
import MoviesSearchForm from './MoviesSearchForm';
import MoviesList from './MoviesList';
import qs from 'qs';
import LoadMore from "./LoadMore";

const NotFound = props => {
  return (
    <React.Fragment>
      { props.notFound ? (<div>Movie not found</div>) : null}
    </React.Fragment>
  )
};

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
  }

  fetchList = (onSuccess, onError) => {
    const nextState = this.getNextState()
    const {lastQuery: queryString, page} = nextState

    return fetch(`http://www.omdbapi.com?apikey=128ccc64&${queryString}&page=${page}`, {method: 'GET'})
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

  renderNotFound() {
    return <NotFound notFound={this.state.notFound}/>
  }
  render() {
    return (
      <div>
        {this.renderSearchForm()}
        {this.renderNotFound()}
        {this.renderList()}
        {this.renderPagination()}
      </div>
    )
  }
}
