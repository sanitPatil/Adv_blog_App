import React, { useCallback, useEffect, useState } from 'react';
import { authService, Container, storageService } from '../../index';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import debounce from 'debounce';

// const checkUserName = debounce(async (username) => {
//   try {
//     const res = await storageService.checkUserName(username);
//     return res.total > 0;
//   } catch (error) {
//     console.log(`Error while checking username:${error}`);
//   }
// }, 500);

function Register() {
  const {
    handleSubmit,
    register,
    reset,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState('');
  //const [IsTaken, setIsTaken] = useState(false);

  // const handleUserName = useCallback((username) => {
  //   if (username) {
  //     setIsTaken(checkUserName(username));
  //   } else {
  //     setIsTaken(false);
  //   }
  // }, []);

  //const username = watch('username');
  // useEffect(() => {
  //   handleUserName(username);
  // }, [username, handleUserName]);

  const createUser = async (data) => {
    setError('');
    if (!data) {
      setError('empty data');
      return;
    }

    const res = await authService.register(data);
    if (!res) {
      setError(`${res}`);
      return;
    }
    console.log(res);

    reset();
    setError('');
  };

  return (
    <Container>
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[600px] border">
        <div className="flex items-center justify-center py-12 border">
          <div className="mx-auto grid w-[450px] gap-6 border p-4">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Enter Following Details To Register.
              </p>
            </div>
            <form onSubmit={handleSubmit(createUser)}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="username">User Name</label>
                  <input
                    {...register('username', {
                      required: true,
                      pattern: {
                        value: /^[^\s]+$/,
                        message: 'space are not allowed!!!',
                      },
                    })}
                    className={`border p-2 rounded-md ${
                      errors?.username ? 'border-red-800' : ''
                    }`}
                    id="username"
                    type="text"
                    placeholder="blogUser123"
                  />
                  {/* {IsTaken && (
                    <p className="text-red-800 italic">
                      userName Already taken...try new one
                    </p>
                  )} */}
                  {errors && (
                    <p className="text-red-800">{errors?.username?.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <label htmlFor="email">Email</label>

                  <input
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
                  <label htmlFor="password">password</label>
                  <input
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
                    className={`border p-2 w-[20%] pointer rounded-lg
                        hover:bg-gray-700
                      `}
                    disabled={errors === null ? true : false}
                  >
                    Register
                  </button>
                </div>
                {/* <button className="w-full">Login with Google</button> */}
              </div>
            </form>
            <div className="mt-2 text-center font-bold text-sm">
              Already have an account?{' '}
              {/* <Link to={'/'} className="underline"> */}
              <span className="text-blue-900 underline ">Sign In</span>
              {/* </Link> */}
            </div>
          </div>
        </div>

        {/* 2nd part  */}
        <div className="hidden bg-muted lg:block">
          <img
            src="/placeholder.svg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </Container>
  );
}

export default Register;
