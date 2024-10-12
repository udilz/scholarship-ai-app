
import { Navbar } from './navbar';
import { Outlet } from 'react-router-dom';

export const Layout= () => {

  
  return (
    <main className='h-screen overflow-hidden'>
      <Navbar />
      <Outlet/>
    </main>
  );
};
