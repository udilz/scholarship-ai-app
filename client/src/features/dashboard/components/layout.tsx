import { Menu } from './layout.menu';
import { Home } from 'lucide-react';
import { Box } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Outlet } from 'react-router-dom';


interface LayoutProps {
    isCentered?: boolean;
  }


export const LayoutDashboard = (props: LayoutProps) => {
    return (
        <div className="flex h-screen">
          <aside className="flex w-[240px] flex-col justify-between bg-gradient-to-b from-primary-50/50 to-violet-50/50 p-6">
            <section>
              <div className="mb-4 px-3 py-2 text-base font-bold">Scholarship</div>
              <Menu label="Dashboard" href="/dashboard" icon={<Home size={18} />} />
              <Menu label="Beasiswa" href="/dashboard/scholarship" icon={<Box size={18} />} />
            </section>
            <div>
              <Button variant="outline">Logout</Button>
            </div>
          </aside>
          {props.isCentered ? (
            <main className="w-[calc(100vw-240px)] p-6 overflow-y-auto">
              <div className="m-auto max-w-2xl">
                <Outlet/>
              </div>
            </main>
          ) : (
            <main className="w-[calc(100vw-240px)] overflow-y-scroll px-6">
              <div className="m-auto max-w-6xl">
                <Outlet/>
              </div>
            </main>
          )}
        </div>
      );
    };
