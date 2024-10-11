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
    <div className="flex ">
        <section className="flex w-4/12 flex-col justify-between h-screen border-r-2 border-primary-500 p-5">
          <div className="space-y-4">
            <Input value={formData.email} readOnly name='email' className='hidden' /> 
            <Select caption="Negara" options={countries} name="country" onValueChange={(value) => setFormData((prev) => ({ ...prev, country: value }))} value={formData.country} required />
            <Select caption="Jenis Pendanaan" options={pendanaanBeasiswa} name="funding_type" onValueChange={(value) => setFormData((prev) => ({ ...prev, funding_type: value }))} value={formData.funding_type} required />
            <Select caption="Jenjang Beasiswa" options={jenjangBeasiswa} className="w-3/5" name="degrees" onValueChange={(value) => setFormData((prev) => ({ ...prev, degrees: value }))} value={formData.degrees} required />
            <Select caption="Jurusan" options={majorIndonesia} className="w-3/5" name="major" onValueChange={(value) => setFormData((prev) => ({ ...prev, major: value }))} value={formData.major} required />
            <Button disabled={isPending} className="flex w-full justify-center" onClick={() => handleSearchScholarship()}>
              Search
            </Button>
          {isError && <div className="text-red-500">An error occurred while fetching data.</div>}
          </div>
        </section>
        <section className="h-screen flex-1 overflow-hidden overflow-y-auto ">
        {isPending ? <p className='p-5'>Searching...</p> : ''}
          {data && (

            <section className='flex items-center gap-4 border p-5 sticky top-0 bg-white border-b-primary-500 font-sans'>
            <div className='text-base p-2 rounded-full w-12 h-12 flex items-center justify-center border-2 border-primary-500 text-blue-500 font-bold'>{data.rekomendasi.relevancy}%</div>
            <div className='text-wrap space-y-2'>
              <p><span className='font-semibold text-primary-500'>Props</span>: {data.rekomendasi?.shortDescription}</p>
              <p><span className='font-semibold text-primary-500'>Props</span>: {data.rekomendasi?.pros}</p>
              <p><span className='font-semibold text-primary-500'>Cons</span>: {data.rekomendasi?.cons}</p>
            </div>
          </section>

          )}        
          {data && (          
            <div className='space-y-5 p-5'>
              <div className='space-y-3'>
              {data.listBeasiswa?.map((data: IDataScholarship) => {
                return <Card key={data._id} title={data.name} description={data.description} link={data.url_web} openDate={new Date(data.open_date).toLocaleDateString('id-ID')} closeDate={new Date(data.close_date).toLocaleDateString('id-ID')} city={data.city} country={data.country}></Card>;
              })}
              </div>
            </div>
          )}
        </section>
    </div>
  );
};
