import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
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
        Cookies.remove('token');
        Cookies.remove('user');
        localStorage.clear();
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
    
    // google
    const userCookie = Cookies.get('user');
    const parsedUserCookie = userCookie ? JSON.parse(userCookie) : null;
    console.log("parsedUserCookie",parsedUserCookie);
    
    // manual login
    const getUser = JSON.parse(localStorage.getItem('user') as string);
    console.log("getuer", getUser)
    if (token) {
      setIsAuthenticated(true);
      setUser(getUser);
    }else if (accessToken) {
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(parsedUserCookie));
      setUser(parsedUserCookie);
    } else {
      setIsAuthenticated(false);
      navigate('/login');
    }
  }, [navigate]);

  if (!isAuthenticated) return null;

  return (
    <header className="sticky top-0 flex w-full items-center justify-between border bg-white px-4 py-2">
      <div className="font-medium tracking-tight">Scholarship AI.</div>
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

