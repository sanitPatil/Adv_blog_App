import { createBrowserRouter } from 'react-router-dom';
import { Login, Register, UserProfile } from '..';
import App from '../App';
import {
  Profile,
  UserEmail,
  UserPwd,
  UserAccount,
} from '../components/services/UserProfile';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/account-setting',
    element: <UserProfile />,
    children: [
      {
        path: '/account-setting/profile',
        element: <Profile />,
      },
      {
        path: '/account-setting/update-email',
        element: <UserEmail />,
      },
      {
        path: '/account-setting/update-password',
        element: <UserPwd />,
      },
      {
        path: '/account-setting/delete-account',
        element: <UserAccount />,
      },
    ],
  },
]);

export default router;
