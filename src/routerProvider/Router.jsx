import { createBrowserRouter } from 'react-router-dom';
import { Login, Register, UserProfile, AuthLayout, AddPost, Home } from '..';
import App from '../App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/Home',
        element: <Home />,
      },
      // {
      //   path: '/Aall-post',
      //   element:(<AuthLayout>
      //   <AllPost/>
      //   </AuthLayout>),
      // },
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
