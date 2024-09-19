import React from 'react';
import { authService, Navbar } from './index';
import { useLoginStore } from './zustStore/Store';
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
      hello world
      <button onClick={logout}>logout</button>
    </div>
  );
}

export default App;
