import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { countries, jenjangBeasiswa, pendanaanBeasiswa, majorIndonesia } from '../../../data/scholarshipData';
import { Card } from './card';
import { Input } from '@/components/ui/input';
import { useSearch } from '../hooks/useSearch';
import { IDataScholarship } from '../types/filter';
  
export const PropmtForm = () => {

  // const getUser = JSON.parse(localStorage.getItem('user') as string);
  const {data, handleSearchScholarship, isPending, isError, formData, setFormData} = useSearch();

  
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex h-3/4 w-3/4 rounded-md border shadow-md">
        <section className="flex w-5/12 flex-col justify-between border-r-2 p-5">
          <div className="space-y-4">
            {/* If you want to keep it read-only, you can use a simple display */}
            <Input value={formData.email} readOnly name='email' className='hidden' /> 
            <Select caption="Negara" options={countries} name="country" onValueChange={(value) => setFormData((prev) => ({ ...prev, country: value }))} value={formData.country} required />
            <Select caption="Jenis Pendanaan" options={pendanaanBeasiswa} name="funding_type" onValueChange={(value) => setFormData((prev) => ({ ...prev, funding_type: value }))} value={formData.funding_type} required />
            <Select caption="Jenjang Beasiswa" options={jenjangBeasiswa} className="w-3/5" name="degrees" onValueChange={(value) => setFormData((prev) => ({ ...prev, degrees: value }))} value={formData.degrees} required />
            <Select caption="Jurusan" options={majorIndonesia} className="w-3/5" name="major" onValueChange={(value) => setFormData((prev) => ({ ...prev, major: value }))} value={formData.major} required />
            <Button disabled={isPending} className="flex w-full justify-center" onClick={() => handleSearchScholarship()}>
              Search
            </Button>
          </div>
          {isError && <div className="text-red-500">An error occurred while fetching data.</div>}
        </section>
        <section className="flex-1 space-y-3 overflow-hidden overflow-y-auto p-5">
          {isPending ? 'Searching...' : ''}
          {data?.map((data: IDataScholarship) => {
            return <Card key={data._id} title={data.name} description={data.description} link={data.url_web} openDate={new Date(data.open_date).toLocaleDateString('id-ID')} closeDate={new Date(data.close_date).toLocaleDateString('id-ID')} city={data.city} country={data.country}></Card>;
          })}
        </section>
      </div>
    </div>
  );
};
