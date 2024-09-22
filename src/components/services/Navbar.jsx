import {
  LoaderCircleIcon,
  SeparatorHorizontal,
  UserRoundCog,
} from 'lucide-react';
import { BlogAppLogo } from '../../index';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLoginStore, useProfileStore } from '../../zustStore/Store';
import { authService } from '../../index';
// all post , stats , category wise search, search, home, add-post

function Navbar() {
  const { loginStatus, logOutState } = useLoginStore((state) => state);
  const [logOutLoading, setLogOutLoading] = useState(false);
  const { clearProfileData } = useProfileStore((state) => state);
  const logout = async () => {
    setLogOutLoading(true);
    await authService.LogOut();
    logOutState();
    clearProfileData();
    setLogOutLoading(false);
  };
  const navItem = [
    {
      navName: 'Home',
      path: '/',
      active: true,
    },
    {
      navName: 'All-Post',
      path: '/',
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
    <nav>
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b px-4">
        <nav className="">
          <Link to={'/'}>
            <BlogAppLogo className="w-1" />
          </Link>
        </nav>
        <nav className="ml-20 w-[30%]">
          <ul className="flex justify-between">
            {navItem &&
              navItem.map(
                (item) =>
                  item.active && (
                    <Link to={item.path} key={item.navName}>
                      <li>{item.navName}</li>
                    </Link>
                  )
              )}
          </ul>
        </nav>
        <nav className="w-full flex justify-center">
          <form className="w-[40%]">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border-2 border-slate-200 rounded-2xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Mockups, Logos..."
                required
              />
              <button className=" absolute top-0.5 rounded-xl text-white bg-black right-0.5 border p-1 w-20 hover:bg-blue-900 ">
                search
              </button>
            </div>
          </form>
        </nav>
        <main className="flex justify-between p-4">
          <div className="relative group">
            {/* Button */}
            <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">
              <UserRoundCog className="text-gray-700" />
            </button>

            {/* Dropdown Menu */}
            <div
              className={` text-center
              hidden
              absolute right-0 top-9 group-hover:block mt-1 w-32 bg-white  border-gray-300 rounded-lg shadow-lg`}
            >
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
        </main>
      </header>
    </nav>
  );
}

export default Navbar;
