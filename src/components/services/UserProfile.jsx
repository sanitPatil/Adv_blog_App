import { Link, Outlet } from 'react-router-dom';
import { Container } from '../../index';
import { useState } from 'react';
function UserProfile() {
  const [activeIndex, setActiveIndex] = useState(0);
  const navItem = [
    {
      navName: 'General',
      path: '/account-setting/update-email',
    },
    {
      navName: 'Security',
      path: '/account-setting/profile',
    },

    {
      navName: 'Delete Account',
      path: '/account-setting/delete-account',
    },
  ];
  return (
    <main className="grid grid-cols-[20%_80%] border min-h-screen ">
      <div className="bg-slate-50  w-full">
        <div className="w-full sticky">
          <h1 className="text-center text-3xl pt-10 pb-4 font-bold">Setting</h1>
        </div>
        <div className="">
          <nav className="grid text-center w-full">
            <ul className=" w-full">
              {navItem &&
                navItem.map((item, index) => (
                  <Link key={item.navName} to={item.path}>
                    <li
                      className={`p-2 hover:text-lg transition-all duration-100 ${
                        index === activeIndex
                          ? 'border-r-4 border-l-4 text-lg border-blue-500'
                          : ''
                      } rounded-md  font-semibold`}
                      onClick={() => setActiveIndex(index)}
                    >
                      {item.navName}
                    </li>
                  </Link>
                ))}
            </ul>
          </nav>
        </div>
        <div className="absolute bottom-0 w-[20%] h-[20%] text-center">
          hello
        </div>
      </div>

      <div className="bg-slate-100 p-1">
        <Outlet />
      </div>
    </main>
  );
}

export default UserProfile;

export const Profile = () => {
  return <div>update-user-profile</div>;
};

export const UserEmail = () => {
  return <div>update-email-user</div>;
};

export const UserPwd = () => {
  return <div>update-password</div>;
};

export const UserAccount = () => {
  return <div>delete-account</div>;
};
