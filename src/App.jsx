import { useEffect } from 'react';
import { authService, Footer, Navbar } from './index';
import { useLoginStore, useTheme } from './zustStore/Store';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
function App() {
  const { loginState } = useLoginStore((state) => state);
  const { darkTheme } = useTheme((state) => state);

  const getLoginUser = async () => {
    return await authService.getCurrentLogin();
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ['login-user'],
    queryFn: getLoginUser,
    staleTime: 20000,
  });
  useEffect(() => {
    if (data) {
      loginState(data);
    }
  }, [data]);
  useEffect(() => {
    const themeValue = darkTheme === true ? 'dark' : 'light';
    localStorage.setItem('theme', themeValue);
    document.querySelector('#root').classList.remove('light', 'dark');
    document.querySelector('#root').classList.add(themeValue);
  }, [darkTheme]);

  return (
    <div className="dark:bg-slate-900 dark:text-slate-100">
      <div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            className: '',
            duration: 5000,
          }}
        />
      </div>
      <Navbar />
      <Outlet />
      <footer className=" bg-gray-950 z-0 w-full text-center h-full text-sm border-box">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
