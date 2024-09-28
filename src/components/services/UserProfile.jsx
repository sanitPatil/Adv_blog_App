import { useEffect, useState } from 'react';
import { useLoginStore, useProfileStore } from '../../zustStore/Store';
import { LoaderCircle, User2Icon, UserRoundPen } from 'lucide-react';
import Input from '../Elements/Input';
import { useForm } from 'react-hook-form';
import { authService, storageService } from '../../index';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

function UserProfile() {
  const [activeIndex, setActiveIndex] = useState(0);

  const navItem = [
    {
      navName: 'General',
    },

    {
      navName: 'Email-Setting',
    },
    {
      navName: 'Password-Setting',
    },
  ];

  return (
    <main className="grid grid-cols-[20%_70%]  h-[80vh] ">
      <div className="h-[100%] w-full mb-8">
        <div className="w-full">
          <h1 className="text-center text-3xl dark:text-white pt-10 pb-4 font-bold">
            Setting
          </h1>
        </div>
        <div className="dark:text-white  ">
          <nav className="grid text-center  w-full">
            <ul className=" w-full">
              {navItem &&
                navItem.map((item, index) => (
                  <li
                    key={item.navName}
                    className={`p-2 hover:text-lg transition-all duration-100 ${
                      index === activeIndex
                        ? 'underline text-lg font-bold border-blue-500'
                        : ''
                    } rounded-md  font-semibold`}
                    onClick={() => setActiveIndex(index)}
                  >
                    {item.navName}
                  </li>
                ))}
            </ul>
          </nav>
        </div>
      </div>
      <section className="w-full h-full items-center">
        <main className={`${activeIndex === 0 ? '' : 'hidden'}`}>
          <ProfileDetails />
        </main>
        <main id="#security" className={`${activeIndex === 1 ? '' : 'hidden'}`}>
          <UpdateEmail />
        </main>
        <main id="#security" className={`${activeIndex === 2 ? '' : 'hidden'}`}>
          <UpdatePassword />
        </main>
      </section>
    </main>
  );
}

export default UserProfile;

// PERSONAL DETAILS

