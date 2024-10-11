import { Button } from '@/components/ui/button';
import { Link, NavLink } from 'react-router-dom';
import { User } from 'lucide-react';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

interface LoggedInUser {
  id: string;
  name?: string;
  email: string;
  password?: string;
}

export const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<LoggedInUser | null>(null);
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
        Cookies.remove('token')
        navigate('/login')
        return data;
      } catch (error) {
        console.log(error);
        throw new Error('Internal server error');
      }
    },
  });

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
    <header className="sticky top-0 flex w-full items-center justify-between border-b-2 border-primary-500 bg-white px-4 py-2">
      <div className="font-medium tracking-tight">Scholarship AI.</div>
      <div className="flex items-center gap-6 font-medium">
        <div className="space-x-4">
          <AtciveNavLink link="prompt" label="Home" />
          <AtciveNavLink link="bookmark" label="Bookmark" />
        </div>
      </div>
      <div className="flex gap-2">
        <section className="flex items-center gap-2">
          <span>{user && user.name}</span>
          <Link to={'/profile'}>
            <Button className="rounded-full" iconOnly>
              <User></User>
            </Button>
          </Link>
        </section>
        <Button onClick={()=> handleLogout()}>Logout</Button>
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
