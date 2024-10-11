import { Menu } from './layout.menu';
import { Home } from 'lucide-react';
import { Box } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Outlet } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

interface LayoutProps {
  isCentered?: boolean;
}

export const LayoutDashboard = (props: LayoutProps) => {
  const navigate = useNavigate();
  const { mutate: handleLogout } = useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      try {
        const res = await fetch('http://localhost:8000/api/v1/users/logout', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        });

        const data = await res.json();
        Cookies.remove('user');
        navigate('/login');
        return data;
      } catch (error) {
        console.log(error);
        throw new Error('Internal server error');
      }
    },
  });

  return (
    <div className="flex h-screen font-poppins">
      <aside className="flex w-[240px] flex-col justify-between bg-gradient-to-b from-primary-50/50 to-violet-50/50 p-6">
        <section>
          <div className="mb-4 px-3 py-2 text-base font-bold">Scholarship</div>
          <Menu label="Dashboard" href="/dashboard" icon={<Home size={18} />} />
          <Menu label="Beasiswa" href="/dashboard/scholarship" icon={<Box size={18} />} />
        </section>
        <div>
          <Button className='flex w-full justify-center' onClick={() => handleLogout()} variant='primary'>
            Logout
          </Button>
        </div>
      </aside>
      {props.isCentered ? (
        <main className="w-[calc(100vw-240px)] overflow-y-auto p-6">
          <div className="m-auto max-w-2xl">
            <Outlet />
          </div>
        </main>
      ) : (
        <main className="w-[calc(100vw-240px)] overflow-y-scroll px-6">
          <div className="m-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
      )}
    </div>
  );
};
