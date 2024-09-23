import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { storageService } from '../../index';
import { useBlogListStore } from '../../zustStore/Store';

import Card from './Card';
function AllPost() {
  const { setBlogList, blogList } = useBlogListStore((state) => state);
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    (() => {
      storageService.getBlogList().then((res) => {
        if (res) {
          setPostList(res.documents);
        }
      });
    })();
  }, []);

  return (
    <div className="w-full mt-2  mb-24">
      <div>
        {postList &&
          postList.map((blog) => <Card blog={blog} key={blog.title} />)}
      </div>
    </div>
  );
}

export default AllPost;
