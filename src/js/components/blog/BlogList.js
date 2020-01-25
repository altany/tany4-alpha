import React from "react";

import BlogCard from "./BlogCard";
import blogData from "./blogs.json";

class BlogList extends React.Component {
  render() {
    return (
      <div id="blog">
        {blogData.map(blog => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            title={blog.title}
            subtitle={blog.subtitle}
            extension={blog.extension}
          ></BlogCard>
        ))}
      </div>
    );
  }
}

export default BlogList;
