import { createBrowserRouter } from 'react-router-dom';
import { Login, Register, UserProfile, AuthLayout, AddPost } from '..';
import App from '../App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/add-post',
        element: (
          <AuthLayout>
            <AddPost />
          </AuthLayout>
        ),
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
