interface RegisterArgs {
    name: string;
    email: string;
    password: string;
    educational_background: string;
    major: string;
    funding_need: string;
    preference: string;
  }
  export async function registerUser({ name, email, password, educational_background, major, funding_need, preference }: RegisterArgs) {
    const res = await fetch("http://localhost:8000/api/v1/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, educational_background, major, funding_need, preference }),
    });
  
    if (res.status === 400) {
      throw new Error("username, email, password are required!");
    }
  
    if (res.status === 409) {
      throw new Error("User already exists!");
    }
  
    const data = await res.json();
    return data;
  }