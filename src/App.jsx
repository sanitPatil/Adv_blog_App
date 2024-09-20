import { useEffect } from 'react';
import { authService, Footer, Navbar } from './index';
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
      <footer className="">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
