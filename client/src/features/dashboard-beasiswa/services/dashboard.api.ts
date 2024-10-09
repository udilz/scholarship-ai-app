interface IScholarship {
    name: string,
    description:string ,
    country: string,
    city: string ,
    email: string,
    url_web: string,
    degrees: string,
    major: string,
    funding_type:string ,
    open_date:string ,
    close_date: string
}

export async function addBeasiswa({name, description, country, city, email, url_web, degrees, major, funding_type, open_date, close_date} : IScholarship) {
    try {
        const res = await fetch('http://localhost:6000/api/v1/scholarships', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ name, description, country, city, email, url_web, degrees, major, funding_type, open_date, close_date })
        });

        if (!res.ok) {
            throw new Error(`Server Error: ${res.status}`);
        }

        const response = await res.json();
        console.log(response.data);
        return response;
    } catch (error) {
        console.error('Error adding scholarship:', error); 
        throw error;  
    }
}
