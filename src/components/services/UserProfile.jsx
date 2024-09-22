import { useEffect, useState } from 'react';
import { useLoginStore, useProfileStore } from '../../zustStore/Store';
import { LoaderCircle, Pencil, UserRoundPen } from 'lucide-react';
import Input from '../Elements/Input';
import { useForm } from 'react-hook-form';
import { authService, storageService } from '../../index';
import { useNavigate } from 'react-router-dom';
function UserProfile() {
  const [activeIndex, setActiveIndex] = useState(0);

  const navItem = [
    {
      navName: 'General',
    },
    {
      navName: 'Security',
    },

    // {
    //   navName: 'Delete Account',
    // },
  ];

  return (
    <main className="grid grid-cols-[20%_80%]  max-h-screen ">
      <div className="h-[85vh] w-full text-white bg-neutral-950">
        <div className="w-full">
          <h1 className="text-center text-3xl pt-10 pb-4 font-bold">Setting</h1>
        </div>
        <div className="">
          <nav className="grid text-center w-full">
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
      <section className=" w-full mx-auto items-center mt-12">
        <main className={`${activeIndex === 0 ? '' : 'hidden'}`}>
          <PersonalUpdate />
        </main>
        <main id="#security" className={`${activeIndex === 1 ? '' : 'hidden'}`}>
          <Security />
        </main>
        {/* <main className={`${activeIndex === 2 ? '' : 'hidden'}`}>
          <AccountDelete />
        </main> */}
      </section>
    </main>
  );
}

