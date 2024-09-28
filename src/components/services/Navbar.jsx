import { LoaderCircleIcon, Moon, Sun, UserRoundCog } from 'lucide-react';
import { BlogAppLogo } from '../../index';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  useLoginStore,
  useProfileStore,
  useTheme,
} from '../../zustStore/Store';
import { authService } from '../../index';

function Navbar() {
  const { loginStatus, logOutState } = useLoginStore((state) => state);
  const { darkTheme } = useTheme((state) => state);
  const [logOutLoading] = useState(false);
  const { clearProfileData } = useProfileStore((state) => state);
  const { switchTheme } = useTheme((state) => state);
  const logout = async () => {
    await authService.LogOut();
    logOutState();
    clearProfileData();
  };
  const navItem = [
    {
      navName: 'Home',
      path: '/',
      active: true,
    },
    {
      navName: 'all-Post',
      path: '/all-post',
      active: loginStatus,
    },
    {
      navName: 'Add-Post',
      path: '/add-post',
      active: loginStatus,
    },
    {
      navName: 'Login',
      path: '/login',
      active: !loginStatus,
    },
    {
      navName: 'Register',
      path: '/register',
      active: !loginStatus,
    },
  ];

  return (
    <div className="w-full dark:bg-black h-16 sticky">
      <div className="flex mx-3 justify-between">
        <div className="flex gap-6  p-1">
          <div className="">
            <Link to={'/'}>
              <BlogAppLogo className="p-2" />
            </Link>
          </div>
          <div className="p-2 m-2">
            <ul className="flex gap-4">
              {navItem &&
                navItem.map(
                  (item) =>
                    item.active && (
                      <Link to={item.path} key={item.navName}>
                        <li className="font-semibold text-xl hover:underline hover:underline-offset-4">
                          {item.navName}
                        </li>
                      </Link>
                    )
                )}
            </ul>
          </div>
        </div>

        <div className="flex mr-4 mt-3 justify-center">
          <div className="relative group">
            <div className=" relative group ">
              <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">
                <UserRoundCog className="text-gray-900" />
              </button>
              <div className="absolute  hidden group-hover:block">
                <ul className="rounded-lg bg-slate-50">
                  <li>
                    <Link
                      to={'/account-setting'}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Account
                    </Link>
                  </li>
                  {loginStatus && (
                    <li>
                      <Link
                        to={'/account-setting/stats'}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                    </li>
                  )}
                  {loginStatus && (
                    <li className="mt-2">
                      <button
                        onClick={logout}
                        className="block px-4 py-2 text-white bg-black rounded hover:bg-red-900 w-full"
                      >
                        {logOutLoading ? (
                          <LoaderCircleIcon className="animate-spin w-full text-center" />
                        ) : (
                          'Logout'
                        )}
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className="">
            <div className="ml-2 border rounded-full ">
              <button
                onClick={() => switchTheme()}
                className="p-2 rounded-full"
              >
                {darkTheme ? <Moon /> : <Sun className="text-yellow-500 " />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

{
  /* <nav className=" top-0 flex h-16 items-center gap-4  p-6 ">
      <div className="flex flex-wrap p-4">
        <div className="">
          <Link to={'/'}>
            <BlogAppLogo className="w-1" />
          </Link>
        </div>
        <div className="mt-2 ml-8">
          <ul className="flex justify-between w-full gap-6 border">
            {navItem &&
              navItem.map(
                (item) =>
                  item.active && (
                    <Link to={item.path} key={item.navName}>
                      <li className="font-semibold text-xl hover:underline hover:underline-offset-4">
                        {item.navName}
                      </li>
                    </Link>
                  )
              )}
          </ul>
        </div>
      </div>
    </nav> */
}
