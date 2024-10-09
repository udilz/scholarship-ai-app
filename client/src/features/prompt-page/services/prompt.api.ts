interface IFilterScholarship {
    country?: string,
    major?: string,
    degrees?: string,
    funding_type?: string
    email? : string
}

export async function searchScholarship({country, major, degrees, funding_type, email} : IFilterScholarship) {
    try {
        const res = await fetch('http://localhost:8000/api/v1/scholarships/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ country, major, degrees, funding_type, email })
        });

        if (!res.ok) {
            throw new Error(`Server Error: ${res.status}`);
        }

        const response = await res.json();
        console.log(response?.[0]?.rekomendasi);
        
        return response;
    } catch (error) {
        console.error('Error Fetch scholarship:', error); 
        throw error;  
    }
}