export default UserProfile;
// ***********************************************************************************
const PersonalUpdate = () => {
  const [edit, setEdit] = useState(false);
  const { loginUser } = useLoginStore((state) => state);
  const { profileData } = useProfileStore((state) => state);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: profileData?.name || '',
      username:
        profileData?.username ||
        profileData?.name.split(' ')[0] + '@' + profileData?.$id.substr(0, 5),
      bio: profileData?.bio || '',
    },
  });

  useEffect(() => {
    storageService
      .previewFile(profileData?.profilePicture)
      .then((res) => setUrl(res));
  }, []);
  const userProfileData = async (data) => {
    setError('');
    setLoading(true);
    // console.log(data);
    const fileId = profileData?.profilePicture;
    const filePath = data?.profilePicture[0];
    let res = '';
    if (filePath) {
      res = await storageService.updateFile({ fileId, filePath });
    }
    if (!res) {
      setError('failed to update Profile Picture');
      setLoading(false);
      setEdit(false);
      return;
    }
    data.userId = profileData?.userId;
    data.profilePicture = res.$id;

    const profile = await storageService.updateUserProfile(
      profileData?.$id,
      data
    );
    if (!profile) {
      setError('profile Error please try again');
      setLoading(false);
      return;
    }
    setEdit(false);
    setLoading(false);
    reset();
    alert('profile updated successfully');
  };
  return (
    <div>
      {error && <p className="text-red-700 text-center">{error}</p>}
      <form onSubmit={handleSubmit(userProfileData)}>
        <div className="border">
          <div className=" w-full h-full">
            <h1 className="text-center text-3xl font-semibold mt-4">
              User Profile Details
            </h1>
            <div className="grid grid-cols-2 gap-6 mt-2">
              <div className="">
                <div className="flex justify-end pr-10 pt-1">
                  {!edit ? (
                    <label
                      onClick={() => setEdit(true)}
                      className=" bg-black font-semibold p-2 m-2  text-white rounded-xl"
                    >
                      Edit
                    </label>
                  ) : (
                    <button
                      type="submit"
                      className=" bg-black font-semibold p-2 m-2  text-white rounded-xl"
                    >
                      {loading ? (
                        <LoaderCircle className="animate-spin" />
                      ) : (
                        'save & update'
                      )}
                    </button>
                  )}
                </div>
                <div className="flex justify-between p-1 m-2  ">
                  <label className="p-1">Name</label>
                  <input
                    {...register('name')}
                    disabled={true}
                    type="text"
                    className={`w-[70%]  rounded p-2  ${edit ? 'border' : ''}`}
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
                    className={`w-[70%]  rounded p-2  ${edit ? 'border' : ''}`}
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
                    className={`w-[70%]  rounded p-2  ${edit ? 'border' : ''}`}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className=" mx-auto text-center ">
                  {profileData ? (
                    <img
                      alt="profile picture"
                      src={url}
                      className="h-40 w-40 mt-10 mx-auto border hover:border-purple-800 rounded-full text-center hover:scale-125 transition-transform duration-200"
                    />
                  ) : (
                    <UserRoundPen className="w-full h-full p-2 rounded-full border text-center" />
                  )}
                </div>
                <div className="flex items-center mr-6">
                  <Input
                    {...register('profilePicture')}
                    label="choose Profile"
                    className={`block w-full text-sm text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-violet-50 file:text-violet-700 rounded-2xl 
                               ${
                                 !edit
                                   ? 'hover:file:bg-gray-100'
                                   : ' hover:file:bg-violet-100 '
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
    </div>
  );
};

// =************************************************************************************************
const Security = () => {
  //security
  const [edit, setEdit] = useState(false);
  const { loginUser } = useLoginStore((state) => state);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const updateEmail = async (data) => {
    setError('');
    setLoading(true);
    console.log(data);

    if (!data) {
      setError('All fileds Are required!');
      setEdit(true);
      setLoading(false);
      return;
    }
    const emailRes = await authService.updateUserEmail(data);
    if (!emailRes) {
      setError('failed to update Email please try again');
      setLoading(false);
    }
    setError('');
    setEdit(false);
    setLoading(false);
    reset();
    alert(`email update successfully`);
  };
  return (
    <>
      <h1 className="text-3xl font-semibold mt-4 text-center pt-2">
        Security{' '}
      </h1>
      {error && <p>{error}</p>}
      <div className="grid grid-cols-2 gap-4 ">
        <form onSubmit={handleSubmit(updateEmail)}>
          <div className="w-full  mt-4  text-ceter"></div>
          <Input
            {...register('email', {
              required: true,
            })}
            type="email"
            label="Email"
            className={`p-2 rounded-lg mt-2 mb-2 ${
              !edit ? 'border-none bg-slate-50' : ''
            }`}
            disabled={!edit}
            placeholder={loginUser && loginUser?.email}
          ></Input>
          <Input
            {...register('password', {
              required: true,
            })}
            type="password"
            label="password"
            className={`p-2 rounded-lg mt-2 mb-2 ${
              !edit ? 'border-none bg-slate-50' : ''
            }`}
            disabled={!edit}
          ></Input>
          <div className="text-center">
            <button
              type={!edit ? 'button' : 'submit'}
              onClick={!edit ? () => setEdit(true) : null}
              className="text-xl p-2 rounded-lg font-bold bg-black text-white"
            >
              {!edit ? 'Edit' : 'Update&save'}
            </button>
          </div>
        </form>
        {/* {new form} */}
        <UpdatePassword />
      </div>
    </>
  );
};

/*************************************************************************** */
const UpdatePassword = () => {
  const [edit, setEdit] = useState(false);
  const { loginUser } = useLoginStore((state) => state);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const updatePWD = (data) => {
    setError('');
    setLoading(true);
    if (!data) {
      setError('All fileds Required!');
      setEdit(false);
      setLoading(false);
      return;
    }

    authService
      .updateUserPassword(data)
      .then((res) => {
        alert('update passowrd successfuly.');
        setLoading(false);
        setError('');
        setEdit(false);
        reset();
        return;
      })
      .catch((err) => {
        setError(`${err}`);
        setLoading(false);
        setEdit(false);
        return;
      });
  };
  return (
    <>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit(updatePWD)}>
        <div className=" mt-2 p-2">
          <div className="grid grid-cols-2 ">
            <div>
              <Input
                {...register('oldPassword', {
                  required: true,
                })}
                type="password"
                label="old-password"
                className="p-2 rounded-lg mt-2"
                disabled={!edit}
              ></Input>
            </div>
            <div>
              <Input
                {...register('newPassword', {
                  required: true,
                })}
                type="password"
                label="New password"
                className="p-2 rounded-lg mt-2"
                disabled={!edit}
              ></Input>
            </div>
          </div>
          <div className="text-center m-2">
            <button
              type={!edit ? 'button' : 'submit'}
              onClick={!edit ? () => setEdit(true) : null}
              className="text-xl p-1  rounded-lg font-bold bg-black text-white"
            >
              {!edit ? 'Edit' : 'Update & Save'}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

////////////****************************************************************************** */
// const AccountDelete = () => {
//   const [showModal, setShowModal] = useState(false);
//   const { loginUser } = useLoginStore((state) => state);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleDeleteAccount = () => {
//     setError('');
//     setLoading(true);
//     if (!loginUser?.$id) {
//       setError('id could not be found please try again');
//       setLoading(false);
//     }
//     authService
//       .deleteAccount(loginUser.$id)
//       .then((res) => {
//         alert('account deleted succesfully');
//         setError('');
//         setLoading(false);
//         setShowModal(false);
//         return;
//       })
//       .catch((err) => {
//         setError(`${err.message}`);
//         setLoading(false);
//         setShowModal(false);
//         return;
//       });
//   };
//   return (
//     <>
//       <div>
//         <div className="w-full h-full text-center m-4 font-bold text-red-700 text-3xl">
//           <h1>Delete Account</h1>
//           {error && <p>{error}</p>}
//         </div>

//         <div className="w-full h-full text-center">
//           <button
//             className="bg-red-700 p-2 text-white font-bold "
//             onClick={() => setShowModal(true)}
//           >
//             Delete Account
//           </button>
//         </div>
//         {showModal && (
//           <div className="modal">
//             <div className="modal-content text-red-700 p-2 text-center m-4">
//               <h2>Are you sure?</h2>
//               <p>
//                 This action cannot be undone. You will permanently lose all your
//                 data associated with this account.
//               </p>
//             </div>
//             <div className="w-full h-full text-red-700 text-center font-semibold">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="p-2 font-bold border text-white bg-red-700 rounded-lg m-2"
//               >
//                 Cancel
//               </button>
//               <div className="w-full">
//                 <button
//                   onClick={handleDeleteAccount}
//                   className="p-2 font-bold border w-30 h-full text-white bg-red-700 rounded-lg"
//                 >
//                   {!loading ? (
//                     'Comfirm Delete'
//                   ) : (
//                     <LoaderCircle className="animate-spin" />
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };
