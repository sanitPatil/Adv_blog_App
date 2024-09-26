import { useEffect, useState } from 'react';
import { storageService } from '../../index';
import { useBlogListStore } from '../../zustStore/Store';

import Card from './Card';
import { useForm } from 'react-hook-form';
function AllPost() {
  const { setBlogList, blogList } = useBlogListStore((state) => state);
  const [blog, setBlog] = useState();
  const [Error, setError] = useState('');
  const navItem = ['travel', 'education', 'lifestyle'];

  const { register, handleSubmit } = useForm();
  useEffect(() => {
    (() => {
      storageService.getBlogList().then((res) => {
        if (res) {
          setBlogList(res.documents);
        }
      });
    })();
  }, []);

  const handleSearch = (data) => {
    // console.log(data);

    try {
      setError('');
      setBlog('');
      storageService
        .getBlogListCategaryWise(data.search)
        .then((res) => {
          // console.log('search res', res);
          // console.log(res.documents);
          setBlog(res.documents);
        })
        .catch((e) => {
          setError(e);
        });
    } catch (err) {
      // console.log(err);

      setError(err);
    }
  };
  return (
    <div className="w-full h-full">
      <div className="m-12 ">
        <nav>
          <div className="">
            <form
              className="w-full flex m-2"
              onSubmit={handleSubmit(handleSearch)}
            >
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
      {!blog ? (
        <div className="w-full mt-10 flex flex-wrap mb-24 gap-6 justify-start">
          {blogList &&
            blogList.map((blog) => {
              return <Card blog={blog} key={blog.title} />;
            })}
        </div>
      ) : (
        blog.map((blog) => {
          return <Card blog={blog} key={blog.title} />;
        })
      )}
    </div>
  );
}

export default AllPost;
