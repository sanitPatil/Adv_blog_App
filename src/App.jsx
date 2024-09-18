import React from 'react';
import { authService } from './index';
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
      hello world
      <button onClick={logout}>logout</button>
    </div>
  );
}

export default App;
