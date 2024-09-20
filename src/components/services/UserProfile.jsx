import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLoginStore } from '../../zustStore/Store';
import { Pencil, UserRoundPen } from 'lucide-react';
import Input from '../Elements/Input';
import { useForm } from 'react-hook-form';

function UserProfile() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [edit, setEdit] = useState(false);
  const { loginStatus, loginUser } = useLoginStore((state) => state);

  const { register, handleSubmit } = useForm({});

  const userProfileData = () => {
    console.log('hello');
    setTimeout(() => {
      setEdit(false);
    }, 1000);
  };
  const navItem = [
    {
      navName: 'General',
      // path: '/account-setting/profile',
    },
    {
      navName: 'Security',
      // path: '/account-setting/update',
    },

    {
      navName: 'Delete Account',
      // path: '/account-setting/delete-account',
    },
  ];
  return (
    <main className="grid grid-cols-[20%_80%] min-h-screen ">
      <div className="bg-slate-50  w-full">
        <div className="w-full sticky">
          <h1 className="text-center text-3xl pt-10 pb-4 font-bold">Setting</h1>
        </div>
        <div className="">
          <nav className="grid text-center w-full">
            <ul className=" w-full">
              {navItem &&
                navItem.map((item, index) => (
                  <Link key={item.navName} to={item.path}>
                    <li
                      className={`p-2 hover:text-lg transition-all duration-100 ${
                        index === activeIndex
                          ? 'underline text-lg font-bold border-blue-500'
                          : ''
                      } rounded-md  font-semibold`}
                      onClick={() => setActiveIndex(index)}
                    >
                      {item.navName}
                    </li>
                  </Link>
                ))}
            </ul>
          </nav>
        </div>
      </div>
      <section>
        <form onSubmit={handleSubmit(userProfileData)}>
          <div className="grid grid-rows-4">
            <div className="row-span-2 w-full h-[40vh]">
              <h1 className="text-center text-2xl font-semibold mt-4">
                User Profile Details
              </h1>
              <div className="grid grid-cols-2 gap-6 mt-2">
                <div className="">
                  <div className="flex justify-end pr-10 pt-1">
                    {edit ? (
                      <button
                        type="submit"
                        className="border text-center w-24 p-1 rounded-lg text-white bg-black font-semibold"
                      >
                        Update
                      </button>
                    ) : (
                      <button
                        onClick={() => setEdit((prev) => !prev)}
                        className="flex justify-between border text-center w-20 p-1 rounded-lg text-white bg-black font-semibold"
                      >
                        Edit <Pencil />
                      </button>
                    )}
                  </div>
                  <div className="flex justify-between p-1 m-2  ">
                    <label className="p-1">User Name</label>
                    <input
                      disabled={!edit}
                      type="text"
                      className={`w-[70%]  rounded p-2  ${
                        edit ? 'border' : ''
                      }`}
                    />
                  </div>
                  <div className="flex justify-between p-1 m-2">
                    <label htmlFor="" className="p-1">
                      Email
                    </label>
                    <input
                      disabled={!edit}
                      type="text"
                      className={`w-[70%]  rounded p-2  ${
                        edit ? 'border' : ''
                      }`}
                    />
                  </div>
                  <div className="flex justify-between p-1 m-2">
                    <label htmlFor="" className="p-1">
                      Bio
                    </label>
                    <input
                      disabled={!edit}
                      type="text"
                      className={`w-[70%]  rounded p-2  ${
                        edit ? 'border' : ''
                      }`}
                    />
                  </div>
                </div>
                <div className="flex justify-between p-2 m-2">
                  <div>
                    <UserRoundPen className="w-full h-full p-2 rounded-full border text-center" />
                  </div>
                  <div className="flex items-center">
                    <Input
                      label="choose Profile"
                      className={`w-[70%]  rounded p-2  ${
                        edit ? 'border' : ''
                      }`}
                      type="file"
                      disabled={!edit}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>personal details gamial password name</div>
            <div>delete account</div>
          </div>
        </form>
      </section>
    </main>
  );
}

export default UserProfile;

// <div className="w-1/2 p-2 m-4 text-xl ">
//
//                 <div></div>
//               </div>
