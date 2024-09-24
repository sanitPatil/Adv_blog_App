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
          console.log(res);

          setPostList(res.documents);
          setBlogList(res.documents);
        }
      });
    })();
  }, []);

  return (
    <div className="w-full mt-10 flex flex-wrap mb-24 gap-6 justify-start">
      {postList &&
        postList.map((blog) => {
          return blog.isPublished ? (
            <Card blog={blog} key={blog.title} />
          ) : null;
        })}
    </div>
  );
}

export default AllPost;
