import { useEffect, useState } from 'react';
import { storageService } from '../../index';
import { useBlogListStore } from '../../zustStore/Store';

import Card from './Card';
import { useForm } from 'react-hook-form';
function AllPost() {
  const { setBlogList } = useBlogListStore((state) => state);
  const [postList, setPostList] = useState([]);
  const [Error, setError] = useState('');
  const navItem = ['travel', 'education', 'lifestyle'];

  const { register, handleSubmit } = useForm();
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

  const handleSearch = (data) => {
    try {
      setError('');
      storageService
        .getBlogListCategaryWise([Query.search('category', [`${data}`])])
        .then((res) => {
          console.log(res);

          setPostList(res);
        })
        .catch((e) => {
          setError(e);
        });
    } catch (err) {
      setError(err);
    }
  };
  return (
    <div className="w-full h-full">
      <div className="m-12 ">
        <nav>
          <div className="">
            <form className="w-full flex m-2">
              <input
                {...register('search')}
                type="text"
                placeholder="search"
                className=" border-gray-400  dark:text-white dark:bg-gray-900 dark:border-gray-600 rounded-3xl  py-2 px-4 w-full "
              />
              <button
                type="submit"
                className="m-2 w-24 hover:border-2 font-bold p-1 rounded-full "
              >
                Search
              </button>
            </form>
            <ul className="flex justify-center gap-12">
              <li>#All</li>
              {navItem && navItem.map((i) => <li key={i}>#{i}</li>)}
            </ul>
          </div>
        </nav>
      </div>
      <div className="w-full mt-10 flex flex-wrap mb-24 gap-6 justify-start">
        {postList &&
          postList.map((blog) => {
            return blog.isPublished ? (
              <Card blog={blog} key={blog.title} />
            ) : null;
          })}
      </div>
    </div>
  );
}

export default AllPost;
