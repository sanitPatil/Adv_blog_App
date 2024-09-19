import { useState } from 'react';
import { authService, Container } from '../../index';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Input from '../Elements/Input';
import { Loader } from 'lucide-react';

function Register() {
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
    setLoading(false);
    setError('');
    reset();

    navigate('/login', { state: { email: data?.email } });
  };

  return (
    <Container>
      <div className="relative max-h-screen top-2 flex z-10 items-center justify-center py-4 w-full">
        <div className="mx-auto grid w-[450px] gap-6 border-b-2 p-4 shadow-lg rounded-md ">
          <div className="grid gap-2 text-center ">
            <h1 className="text-3xl font-bold">Register</h1>
            <p className="text-balance text-muted-foreground">
              Enter Following Details To Register.
            </p>
            {error && (
              <p className="text-red-700 text-center w-full ">{error}</p>
            )}
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
            <Link to={'/login'} className="underline">
              <span className="text-blue-900 underline ">Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Register;
