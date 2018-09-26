import React, { Component } from 'react';

import './style/style.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <header></header>
        <div className="row">
          <div className="col mt-3">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
