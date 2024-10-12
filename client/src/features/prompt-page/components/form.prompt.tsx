import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { countries, jenjangBeasiswa, pendanaanBeasiswa, majorIndonesia } from '../../../data/scholarshipData';
import { Card } from './card';
import { Input } from '@/components/ui/input';
import { useSearch } from '../hooks/useSearch';
import { IDataScholarship } from '../types/filter';
import { Helmet } from 'react-helmet';

export const PropmtForm = () => {
  const { data, handleSearchScholarship, isPending, isError, formData, setFormData } = useSearch();

  return (
    <div className="flex font-poppins">
      <Helmet>
        <title>Prompt</title>
      </Helmet>
      <section className="flex h-screen w-4/12 flex-col justify-between p-5 shadow-xl">
        <div className="space-y-4">
          <Input value={formData.email} readOnly name="email" className="hidden" />
          <Select caption="Negara" options={countries} name="country" onValueChange={(value) => setFormData((prev) => ({ ...prev, country: value }))} value={formData.country} required />
          <Select caption="Jenis Pendanaan" options={pendanaanBeasiswa} name="funding_type" onValueChange={(value) => setFormData((prev) => ({ ...prev, funding_type: value }))} value={formData.funding_type} required />
          <Select caption="Jenjang Beasiswa" options={jenjangBeasiswa} name="degrees" onValueChange={(value) => setFormData((prev) => ({ ...prev, degrees: value }))} value={formData.degrees} required />
          <Select caption="Jurusan" options={majorIndonesia} name="major" onValueChange={(value) => setFormData((prev) => ({ ...prev, major: value }))} value={formData.major} required />
          <Button disabled={isPending} className="flex w-full justify-center" onClick={() => handleSearchScholarship()}>
            Search
          </Button>
          {isError && <div className="text-red-500">Data tidak ditemukan.</div>}
        </div>
      </section>
      <section className="h-screen min-h-0 flex-1 overflow-hidden overflow-y-auto pb-8">
        {isPending ? <p className="p-5">Searching...</p> : ''}
        {data && (
          <section className="border-black-100 sticky top-0 flex items-center gap-4 border bg-white p-5 font-sans">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary-500 p-2 text-base font-bold text-blue-500">{data.rekomendasi.relevancy}%</div>
            <div className="space-y-2 text-wrap">
              <p>
                <span className="font-semibold text-primary-500">Description</span>: {data.rekomendasi?.shortDescription}
              </p>
              <p>
                <span className="font-semibold text-primary-500">Props</span>: {data.rekomendasi?.pros}
              </p>
              <p>
                <span className="font-semibold text-primary-500">Cons</span>: {data.rekomendasi?.cons}
              </p>
            </div>
          </section>
        )}
        {data && (
          <div className="space-y-5 p-5">
            <div className="space-y-3">
              {data.listBeasiswa?.map((data: IDataScholarship) => {
                return <Card key={data._id} title={data.name} university={data.university} description={data.description} link={data.url_web} openDate={new Date(data.open_date).toLocaleDateString('id-ID')} closeDate={new Date(data.close_date).toLocaleDateString('id-ID')} city={data.city} country={data.country}></Card>;
              })}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
