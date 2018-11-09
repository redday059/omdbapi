import React, { Component } from 'react';

import './style/style.css';
import Header from './ui/Header/Header';

class App extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col">
              <Header/>
            </div>
          </div>
        </div>
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
