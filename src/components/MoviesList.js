import React from 'react';

export default class MoviesList extends React.Component {
  render() {
    return <div>{this.props.list.map(item => <div>{item.Title}</div>)}</div>
  }
}
