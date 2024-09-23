import React from 'react';
import { useParams } from 'react-router-dom';

function BlogCard() {
  const { blogId } = useParams();
  console.log(blogId);

  return <div className="w-full h-full">BlogCard</div>;
}

export default BlogCard;
