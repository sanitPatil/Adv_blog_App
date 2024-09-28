import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { storageService } from '../../index';
import parse from 'html-react-parser';
import { useLoginStore } from '../../zustStore/Store';
import { LoaderCircle } from 'lucide-react';
function BlogCard() {
  const [blog, setBlog] = useState({});
  const [url, setUrl] = useState('');
  const { loginUser } = useLoginStore((state) => state);

  const isAuthor = loginUser && blog ? loginUser?.$id === blog?.userId : false;

  const [Error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { blogId } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    if (blogId) {
      storageService.getBlog(blogId).then((res) => {
        if (res) {
          storageService.previewFile(res.featuredImage).then((url) => {
            if (url) {
              setUrl(url);
            }
          });
          setBlog(res);
        }
      });
    }
  }, []);

  const deletePost = async (blog) => {
    setLoading(true);
    setError('');
    const resoureceDelete = await storageService.deleteFile(blog.featuredImage);
    if (!resoureceDelete) {
      setError('failed to delete');
      setLoading(false);
      return;
    }

    const delRes = await storageService.deleteBlog(blog.$id);
    if (!delRes) {
      setLoading(false);
      setError('failed to delete blog');
      return;
    }
    setError('');
    setLoading(false);
    navigate('/all-post');

    alert('successfully deleted ');
  };
  return !url ? (
    <LoadingSkeleton />
  ) : (
    <div className="m-10 ">
      <p> {Error && <p>{Error}</p>}</p>
      <div className="w-full  text-center justify-center flex">
        <img
          src={url}
          alt={blog.title}
          className="w-[90%] object-cover h-[80vh] rounded-lg hover:scale-110 transition delay-200"
        />
      </div>
      <div className="  w-[100%]">
        <div className="flex justify-between mt-8 w-full">
          <div className="flex justify-start text-2xl ml-12 font-semibold w-full capitalize">
            {blog.title}
          </div>
          <div className="flex justify-end mr-20  text-white bg-gray-500 p-2  text-bold rounded-full">
            {'#' + blog.category}
          </div>
        </div>
        <div className="m-6">
          {blog?.content && (
            <div className=" mb-4 italic p-2 text-black  border-b-2 text-xl m-1">
              {parse(blog.content)}
            </div>
          )}
        </div>
        <div className="flex w-full items-center ">
          <div className="ml-14 font-bold text-sm m-4 rounded-full  border  text-center p-2">
            <p className="text-gray-800 w-full font-semibold text-1xl dark:text-white">
              {blog.blogCreator}
            </p>
            {blog?.$createdAt && (
              <p className="text-gray-500 dark:text-white w-20 ">
                {blog.$createdAt.substr(0, 7)}
              </p>
            )}
          </div>
          {isAuthor && (
            <div className="w-full flex justify-end  m-2 ">
              <button
                onClick={() => navigate('/add-post', { state: { blog } })}
                className="w-28 border p-2  text-white bg-black rounded-lg "
              >
                Edit Blog
              </button>
              <button
                onClick={() => deletePost(blog)}
                className="w-28 ml-2 border p-2  text-white bg-black text-center rounded-lg "
              >
                {loading ? (
                  <LoaderCircle className="animate-spin w-full" />
                ) : (
                  'Delete Blog'
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogCard;

const LoadingSkeleton = () => {
  return (
    <div className="border absolute border-blue-300 shadow rounded-md p-4 bottom-[50vh] left-[15vh] w-10/12  mx-auto">
      <div className="animate-pulse flex space-x-4 w-full h-full ">
        <div className="rounded-full bg-slate-700 h-10 w-10 "></div>
        <div className="flex-1 space-y-6 py-1 w-full h-full">
          <div className="h-2 bg-slate-700 rounded w-full"></div>
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
