import { useEffect } from 'react';
import { authService, Footer, Navbar } from './index';
import { useLoginStore } from './zustStore/Store';
import { Outlet } from 'react-router-dom';
function App() {
  const { loginState } = useLoginStore((state) => state);

  useEffect(() => {
    (async () => {
      const loginRes = await authService.getCurrentLogin();
      loginState(loginRes);
    })();
  }, []);
  return (
    <div>
      <Navbar />
      <Outlet />
      <footer className=" bg-slate-200 z-0 w-full text-center p-4  text-sm border-box">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
