import { useState } from 'react';
import { authService, Container, storageService } from '../../index';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Input from '../Elements/Input';
import { Loader, LoaderCircle, User2Icon } from 'lucide-react';
import { useLoginStore, useProfileStore } from '../../zustStore/Store';

function Register() {
  const { loginState, logOutState } = useLoginStore((state) => state);
  const [profile, setProfile] = useState(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    mode: `onChange`,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const createUser = async (data) => {
    setLoading(true);
    setError('');
    if (!data) {
      setError('All fileds are required!!!');
      setLoading(false);
      return;
    }
    const res = await authService.register(data);

    if (!res) {
      setError('Error while registrating user please try again...');
      setLoading(false);
      return;
    }
    authService.getCurrentLogin().then((userData) => {
      if (userData) {
        loginState(userData);
      } else {
        setError('Regitration Error. failed get Data');
        setLoading(false);
        logOutState();
      }
    });
    setLoading(false);
    setError('');
    reset();
    setProfile(true);
    alert('successfully register, please complete profile.');
  };

  return (
    <div className="mx-auto relative max-h-screen top-2  flex  z-10 items-center justify-center py-2 w-1/2">
      <div
        className={`mx-auto grid w-1/2 border-b-2 p-4 shadow-2xl ${
          !profile ? ' ' : 'hidden'
        }`}
      >
        <div className="grid gap-2 text-center ">
          <h1 className="text-3xl font-bold">Register</h1>
          <p className="text-balance text-muted-foreground">
            Enter Following Details To Register.
          </p>
          {error && <p className="text-red-700 text-center w-full ">{error}</p>}
        </div>
        <form onSubmit={handleSubmit(createUser)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              {/* <label htmlFor="name">Name</label> */}
              <Input
                {...register('name', {
                  required: true,
                  maxLength: 20,
                  minLength: 5,
                })}
                className={`border p-2 rounded-md ${
                  errors?.name ? 'border-red-800' : ''
                }`}
                label="Name"
                id="name"
                type="text"
                placeholder="John Doe"
              />
              {errors && (
                <p className="text-red-800">{errors?.name?.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              {/* <label htmlFor="email">Email</label> */}

              <Input
                label="Email"
                {...register('email', {
                  required: true,
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: `Email address must be a valid address!!!`,
                  },
                })}
                className={`border p-2 rounded-md ${
                  errors?.email ? 'border-red-800' : ''
                }`}
                id="email"
                type="email"
                placeholder="m@example.com"
              />
              {errors && (
                <p className="text-red-800">{errors?.email?.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              {/* <label htmlFor="password">password</label> */}
              <Input
                label="Password"
                {...register('password', {
                  required: true,
                  pattern: {
                    value: /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/,
                    message:
                      'Password must be at least 8 characters long and include one uppercase letter',
                  },
                })}
                className={`border p-2 rounded-md ${
                  errors?.password ? 'border-red-800' : ''
                }`}
                id="password"
                type="password"
              />
              {errors && (
                <p className="text-red-800">{errors?.password?.message}</p>
              )}
            </div>

            <div className="w-full text-center ">
              <button
                type="submit"
                className={` font-semibold p-2 rounded-lg border-2 text-white bg-black border-black w-[25%] }`}
                disabled={loading}
              >
                {loading ? (
                  <LoaderCircle className=" w-full animate-spin items-center" />
                ) : (
                  'Register'
                )}
              </button>
            </div>
            {/* <button className="w-full">Login with Google</button> */}
          </div>
        </form>
        <div className="mt-2 text-center font-bold text-sm">
          Already have an account?{' '}
          <Link to={'/login'} className="underline">
            <span className="text-blue-900 underline ">Sign In</span>
          </Link>
        </div>
      </div>
      <div
        className={`${
          profile
            ? 'mx-auto mt-20 grid w-[80%] border-b-2 p-4 shadow-2xl'
            : ' hidden'
        }`}
      >
        <CreateProfile />
      </div>
    </div>
  );
}

export default Register;

export const CreateProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { handleSubmit, register, reset } = useForm();
  const { loginUser } = useLoginStore((state) => state);
  const { setProfileData, clearProfileData } = useProfileStore(
    (state) => state
  );
  const completeUserProfile = async (data) => {
    setLoading(true);
    setError('');

    data.userId = loginUser.$id;
    data.name = loginUser.name;

    if (!data) {
      setError('All fileds are required!!!');
      setLoading(false);
      return;
    }
    console.log('done 1');

    const picRes = await storageService.uploadFile(data?.profilePicture[0]);
    if (!picRes) {
      setError('Failed to store profile Picture !!!');
      setLoading(false);
      navigate('/login');
      return;
    }
    console.log('done 2');

    data.profilePicture = picRes.$id;
    const res = await storageService.setUserProfile(data);
    if (!res) {
      setError(
        'Error while setting user please try again...from account setting'
      );
      setLoading(false);
      return;
    }
    console.log('done 3');

    setProfileData(res);
    setLoading(false);
    setError('');
    reset();
    navigate('/');
  };
  return (
    <>
      <div className="grid gap-2 text-center ">
        <h1 className="text-2xl font-semibold">Complete User Profile</h1>
        {error && <p className="text-red-700 text-center w-full ">{error}</p>}
      </div>
      <form onSubmit={handleSubmit(completeUserProfile)}>
        <div className="flex gap-6 items-center ml-12 justify-center mt-4 mb-4">
          <div className="shrink-0">
            <User2Icon className="border h-16 w-16 object-cover rounded-full" />
          </div>
          <label className="block">
            <span className="sr-only">Choose profile photo</span>
            <input
              {...register('profilePicture')}
              type="file"
              className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100
    "
            />
          </label>
        </div>
        <div className="flex text-center">
          <Input
            {...register('username', {
              pattern: {
                value: /\S+/,
                message:
                  'user name must not contain white space you can use make of _ underscore',
              },
            })}
            label="userName"
            className="rounded-lg p-2 shad ow w[70%]"
          />
          <Input
            {...register('bio')}
            label="bio"
            className="rounded-lg p-2 shadow w[70%]"
          />
        </div>
        <div className="text-center">
          <button
            className="text-white bg-black p-2 rounded-full w-1/4"
            disabled={loading}
          >
            {loading ? (
              <LoaderCircle className=" w-full animate-spin items-center" />
            ) : (
              'Save'
            )}
          </button>
        </div>
      </form>
    </>
  );
};
