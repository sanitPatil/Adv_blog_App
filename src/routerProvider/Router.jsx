import { createBrowserRouter } from 'react-router-dom';
import { Login, Register, UserProfile, AuthLayout } from '..';
import App from '../App';

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
      {
        path: '/account-setting',
        element: (
          <AuthLayout>
            <UserProfile />
          </AuthLayout>
        ),
      },
    ],
  },
]);

export default router;
