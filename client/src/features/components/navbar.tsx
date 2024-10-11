import { Button } from '@/components/ui/button';
import { Link, NavLink } from 'react-router-dom';
import { User } from 'lucide-react';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

interface LoggedInUser {
  id: string;
  name?: string;
  email: string;
  password?: string;
}

export const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<LoggedInUser | null>(null);
   useEffect(() => {
    const token = Cookies.get('token');
    const accessToken = Cookies.get('accessToken');
    const userCookie = Cookies.get('user');
    const parsedUserCookie = userCookie ? JSON.parse(userCookie) : null;
    const getUser = JSON.parse(localStorage.getItem('user') as string);

    if (token) {
      setIsAuthenticated(true);
      setUser(getUser);
    } else if (accessToken) {
      setIsAuthenticated(true);
      setUser(parsedUserCookie);
    } else {
      setIsAuthenticated(false);
      window.location.href = '/login';
    }
   }, []);

  if (!isAuthenticated) return null;

  return (
    <header className="fixed flex w-full items-center justify-between px-4 py-2 bg-white">
      <div className="font-medium tracking-tight">Scholarship AI.</div>
      <div className="flex items-center gap-6 font-medium">
        <div className="space-x-4">
          <AtciveNavLink link="prompt" label="Home" />
          <AtciveNavLink link="bookmark" label="Bookmark" />
        </div>
      </div>
      <div className="flex gap-2">
        <section className='flex gap-2 items-center'>
        <span>{user && user.name}</span>
        <Link to={'/profile'}>
          <Button className="rounded-full" iconOnly>
            <User></User>
          </Button>
        </Link>
       </section>
        <Button>Logout</Button>
      </div>
    </header>
  );
};

interface IActiveNavLinkProps {
  link: string;
  label: string;
}

const AtciveNavLink = ({ link, label }: IActiveNavLinkProps) => {
  return (
    <NavLink to={`/${link}`} className={({ isActive }) => (isActive ? 'font-semibold text-primary-500' : 'text-primary-900 hover:text-primary-500')}>
      {label}
    </NavLink>
  );
};
