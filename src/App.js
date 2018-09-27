import React, { Component } from 'react';

import './style/style.css';

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <div className="container"><h1>OMDb API</h1></div>
        </header>
        <div className="container">
          <div className="row">
            <div className="col mt-3">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
