
import { Navbar } from './navbar';
import { Outlet } from 'react-router-dom';

export const Layout= () => {

  
  return (
    <main className=''>
      <Navbar />
      <Outlet/>
    </main>
  );
};
