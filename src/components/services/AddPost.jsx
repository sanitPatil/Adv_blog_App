import React from 'react';
import RTE from './RTE';
import { Controller, useForm } from 'react-hook-form';
const AddPost = () => {
  const { handleSubmit, register, control, watch, getValues, setValue } =
    useForm({
      defaultValues: {
        content: 'all more to your blog collection',
      },
    });
  return (
    <div className="w-full max-h-screen border">
      <div className="grid grid-cols-5 gap-8 w-full p-2">
        <div className=" col-span-2 h-full">
          {/* title */}
          <div className=" m-2 w-full border p-4">
            <label className="italic ml-4 font-semibold pr-2">Title</label>
            <input
              type="text"
              placeholder="title of blog "
              className="m-2 w-[80%] p-2 rounded-full border-y-2  pl-6 hover:border-purple-700"
            />
          </div>
        </div>
        <div className="col-span-3 h-full">
          <div className=" m-2 w-full border p-4 min-h-[80vh]">
            <label className="text-center block w-full italic ml-4 font-semibold pr-2">
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
      </div>
    </div>
  );
};

export default AddPost;
