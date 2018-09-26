import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Movies from './components/Movies'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

ReactDOM.render(
  <Provider store={
    createStore(reducers,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() /*for redux chrome-extention*/ )
  }>
    <Router>
      <App>
        <Route path='/' exact component={Movies}/>
        {/*<Route path='/movie' component={Movie}/>*/}
      </App>
    </Router>
  </Provider>
  , document.querySelector('#root'));

