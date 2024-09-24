import { useEffect } from 'react';
import { authService, Footer, Navbar } from './index';
import { useLoginStore, useTheme } from './zustStore/Store';
import { Outlet } from 'react-router-dom';
function App() {
  const { loginState } = useLoginStore((state) => state);
  const { darkTheme } = useTheme((state) => state);
  useEffect(() => {
    (async () => {
      const loginRes = await authService.getCurrentLogin();
      loginState(loginRes);
    })();
  }, []);

  useEffect(() => {
    const themeValue = darkTheme === true ? 'dark' : 'light';
    localStorage.setItem('theme', themeValue);
    document.querySelector('#root').classList.remove('light', 'dark');
    document.querySelector('#root').classList.add(themeValue);
  }, [darkTheme]);
  return (
    <div className="dark:bg-slate-900 dark:text-slate-50">
      <Navbar />
      <Outlet />
      <footer className=" bg-gray-950 z-0 w-full text-center p-4  text-sm border-box">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
