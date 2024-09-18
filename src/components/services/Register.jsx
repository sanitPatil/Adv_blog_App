import React, { useCallback, useEffect, useState } from 'react';
import { authService, Container, storageService } from '../../index';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import debounce from 'debounce';
import Input from '../Elements/Input';
import { Loader } from 'lucide-react';

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
    formState: { errors, isValid },
  } = useForm({
    mode: `onChange`,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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

    // console.log(data);
    setLoading(true);
    const res = await authService.register(data);
    setLoading(false);
    if (res) {
    }
  };
  //console.log(isValid);

  return (
    <Container>
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[600px] ">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[450px] gap-6 border-b-2 p-4 shadow-lg rounded-md ">
            <div className="grid gap-2 text-center ">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Enter Following Details To Register.
              </p>
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
                  {/* {IsTaken && (
                    <p className="text-red-800 italic">
                     Already taken...try new one
                    </p>
                  )} */}
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
                    className={` font-semibold p-2 rounded-lg border-2 border-black w-[25%] }`}
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader className=" w-full animate-spin items-center" />
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
