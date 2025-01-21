import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
export default function Layout() {
  return (
    <div className="flex justify-center min-h-screen bg-gray-50">
      <div className="w-[390px] h-[844px] relative bg-white overflow-y-auto">
      <Navbar />
      <Outlet />
      </div>
      </div>
  );
}
