import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { storageService } from '../../index';
import parse from 'html-react-parser';
function Card({ blog }) {
  const [url, seturl] = useState('');

  useEffect(() => {
    storageService.previewFile(blog.featuredImage).then((res) => {
      if (res) {
        seturl(res);
      }
    });
  }, []);
  return blog ? (
    <Link to={`/blog/${blog.$id}`} key={blog.title}>
      <div className="grid grid-cols-4 gap-6">
        <div className=" ml-4 dark:bg-black rounded-lg h-full">
          <div className="p-2">
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
                <div className="inline-block truncate bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-4">
                  {blog.category}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  ) : null;
}

export default Card;
