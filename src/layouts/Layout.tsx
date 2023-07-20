import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="py-16 px-8 lg:px-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
