import 'babel-polyfill';
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import { Router, Route, IndexRoute, hashHistory} from 'react-router';
import configureStore from '../js/redux/configureStore/index';
import App from './App';
import Stories from './containers/Stories';
import Comments from './containers/Comments';

export default class Root extends Component {
  render() {
    const store = configureStore();
    return (
      <Provider store={store}>
        <div>
          <Router history={hashHistory}>
            <Route path="/hacknews/" component={App}>
              <IndexRoute component={Stories}/>
              <Route path="stories" component={Stories}/>
              <Route path="comments" component={Comments}/>
            </Route>
          </Router>
        </div>
      </Provider>
    );
  }
}