import { memo, useEffect, useMemo, useState } from 'react';
import { storageService } from '../../index';
import { useQuery } from '@tanstack/react-query';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
function AllPost() {
  const fetchBlogAll = async () => {
    return await storageService.getBlogList();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['get-all-blog-list'],
    queryFn: fetchBlogAll,
    staleTime: 10000,
  });
  console.log(data);

  return isLoading ? (
    <div className="w-full h-full p-20">
      <LoadingSkeleton className="mx-auto" />
    </div>
  ) : (
    <main className="w-full h-full ">
      <div>{error && <p>{error?.message}</p>}</div>
      <div className={`grid grid-cols-3 gap-4 p-2 m-2`}>
        {data &&
          data.documents
            .filter((blog) => blog.isPublished)
            .map((blog) => (
              <Link key={blog?.$id} to={`/blog/${blog.$id}`}>
                <Card blog={blog} />
              </Link>
            ))}
      </div>
    </main>
  );
}

export default AllPost;

const LoadingSkeleton = () => {
  return (
    <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-slate-700 h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-700 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-700 rounded col-span-2"></div>
              <div className="h-2 bg-slate-700 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Card = ({ blog }) => {
  const [url, setUrl] = useState('');
  useEffect(() => {
    const getPreview = async () => {
      const res = await storageService.previewFile(blog?.featuredImage);
      setUrl(res);
    };
    getPreview();
  }, [blog?.featuredImage]);

  return (
    <div className="p-2 hover:scale-105 transition-all delay-75 text-center">
      <div className=" dark:bg-black rounded-lg h-full">
        <div className="p-2">
          <div className="w-full  h-[70vh] rounded-xl overflow-hidden shadow-lg ">
            {url && (
              <img
                className="w-full p-1 h-1/2 rounded-3xl"
                src={url}
                alt={blog.title}
              />
            )}
            <div className="p-1 m-1">
              <div className="font-bold text-xl italic">{blog.title}</div>
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
  );
};
