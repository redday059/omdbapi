import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

import withAsync from './components/withAsync';
import configWebfonts from "./config/webfonts";
import WebfontLoader from "./components/WebfontLoader";

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';

ReactDOM.render(
  <Provider store={createStore(reducers,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() /*for redux chrome-extention*/ )
  }>
    <Router>
      <WebfontLoader {...configWebfonts}>
        <App>
          {/*<Route path='/' exact component={MoviesContainer}/>*/}
          <Route path='/' exact component={withAsync(()=>{return import('./components/MoviesContainer')})}/>
          <Route path='/movie/:id' component={withAsync(()=>{return import('./components/MovieContainer')})}/>
          <Route path='/img' component={withAsync(()=>{return import('./ui/PageWithImages')})}/>
        </App>
      </WebfontLoader>
    </Router>
  </Provider>
  , document.querySelector('#root')
);
