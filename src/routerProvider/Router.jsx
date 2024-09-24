import { createBrowserRouter } from 'react-router-dom';
import {
  Login,
  Register,
  UserProfile,
  AuthLayout,
  AddPost,
  Home,
  AllPost,
  BlogCard,
} from '..';
import App from '../App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/all-post',
        element: (
          <AuthLayout>
            <AllPost />
          </AuthLayout>
        ),
      },
      {
        path: '/blog/:blogId',
        element: (
          <AuthLayout>
            <BlogCard />
          </AuthLayout>
        ),
      },
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
