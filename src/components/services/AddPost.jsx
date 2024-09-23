import React, { useCallback, useEffect } from 'react';
import RTE from './RTE';
import { Controller, useForm } from 'react-hook-form';
const AddPost = () => {
  const category_options = ['technology', 'lifestyle', 'education', 'travel'];
  const { handleSubmit, register, control, watch, getValues, setValue, reset } =
    useForm({
      defaultValues: {
        content: '',
        title: '',
      },
    });
  const addPost = (data) => {
    console.log(data);
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
              <input
                {...register('title', {
                  required: true,
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
            </div>
            {/* title */}
            <div className="w-full  text-center">
              <div className="w-full m-2 text-center ">
                <input
                  {...register('profilePicture', {
                    required: true,
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
              </div>
              <div className="flex justify-center gap-4 m-2 w-full text-purple-800 font-semibold text-xl  p-2 mt-4">
                <select
                  {...register('isPublished', {
                    required: true,
                  })}
                  className=" w-[40%] rounded-full text-center border border-purple-700 bg-slate-50"
                >
                  <option value={true}>published</option>
                  <option value={false}>save draft</option>
                </select>
                <select
                  {...register('category', {
                    required: true,
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
                  className="p-2 m-2 text-white bg-black rounded-full w-24 text-center font-semibold"
                >
                  save
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
