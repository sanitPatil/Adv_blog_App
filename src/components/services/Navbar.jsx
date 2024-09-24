import { LoaderCircleIcon, Moon, Sun, UserRoundCog } from 'lucide-react';
import { BlogAppLogo } from '../../index';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  useBlogListStore,
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
  const { clearBlogList } = useBlogListStore((state) => state);
  const { switchTheme } = useTheme((state) => state);
  const logout = async () => {
    await authService.LogOut();
    logOutState();
    clearProfileData();
    clearBlogList();
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
    <nav>
      <header className="sticky top-0 flex h-16 items-center gap-4  px-4 ">
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
                      <li className="font-semibold text-xl hover:underline hover:underline-offset-4">
                        {item.navName}
                      </li>
                    </Link>
                  )
              )}
          </ul>
        </nav>
        <nav className="w-full flex justify-end m-2">
          <main className="flex justify-between p-4">
            <div className="relative group">
              <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">
                <UserRoundCog className="text-gray-700" />
              </button>

              <div
                className={`text-center
  opacity-0 pointer-events-none
  absolute right-0 top-9 group-hover:opacity-100 group-hover:pointer-events-auto mt-1 w-32 bg-white border-gray-300 rounded-lg shadow-lg transition-opacity duration-300`}
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
            <div className="ml-2 border rounded-full">
              <button
                onClick={() => switchTheme()}
                className="p-2 rounded-full"
              >
                {darkTheme ? <Moon /> : <Sun className="text-yellow-500 " />}
              </button>
            </div>
          </main>
        </nav>
      </header>
    </nav>
  );
}

export default Navbar;
