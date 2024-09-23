import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { storageService } from '../../index';
import parse from 'html-react-parser';
import { useLoginStore } from '../../zustStore/Store';
import { LoaderCircle } from 'lucide-react';
function BlogCard() {
  const [blog, setBlog] = useState({});
  const [url, setUrl] = useState('');
  const { loginUser } = useLoginStore((state) => state);
  // console.log('loginUser', loginUser);
  // console.log('blog', blog);

  const isAuthor = loginUser && blog ? loginUser?.$id === blog?.userId : false;
  //console.log('isAuthor', isAuthor);
  const [Error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { blogId } = useParams();
  //console.log(blog);
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
  //console.log(blogId);
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
  return (
    <div className=" bg-white rounded-lg shadow-lg ">
      {Error && <p>{Error}</p>}
      <div className="w-full  text-center justify-center flex">
        <img
          src={url}
          alt="Blog post image"
          className="w-[70%] object-cover h-[80vh] rounded-lg hover:scale-110 transition delay-200"
        />
      </div>
      <div className="p-6 ml-24">
        <div className="ml-10">
          <div className="text-3xl font-bold text-gray-800 capitalize">
            {blog.title}
          </div>

          {blog?.content && (
            <div className="text-gray-600 mb-4 text-xl m-2">
              {parse(blog.content)}
            </div>
          )}

          <div className="flex w-full  items-center">
            <img
              src={url}
              alt="Author avatar"
              className="w-20 h-20 rounded-full mr-4"
            />
            <div className="text-sm">
              <p className="text-gray-800 font-semibold ">John Doe</p>
              <p className="text-gray-500">Sept 23, 2024</p>
            </div>
          </div>
          {isAuthor && (
            <div className="w-full  m-2 ">
              <button
                // onClick={() => navigate('/add-post', { state: { blog } })}
                className="w-28 border p-2  text-white bg-black rounded-lg "
              >
                Edit Blog
              </button>
              <button
                onClick={() => deletePost(blog)}
                className="w-28 ml-2 border p-2  text-white bg-black text-center rounded-lg "
              >
                {loading ? (
                  <LoaderCircle className="animate-spin" />
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

{
  /* <div className="m-10">
<div className="ml-10 ">
  <div className="h-[60vh]  flex  ">
    
  </div>

  <div className="ml-20 w-full">{parse(blog.content)}</div>
</div>
</div> */
}
