import React from "react";
import PropTypes from "prop-types";

class BlogPage extends React.Component {
  render() {
    return <div id="blog-page">blog page {this.props.match.params.id}</div>;
  }
}
BlogPage.propTypes = {
  match: PropTypes.any
};
export default BlogPage;
