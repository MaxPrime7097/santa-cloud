import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import SnowEffect from './SnowEffect';

const Layout = () => {
  return (
    <div className="min-h-screen">
      <SnowEffect />
      <Sidebar />
      <div className="pl-16 md:pl-64 transition-all duration-300">
        <Topbar />
        <main className="relative z-10 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
