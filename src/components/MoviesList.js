import React from 'react';
import MoviesListItem from './MoviesListItem';

export default class MoviesList extends React.Component {
  render() {
    if (!this.props.list){
      return <div className="mt-3">No results found.</div>;
    }
    return (
      <div className="container">
        <div className="row">{this.props.list.map(item => MoviesListItem(item))}
        </div>
      </div>
    )
  }
}
