import { useEffect } from 'react';
import { authService, config, Footer, Navbar, storageService } from './index';
import { useLoginStore, useProfileStore } from './zustStore/Store';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
function App() {
  const navigate = useNavigate();
  const { loginStatus, LoginUser, loginState, logOutState } = useLoginStore(
    (state) => state
  );
  const { setProfileData, clearProfileData } = useProfileStore(
    (state) => state
  );
  useEffect(() => {
    (async () => {
      const loginRes = await authService.getCurrentLogin();
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
