import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLoginStore } from '../../zustStore/Store';
import { LoaderCircle, Pencil, UserRoundPen } from 'lucide-react';
import Input from '../Elements/Input';
import { useForm } from 'react-hook-form';
import { storageService } from '../../index';
function UserProfile() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [edit, setEdit] = useState(false);
  const { loginStatus, loginUser } = useLoginStore((state) => state);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: loginUser.name || '',
      username: loginUser.name.split(' ')[0] + '@' + loginUser.$id.substr(0, 5),
      bio: 'blog user',
    },
  });

  const userProfileData = async (data) => {
    setError('');
    const file = await storageService.uploadFile(data.profilePicture[0]);
    if (!file) {
      setError('Something went wrong while uploading profilePicture');
      setEdit(false);
      setLoading(false);
    }

    data.userId = loginUser.$id;
    data.profilePicture = file.$id;

    const res = await storageService.setUserProfile(data);

    if (!res) {
      setError('failed to setup User Profile');
      setEdit(false);
      setLoading(false);
    }

    setEdit(false);
    setLoading(false);
    reset();
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
          <div className="border">
            <div className=" w-full h-full">
              <h1 className="text-center text-3xl font-semibold mt-4">
                User Profile Details
              </h1>
              <div className="grid grid-cols-2 gap-6 mt-2">
                <div className="">
                  <div className="flex justify-end pr-10 pt-1">
                    {edit ? (
                      <button
                        type="submit"
                        className="  border text-center w-24 p-1 rounded-lg text-white bg-black font-semibold"
                      >
                        {loading ? (
                          <LoaderCircle className="animate-spin items-center mx-auto text-white" />
                        ) : (
                          'Update'
                        )}{' '}
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
                    <label className="p-1">Name</label>
                    <input
                      {...register('name')}
                      disabled={true}
                      type="text"
                      className={`w-[70%]  rounded p-2  ${
                        edit ? 'border' : ''
                      }`}
                    />
                  </div>
                  <div className="flex justify-between p-1 m-2">
                    <label htmlFor="" className="p-1">
                      user Name
                    </label>
                    <input
                      {...register('username')}
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
                      {...register('bio')}
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
                      {...register('profilePicture')}
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
          </div>
        </form>
        <main id="#security">
          <h1 className="text-3xl font-semibold mt-4 text-center pt-2">
            Security{' '}
          </h1>
          <div className="grid grid-cols-2 gap-4">
            <form>
              <div className="w-full">
                <div className=" m-2 p-2 w-full text-center">
                  <Input
                    type="email"
                    label="Email"
                    className="p-2 rounded-lg mt-2"
                  ></Input>
                  <button className="text-xl p-2 w-24 rounded-lg font-bold bg-black text-white">
                    Edit
                  </button>
                </div>
              </div>
            </form>
            {/* {new form} */}
            <form>
              <div className=" mt-2 p-2">
                <div className="grid grid-cols-2 ">
                  <div>
                    <Input
                      type="password"
                      label="old-password"
                      className="p-2 rounded-lg mt-2"
                    ></Input>
                  </div>
                  <div>
                    <Input
                      type="password"
                      label="password"
                      className="p-2 rounded-lg mt-2"
                    ></Input>
                  </div>
                </div>
                <div className="text-center m-2">
                  <button className="text-xl p-1 w-24 rounded-lg font-bold bg-black text-white">
                    Edit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>
        <main>
          <div className="border">
            <h1 className=" text-center text-3xl text-red-700 font-semibold ">
              Delete Your Account
            </h1>
            <div></div>
          </div>
        </main>
      </section>
    </main>
  );
}

export default UserProfile;
