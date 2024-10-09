

interface OnboardingArgs {
    educational_background: string;
    major: string;
    funding_need: string;
    preference: string;
  }
  export async function updateUser(id: string,{educational_background, major, funding_need, preference }: OnboardingArgs) {
    const res = await fetch(`http://localhost:8000/api/v1/users/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({  educational_background, major, funding_need, preference }),
    });
   

    if (!res.ok) {
        throw new Error(`Server Error: ${res.status}`);
    }

    const data = await res.json();
    return data;
  }