import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class BlogCard extends React.Component {
  render() {
    return (
      <div id="blog-card">
        <Link to={`blog/${this.props.id}`}>
          {this._image}
          {this._title}
          {this._subtitle}
        </Link>
      </div>
    );
  }

  get _title() {
    if (undefined === this.props.title) {
      return null;
    }
    return <div className="title">{this.props.title}</div>;
  }

  get _subtitle() {
    if (undefined === this.props.subtitle) {
      return null;
    }
    return <div className="subtitle">{this.props.subtitle}</div>;
  }

  get _image() {
    if (undefined === this.props.extension) {
      return <div className="imageContainer"></div>;
    }
    return (
      <div className="imageContainer">
        <img
          src={`/images/blog/${this.props.id}.${this.props.extension}`}
          alt={this.props.id}
        ></img>
      </div>
    );
  }
}

BlogCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  extension: PropTypes.string
};

export default BlogCard;
