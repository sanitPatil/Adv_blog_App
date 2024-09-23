import { ArrowBigRight } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

function AllPost() {
  return (
    <div className="w-full mt-10  mb-24">
      <div>
        <div className="grid grid-cols-4 p-2 gap-6 mx-4">
          <div className="max-w-sm rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-all delay-75 ">
            <img
              className="w-full p-2 rounded-3xl"
              src={'public/image.png'}
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Title slug</div>
              <p className="text-gray-700 text-base">description</p>
            </div>
            <div className="absolute inset-2 text-white flex items-start mt-2 justify-end opacity-0 transition-opacity duration-300 hover:opacity-100 ">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #photography
              </span>
            </div>

            <div className=" px-3 py-1 mx-2">Author name</div>

            <div className=" px-3 py-1 mx-2 w-full text-right m-2 ">
              <Link>
                <span className="mb-4 mr-4 text-blue-600 font-bold italic p-2 underline rounded-full">
                  Read more
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllPost;
