import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScholarshipTable } from './scholarship.table';
import { useDashboard } from '../hooks/useDashboard';
import { useMutateScholarship } from '../hooks/useMutateScholarship';
import { Helmet } from 'react-helmet';

export const DashboardBeasiswa = () => {
  const { data, isLoading, isError } = useDashboard();
  const { deleteScholarship } = useMutateScholarship();
  
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching data</p>;
  }

  return (
    <main className="w-full font-poppins">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <section className="sticky top-0 z-[2] flex items-center justify-between bg-white py-4">
        <div>
          <h3 className="text-xl">Data beasiswa</h3>
        </div>
        <Link to="/dashboard/scholarship/create">
          <Button>Tambah Beasiswa</Button>
        </Link>
      </section>
      <section className="mt-4">
        { data && (
          <ScholarshipTable scholarships={data} onDelete={deleteScholarship}></ScholarshipTable>
        )}
      </section>
    </main>
  );
};