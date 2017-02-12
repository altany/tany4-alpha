import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// Layout
import Layout from './components/Layout';

import Home from './components/Home';
import Page from './components/Page';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home} />
      <Route path="page" component={Page} />
    </Route>
  </Router>
);
