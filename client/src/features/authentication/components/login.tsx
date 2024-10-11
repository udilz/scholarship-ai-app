import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import { loginUser } from '../services/login';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { jwtPayload } from '../types/entity';
import { loginSchema, TLogin } from '../validation/auth.validation';
import { fromError, ZodIssue } from 'zod-validation-error';

function loginSchemaValidation({ email, password }: TLogin) {
  try {
    loginSchema.parse({ email, password });
  } catch (error) {
    const validationErr = fromError(error);
    return validationErr.details;
  }
}

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<ZodIssue[]>([]);

  const { mutate: handleSubmitLogin, isPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: () => loginUser({ email, password }),
    onSuccess: () => {
      const token = Cookies.get('token');
      if (token) {
        const decodedToken = jwtDecode<jwtPayload>(token);
        if (decodedToken.role === 'admin') {
          navigate('/dashboard');
        } else if (decodedToken.role === 'user') {
          navigate('/prompt');
        }
      }
    },
  });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const validationErrors = loginSchemaValidation({ email, password });
    if (validationErrors) {
      setErrors(validationErrors);
      return; 
    }
    setErrors([]);
    handleSubmitLogin();
  }

  return (
    <main className="h-full w-full font-poppins">
      <Helmet>
        <title>Login</title>
      </Helmet>

      <div className="absolute flex h-full w-2/4 justify-start">
        <div className="relative w-full">
          <img className="absolute left-0 top-0 h-full w-full object-cover" src="/images/college.jpg" alt="College Image" />
        </div>
      </div>

      <div className="flex h-full justify-end">
        <div className="flex h-full w-2/4 items-center justify-center">
          <div className="w-[300px] space-y-4">
            <section>
              <h3 className="text-xl font-bold">Log In</h3>
              <p className="text-sm">Welcome back, please log in to continue</p>
            </section>
            <div className="space-y-2">
              <form onSubmit={onSubmit} className="space-y-2">
                <Input name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <Input name="password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <Button type='submit' disabled={isPending} className="flex w-full justify-center">
                  Log In
                </Button>
              </form>
              <form action="http://localhost:8000/api/v1/users/continue-with-google" method="POST">
                <Button variant="outline" className="flex w-full justify-center">
                  <div className="flex items-center gap-2">
                    <img src="/images/google.png" alt="" width={15} height={15} />
                    Continue with Google
                  </div>
                </Button>
              </form>
            </div>
            <div className="space-y-2 text-sm">
              Don't have an account?{' '}
              <Link className="font-semibold text-blue-600" to="/register">
                Register
              </Link>
              {errors.map((error) => {
                return (
                  <div className="text-center text-xs text-rose-600" key={error.code}>
                    {error.message}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
