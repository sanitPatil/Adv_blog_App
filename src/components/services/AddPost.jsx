import { useCallback, useEffect, useState } from 'react';
import RTE from './RTE';
import { useForm } from 'react-hook-form';
import { storageService } from '../../index';
import { useLoginStore } from '../../zustStore/Store';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoaderCircleIcon } from 'lucide-react';

const AddPost = () => {
  const navigate = useNavigate();
  const category_options = ['technology', 'lifestyle', 'education', 'travel'];
  const { loginUser } = useLoginStore((state) => state);

  const blogUpdateState = useLocation().state;
  let blog = '';
  if (blogUpdateState) {
    blog = blogUpdateState.blog;
  }

  const {
    handleSubmit,
    register,
    control,
    watch,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: blog?.content || '',
      title: blog?.title || '',
    },
  });

  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState('');
  const [Edit, setEdit] = useState(false);

  const addPost = async (data) => {
    setLoading(true);
    console.log(data);
    if (!blog) {
      console.log('add-method call');
      setError('');
      setEdit(false);

      if (!data) {
        setError('All fields Are required!!!');
        setLoading(false);
        setEdit(true);
        return;
      }
      const blogImage = await storageService.uploadFile(data?.blogPicture[0]);
      if (!blogImage) {
        setError('failed to uplaod blog Image!');
        setLoading(false);
        setEdit(true);
        return;
      }

      const blogUpload = await storageService.createBlog({
        userId: loginUser.$id,
        featuredImage: blogImage.$id,
        title: data?.slug,
        isPublished: data?.isPublished === 'true' ? true : false,
        content: data?.content,
        category: data?.category,
      });

      if (!blogUpload) {
        setError('failed to uplaod blog !');
        setLoading(false);
        setEdit(true);
        return;
      }
      alert('Blog Added successfully!');
    } else {
      console.log('update method call');
      setError('');
      setEdit(false);

      if (!data) {
        setLoading(false);
        setError('All fields Are required!!!');
        setEdit(true);
        return;
      }
      const delRes = await storageService.deleteFile(blog?.featuredImage);
      if (!delRes) {
        setLoading(false);
        setError('Failed to delete Asset!!!');
        setEdit(true);
        return;
      }
      const uploadRes = await storageService.uploadFile(data?.blogPicture[0]);
      if (!uploadRes) {
        setLoading(false);
        setError('failed to upload Res!!!');
        setEdit(true);
        return;
      }
      const res = await storageService.updateBlog(blog?.$id, {
        userId: blog?.userId,
        featuredImage: uploadRes?.$id,
        content: data?.content,
        title: data?.slug,
        category: data?.category,
        isPublished: data?.isPublished === 'true' ? true : false,
      });
      if (!res) {
        setLoading(false);
        setError('failed to update blog!!!');
        setEdit(true);
        return;
      }
      alert('update successfully');
    }
    setLoading(false);
    setError('');
    setEdit(false);
    navigate('/all-post');
  };

  const clear = () => {
    reset();
  };

  const slugTranform = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, '-')
        .replace(/\s/g, '-');
    }
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTranform(value.title), { shouldValidate: true });
      }
      return () => subscription.unsubscribe();
    });
  }, [watch, setValue, slugTranform]);
  return (
    <div className="w-full p-2 max-h-screen">
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <form onSubmit={handleSubmit(addPost)}>
          <div className="grid grid-cols-5 gap-8 w-full p-2">
            <div className="col-span-3 h-full">
              <div className="  w-full p-2 min-h-[80vh]">
                <label className="text-center block w-full italic font-semibold pr-2">
                  Blog Content
                </label>
                <div className="w-full h-full">
                  <RTE
                    control={control}
                    label="content: "
                    name="content"
                    defaultValue={getValues('content')}
                  />
                  {errors && (
                    <p className="text-red-800">{errors?.content?.message}</p>
                  )}
                </div>
              </div>
            </div>
            <div className=" col-span-2 border mb-8">
              <div className=" m-2 w-full  p-4 text-center ">
                <label className="italic ml-4 font-semibold pr-2">Title</label>
                <textarea
                  {...register('slug', {
                    required: true,
                  })}
                  disabled={true}
                  className="italic bg-slate-50 font-semibold w-full pb-2 block pr-2 min-h-24"
                ></textarea>
                {errors && (
                  <p className="text-red-800">{errors?.slug?.message}</p>
                )}
                <input
                  required
                  {...register('title', {
                    required: true,
                    pattern: {
                      value: /^[A-Za-z]+[A-Za-z0-9\s]*$/,
                      message:
                        'statring must be with string and then number!!!',
                    },
                  })}
                  type="text"
                  placeholder="title of blog "
                  className="m-2 w-[80%] p-2 border border-purple-700 rounded-full -y-2 pl-6 hover:-purple-700"
                  onInput={(e) => {
                    setValue('slug', slugTranform(e.currentTarget.value), {
                      shouldValidate: true,
                    });
                  }}
                />
                {errors && (
                  <p className="text-red-800">{errors?.title?.message}</p>
                )}
              </div>
              {/* title */}
              <div className="w-full  text-center">
                <div className="w-full m-2 text-center ">
                  <input
                    required
                    {...register('blogPicture', {
                      required: {
                        value: true,
                        message: 'pease select an image',
                      },
                    })}
                    label="choose Profile"
                    className={`block p-4 text-sm text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:-0
                                file:text-sm file:font-semibold
                                file:bg-violet-50 file:text-violet-700 rounded-2xl
                                mx-auto 
                               `}
                    type="file"
                  />
                  {errors && (
                    <p className="text-red-800">
                      {errors?.blogPicture?.message}
                    </p>
                  )}
                </div>
                <div className="flex justify-center gap-4 m-2 w-full text-purple-800 font-semibold text-xl  p-2 mt-4">
                  <select
                    {...register('isPublished', {
                      required: {
                        value: true,
                        message: 'value is not selected',
                      },
                    })}
                    className=" w-[40%] rounded-full text-center border border-purple-700 bg-slate-50"
                  >
                    <option value={true}>published</option>
                    <option value={false}>save draft</option>
                  </select>
                  {errors && (
                    <p className="text-red-800">
                      {errors?.isPublished?.message}
                    </p>
                  )}
                  <select
                    {...register('category', {
                      required: {
                        value: true,
                        message: 'choose category',
                      },
                    })}
                    className="w-[40%] rounded-full text-center border border-purple-700 bg-slate-50 "
                  >
                    {category_options &&
                      category_options.map((category) => (
                        <option value={category} key={category}>
                          {category}
                        </option>
                      ))}
                  </select>
                  {errors && (
                    <p className="text-red-800">{errors?.category?.message}</p>
                  )}
                </div>

                <div className="bo m-2 p-2 text-center">
                  <button
                    onClick={clear}
                    className="p-2 m-2 text-white bg-black rounded-full w-24 text-center font-semibold"
                  >
                    reset
                  </button>
                  <button
                    type="submit"
                    className="p-2 m-2 text-white bg-black rounded-full w-28 text-center font-semibold"
                  >
                    {!loading ? (
                      !blog ? (
                        'Save'
                      ) : (
                        'Update'
                      )
                    ) : (
                      <LoaderCircleIcon className="animate-spin w-full" />
                    )}
                  </button>
                  {blog && (
                    <button
                      className={`p-2 m-2 text-white bg-black rounded-full w-28 text-center font-semibold`}
                      onClick={() => navigate(`/blog/${blog.$id}`)}
                    >
                      back
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddPost;
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
