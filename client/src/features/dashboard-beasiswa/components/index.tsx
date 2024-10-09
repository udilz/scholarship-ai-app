import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScholarshipTable } from './scholarship.table';

export const DashboardBeasiswa = () => {
  return (
      <main className='w-full'>
        <section className="flex items-center justify-between sticky top-0 z-[2] py-4 bg-white">
          <div>
            <h3 className="text-xl">Data beasiswa</h3>
          </div>
          <Link to="/dashboard/scholarship/create">
            <Button>Tambah Beasiswa</Button>
          </Link>
        </section>
        <section className="mt-4"> 
          <ScholarshipTable scholarships={[]}></ScholarshipTable>
        </section>
      </main> 
  );
};
