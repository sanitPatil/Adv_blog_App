import React from 'react';
import { authService, Footer, Navbar } from './index';
import { useLoginStore } from './zustStore/Store';
import { Outlet } from 'react-router-dom';
function App() {
  const { logOutState } = useLoginStore((state) => state);
  const logout = async () => {
    await authService.LogOut();
    logOutState();
    console.log('hello');
  };
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
