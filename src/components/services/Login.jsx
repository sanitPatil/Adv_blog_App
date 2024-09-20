import React, { useState } from 'react';
import { authService, Container } from '../../index';
import { useForm } from 'react-hook-form';
import Input from '../Elements/Input';
import { Loader } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLoginStore } from '../../zustStore/Store';
function Login() {
  const { loginState, logOutState } = useLoginStore((state) => state);

  const [error, setError] = React.useState('');
  const [loading, setLoaidng] = useState(false);
  const navigate = useNavigate();
  const linkEmail = useLocation().state;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: linkEmail?.email || '',
    },
  });

  const loginUser = async (data) => {
    setLoaidng(true);
    setError('');
    if (!data) {
      setError('All Fileds Are required!!!');
      setLoaidng(false);
      return;
    }
    const session = await authService.login(data);
    if (!session) {
      console.log(session);

      setError(session.error);
      setLoaidng(false);
      return;
    }
    authService
      .getCurrentLogin()
      .then((userData) => {
        loginState(userData);
      })
      .catch((error) => {
        setError(error.message);
        logOutState();
      });
    setLoaidng(false);
    navigate('/');
  };

  return (
    <section>
      <Container>
        <div className="mx-auto items-center justify-center py-12 w-full pb-2">
          <div className="mx-auto grid w-[450px] gap-6 border-b-2 p-4 shadow-lg rounded-md ">
            <div className="grid gap-2 text-center ">
              <h1 className="text-3xl font-bold">Login</h1>
              {error && (
                <p className="text-red-700 text-center w-full ">{error}</p>
              )}
            </div>
            <form onSubmit={handleSubmit(loginUser)}>
              <div className="grid gap-4">
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
                      'Login'
                    )}
                  </button>
                </div>
                {/* <button className="w-full">Login with Google</button> */}
              </div>
            </form>
            <div className="mt-2 text-center font-bold text-sm">
              Don&apos;t have an account?{' '}
              <Link to={'/register'} className="underline">
                <span className="text-blue-900 underline ">Sign Up</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Login;
