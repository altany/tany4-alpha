import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Social from "./Social";
import Github from "./Github";
import Blog from "./blog/Blog";

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/social" component={Social} />
      <Route path="/github" component={Github} />
      <Route path="/blog" component={Blog} />
    </Switch>
  </main>
);

export default Main;
