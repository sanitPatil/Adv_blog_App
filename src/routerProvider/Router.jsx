import { createBrowserRouter } from 'react-router-dom';
import { Login, Register } from '..';
import App from '../App';
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
]);

export default router;
