import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { storageService } from '../../index';
import parse from 'html-react-parser';
function Card({ blog }) {
  const [url, seturl] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    storageService.previewFile(blog.featuredImage).then((res) => {
      if (res) {
        seturl(res);
      }
    });
  }, []);
  return (
    // <div className="w-screen mt-10 flex flex-wrap justify-start mb-24 gap-4">
    //   {blog && (
    //     <div className="p-2 mx-4 border" key={blog.title}>
    //       <Link to={`/blog/${blog.$id}`}>
    //         <div className="w-64 max-w-sm rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-all delay-75">
    //           <img
    //             className="w-full p-2 rounded-3xl"
    //             src={url}
    //             alt={blog.title}
    //           />
    //           <div className="px-6 py-4">
    //             <div className="font-bold text-xl mb-2">{blog.title}</div>
    //             <div className="text-gray-700 h-40 w-40 text-base">
    //               {blog && parse(blog.content)}
    //             </div>
    //           </div>
    //           <div className="absolute inset-2 text-white flex items-start mt-2 justify-end opacity-0 transition-opacity duration-300 hover:opacity-100">
    //             <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
    //               {blog.category}
    //             </span>
    //           </div>
    //         </div>
    //       </Link>
    //     </div>
    //   )}
    // </div>
    <div className="w-1/5 h-full">
      {blog && (
        <div className="" key={blog.title}>
          <Link to={`/blog/${blog.$id}`}>
            <div className="w-full  h-[70vh] rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-all delay-75">
              <img
                className="w-full p-2 rounded-3xl"
                src={url}
                alt={blog.title}
              />
              <div className="px-4 py-4">
                <div className="font-bold text-xl mb-2">{blog.title}</div>
                <div className="text-gray-700 text-base">
                  {blog && parse(blog.content)}
                </div>
              </div>
              <div className="absolute inset-2 text-white flex items-start mt-2 justify-end opacity-0 transition-opacity duration-300 hover:opacity-100">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {blog.category}
                </span>
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Card;