const ProfileDetails = () => {
  const [edit, setEdit] = useState(false);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginUser } = useLoginStore((state) => state);
  const { profileData, setProfileData } = useProfileStore((state) => state);

  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: {
      name: '',
      username: '',
      bio: '',
    },
  });

  const getProfile = async () => {
    return await storageService.getUserProfile(loginUser?.$id);
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ['getProfile'],
    queryFn: getProfile,
    staleTime: 10000,
  });
  useEffect(() => {
    if (data) setProfileData(data.documents[0]);
  }, [data]);
  useEffect(() => {
    if (profileData) reset(profileData);
  }, [profileData, reset]);

  useEffect(() => {
    storageService.previewFile(profileData?.profilePicture).then((res) => {
      if (res) {
        setUrl(res);
      }
    });
  }, [profileData, reset]);

  // update method
  const updateProfile = async (data) => {
    setEdit(false);
    setLoading(true);
    if (!data) {
      toast.error('all fields are required!!!');
      setLoading(false);
      return;
    }
    let res = data?.profilePicture;
    if (data?.profilePicture) {
      res = await storageService.uploadFile(data?.profilePicture[0]);
      if (!res) {
        toast.error(`failed to upload file`);
        setLoading(false);
        return;
      }

      await storageService.deleteFile(profileData?.profilePicture);
      data.profilePicture = res?.$id;
    }
    const updateProfileRes = await storageService.updateUserProfile(data?.$id, {
      userId: loginUser.$id || profileData.userId,
      username: data.username || profileData.username,
      bio: data.bio || profileData.bio,
      profilePicture: data.profilePicture || profileData.profilePicture,
      name: loginUser.name || profileData.name,
    });
    if (!updateProfileRes) {
      toast.error('failed to upload profile res');
      setLoading(false);
      return;
    }
    setProfileData(updateProfileRes);
    reset(profileData);
    setEdit(false);
    setLoading(false);
    toast.success('Profile successfully Updated ');
  };
  // handle reset
  const handlereset = () => {
    reset();
    setEdit(false);
  };

  return (
    <div className="ml-14 h-full w-full m-4">
      <h1 className="text-2xl  font-semibold underline underline-offset-4 italic text-center">
        Profile
      </h1>
      <form onSubmit={handleSubmit(updateProfile)}>
        <div className="grid grid-cols-2 gap-4 mx-auto p-2 m-4">
          <div className=" ">
            <div className="flex">
              <label htmlFor="" className="p-4 font-bold ">
                {' '}
                Name:
              </label>
              <input
                {...register('name', {
                  required: {
                    value: true,
                    message: 'name cannot be empty',
                  },
                })}
                type="text"
                disabled={true}
                className="ml-8 w-full m-2 p-2 border rounded-full dark:text-gray-950 "
              />
            </div>
            <div className="flex">
              <label htmlFor="" className="p-4 font-bold ">
                {' '}
                username
              </label>
              <input
                {...register('username', {
                  required: {
                    value: true,
                    message: 'username cannot be emplty',
                  },
                })}
                type="text"
                disabled={!edit}
                className="w-full m-2 p-2 border rounded-full dark:text-gray-950 "
              />
            </div>
            <div className="flex">
              <label htmlFor="" className="p-4 font-bold ">
                {' '}
                Bio
              </label>
              <input
                {...register('bio', {
                  required: {
                    value: true,
                    message: 'bio cannot be emplty',
                  },
                })}
                type="text"
                disabled={!edit}
                className=" ml-14 w-full m-2 p-2  border rounded-full  dark:text-gray-950"
              />
            </div>
          </div>
          <div className=" flex m-1">
            {!url ? (
              <User2Icon className="border w-40 h-40 rounded-full" />
            ) : (
              <img src={url} className="border w-40 h-40 rounded-full" />
            )}
            <div className="">
              <input
                required
                disabled={!edit}
                {...register('profilePicture', {
                  required: {
                    value: true,
                    message: 'pease select an image! ',
                  },
                })}
                label="choose Profile"
                className={` flex mt-14 ml-8  file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:-0 file:text-sm file:font-semibold mx-auto rounded-2xl
                                ${
                                  !edit
                                    ? 'file:bg-gray-500 file:text-gray-700'
                                    : `
                                file:bg-violet-50 file:text-violet-700 `
                                }`}
                type="file"
              />
              {errors && (
                <p className="text-red-800">{errors?.blogPicture?.message}</p>
              )}
            </div>
          </div>
        </div>
        <div className="w-full text-center  text-white p-1">
          {edit ? (
            <div>
              <button
                type="button"
                onClick={handlereset}
                className="w-1/4 border m-2 p-2 rounded-full bg-black font-bold "
              >
                cancel
              </button>
              <button className="w-1/4 border m-2 p-2 rounded-full text-center bg-black font-bold">
                {loading ? (
                  <LoaderCircle className=" animate-spin w-full" />
                ) : (
                  'update'
                )}
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setEdit(true)}
              className="w-1/4 border p-2 rounded-full bg-black font-bold "
            >
              Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

// EMAIL AND PASSWORD UPDATE
const UpdateEmail = () => {
  const [edit, setEdit] = useState('');
  const { loginUser } = useLoginStore((state) => state);
  const [loading, setLoading] = useState(false);
  //
  // handleReset
  const clear = () => {
    setEdit(false);
    reset({ email: loginUser?.email });
  };
  // handle submit
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const update = async ({ email, password }) => {
    setLoading(true);
    setEdit(false);
    if (!email || !password) {
      toast.error('all fields are required!');
      setLoading(false);
      setEdit(false);
      return;
    }
    const res = await authService.updateUserEmail({ email, password });
    if (!res) {
      toast.error('failed to update email');
      setLoading(false);
      setEdit(false);
      return;
    }
    setLoading(false);
    setEdit(false);
    reset();
    toast.success('Email updated successfully');
  };
  useEffect(() => {
    setEdit(false);
    reset({ email: loginUser?.email, password: '' });
  }, [loginUser]);
  return (
    <div className="w-full h-full  mt-20 ">
      <h1 className="text-center text-xl font-semibold m-4">Password Update</h1>
      <form onSubmit={handleSubmit(update)}>
        <div className="w-full h-full">
          <div className="m-4">
            Email{' '}
            <input
              {...register('email', {
                required: true,
              })}
              disabled={!edit}
              type="text"
              className="w-full p-4 mt-4 dark:text-black  rounded-full  "
            />
          </div>
          Password
          <div className="m-4">
            <input
              {...register('password', {
                required: true,
              })}
              disabled={!edit}
              type="password"
              className="w-full p-4 dark:text-black rounded-full "
            />
          </div>
          <div className="w-full text-center m-2">
            {edit ? (
              <div>
                <button
                  type="button"
                  onClick={clear}
                  className="rounded-full w-1/4 m-2 bg-black text-white p-2 text-xl"
                >
                  clear
                </button>
                <button className="rounded-full w-1/4 bg-black text-white p-2 text-xl">
                  {loading ? (
                    <LoaderCircle className="animate-spin w-full" />
                  ) : (
                    'submit'
                  )}
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setEdit(true)}
                className="rounded-full w-1/4 bg-black text-white p-2 text-xl"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

// PASSWORD UPDATE
const UpdatePassword = () => {
  const [edit, setEdit] = useState('');
  const { loginUser } = useLoginStore((state) => state);
  const [loading, setLoading] = useState(false);
  //
  // handleReset
  const clear = () => {
    setEdit(false);
    setLoading(false);
    reset();
  };
  // handle submit
  const { register, handleSubmit, reset } = useForm();
  // const password
  const update = async ({ newPassword, oldPassword }) => {
    setLoading(true);
    setEdit(false);
    if (!newPassword || !oldPassword) {
      toast.error('all fields are required!');
      setLoading(false);
      setEdit(false);
      return;
    }
    const res = await authService.updateUserPassword({
      newPassword,
      oldPassword,
    });
    if (!res) {
      toast.error('failed to update password');
      setLoading(false);
      setEdit(false);
      return;
    }
    setLoading(false);
    setEdit(false);
    reset();
    toast.success('password updated successfully');
  };
  return (
    <div className="w-full h-full  mt-20 ">
      <h1 className="text-center text-xl font-semibold m-4">Password Update</h1>
      <form onSubmit={handleSubmit(update)}>
        <div className="w-full h-full">
          <div className="m-4">
            oldPassword{' '}
            <input
              {...register('oldPassword', {
                required: true,
              })}
              disabled={!edit}
              type="password"
              className="w-full p-4 mt-4 dark:text-black  rounded-full  "
            />
          </div>
          new Password
          <div className="m-4">
            <input
              {...register('newPassword', {
                required: true,
              })}
              disabled={!edit}
              type="password"
              className="w-full p-4 dark:text-black rounded-full "
            />
          </div>
          <div className="w-full text-center m-2">
            {edit ? (
              <div>
                <button
                  type="button"
                  onClick={clear}
                  className="rounded-full w-1/4 m-2 bg-black text-white p-2 text-xl"
                >
                  clear
                </button>
                <button className="rounded-full w-1/4 bg-black text-white p-2 text-xl">
                  {loading ? (
                    <LoaderCircle className="animate-spin w-full" />
                  ) : (
                    'submit'
                  )}
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setEdit(true)}
                className="rounded-full w-1/4 bg-black text-white p-2 text-xl"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
// LOADING skeleton
const LoadingSkeleton = () => {
  return (
    <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-slate-700 h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-700 rounded"></div>
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
