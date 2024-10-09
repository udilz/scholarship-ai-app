import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { countries, jenjangBeasiswa, pendanaanBeasiswa, majorIndonesia } from '../../../data/scholarshipData';
import { InputDate } from './inputDate';
import { addBeasiswa } from '../services/dashboard.api';
import { useState } from 'react';
import React from 'react';


export const FormAddBeasiswa = () => {
  const [error, setError] = useState<string>('');
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    country: '',
    city: '',
    email: '',
    url_web: '',
    degrees: '',
    major: '',
    funding_type: '',
    open_date: '',
    close_date: '',
  });

  async function handleAddScholarship(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    console.log(formData)
    const data = await addBeasiswa(formData);
    
    if (!data) {
      setLoading(false);
      return setError('Something went wrong');
    }

    setSuccess(true);
    setLoading(false);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
      <main>
        <section className="space-y-4">
          <h3>Tambah Beasiswa</h3>
          <section>
            <form onSubmit={handleAddScholarship} action="" className="space-y-3">
              <Input placeholder="Nama Beasiswa" onChange={handleChange} name="name" className="placeholder:text-black" />
              <Input placeholder="Link beasiswa" onChange={handleChange} name="url_web" className="placeholder:text-black" />
              <Input placeholder="City" onChange={handleChange} name="city" className="placeholder:text-black" />
              <Input placeholder="email" onChange={handleChange} name="email" className="placeholder:text-black"/>
              <Select 
                caption="Negara" 
                options={countries} 
                name="country" 
                onValueChange={(value) => setFormData((prev) => ({ ...prev, country: value }))} 
                value={formData.country} 
              />
              <Select 
                caption="Jenis Pendanaan" 
                options={pendanaanBeasiswa} 
                name="funding_type" 
                onValueChange={(value) => setFormData((prev) => ({ ...prev, funding_type: value }))} 
                value={formData.funding_type} 
              />
              <Select 
                caption="Jenjang Beasiswa" 
                options={jenjangBeasiswa} 
                className="w-3/5" 
                name="degrees" 
                onValueChange={(value) => setFormData((prev) => ({ ...prev, degrees: value }))} 
                value={formData.degrees} 
              />
              <Select 
                caption="Jurusan" 
                options={majorIndonesia} 
                className="w-3/5" 
                name="major" 
                onValueChange={(value) => setFormData((prev) => ({ ...prev, major: value }))} 
                value={formData.major} 
              />
              <InputDate label="Open Date" onChange={handleChange} name="open_date" />
              <InputDate label="Close Date" onChange={handleChange} name="close_date" />
              <Textarea placeholder="Diskripsi beasiswa"onChange={handleChange} name="description" className="placeholder:text-black" rows={6} />
              <Button disabled={isLoading} isFullwidth>
                Add
              </Button>
              {error && <div>{error}</div>}
              {isSuccess && <div className="text-center text-xs text-emerald-500">data berhasil ditambah kan.</div>}
            </form>
          </section>
        </section>
      </main>
  );
};