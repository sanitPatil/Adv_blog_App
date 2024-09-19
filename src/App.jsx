import { authService, Footer, Navbar } from './index';
import { useLoginStore } from './zustStore/Store';
import { Outlet } from 'react-router-dom';
function App() {
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
