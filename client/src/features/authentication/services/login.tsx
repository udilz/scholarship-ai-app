import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode"
import { jwtPayload } from "../types/entity";

interface LoginUserArgs {
  email: string;
  password: string;
}

export async function loginUser({ email, password }: LoginUserArgs) {
  try {
    const res = await fetch('http://localhost:8000/api/v1/users/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    console.log(res);
    if (res.status === 401) {
      throw new Error('Invalid email or password');
    }

    const data = await res.json();
    console.log(data.token);
    
    Cookies.set('token', data.token.accessToken)
    const token = Cookies.get('token');
    if (token) {
      const decodedToken = jwtDecode<jwtPayload>(token);
      localStorage.setItem('user', JSON.stringify(decodedToken));
    }

    return data;
  } catch (err) {
    console.log(err);
    throw new Error('Something went wrong...');
  }
}