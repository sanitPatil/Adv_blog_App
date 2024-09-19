import { createBrowserRouter } from 'react-router-dom';
import { Login, Register, UserProfile, AuthLayout } from '..';
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
    children: [
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },

  {
    path: '/account-setting',
    element: (
      <AuthLayout>
        <UserProfile />
      </AuthLayout>
    ),
    children: [
      {
        path: '/account-setting/profile',
        element: (
          <AuthLayout>
            <Profile />
          </AuthLayout>
        ),
      },
      {
        path: '/account-setting/update-email',
        element: (
          <AuthLayout>
            <UserEmail />
          </AuthLayout>
        ),
      },
      {
        path: '/account-setting/update-password',
        element: (
          <AuthLayout>
            <UserPwd />
          </AuthLayout>
        ),
      },
      {
        path: '/account-setting/delete-account',
        element: (
          <AuthLayout>
            <UserAccount />
          </AuthLayout>
        ),
      },
    ],
  },
]);

export default router;
