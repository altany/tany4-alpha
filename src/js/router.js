import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// Layout
import Layout from './components/Layout';

import Home from './components/Home';
import Social from './components/Social';
import Github from './components/Github';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home} />
      <Route path="social" component={Social} />
      <Route path="github" component={Github} />
    </Route>
  </Router>
);
