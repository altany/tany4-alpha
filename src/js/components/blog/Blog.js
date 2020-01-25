import React from "react";
import { Switch, Route } from "react-router-dom";
import BlogList from "./BlogList";
import BlogPage from "./BlogPage";

const Blog = () => (
  <Switch>
    <Route exact path="/blog" component={BlogList} />
    <Route path="/blog/:id" component={BlogPage} />
  </Switch>
);

export default Blog;
