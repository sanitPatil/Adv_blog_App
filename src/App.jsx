import { useEffect } from 'react';
import { authService, config, Footer, Navbar } from './index';
import { useLoginStore } from './zustStore/Store';
import { Outlet, useNavigate } from 'react-router-dom';
function App() {
  const navigate = useNavigate();
  const { loginStatus, LoginUser, loginState, logOutState } = useLoginStore(
    (state) => state
  );

  useEffect(() => {
    authService.getCurrentLogin().then((userData) => {
      if (userData) {
        loginState(userData);
      } else {
        logOutState();
      }
    });
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
      <footer className=" bg-slate-200 z-0 w-full text-center p-4 fixed bottom-0 text-sm border-box">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
