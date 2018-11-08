import React, { Component } from 'react';

import './style/style.css';
import { Link } from "react-router-dom";
import Header from './ui/Header';

class App extends Component {
  render() {
    return (
      <div>
        {/*<header>*/}
          {/*<div className="container"><h1>OMDb API</h1></div>*/}
        {/*</header>*/}
        <Header/>
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <Link className="btn btn-primary float-left mb-5" to={'/'}>
                Go to movies
              </Link>
            </div>
            <div className="col-sm-4">
              <Link className="btn btn-primary float-left mb-5" to={'/img'}>
                Go to img
              </Link>
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
