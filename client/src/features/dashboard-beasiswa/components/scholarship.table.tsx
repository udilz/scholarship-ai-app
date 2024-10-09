import { IDataScholarship } from '../types/scholarship.type';
import { Link } from 'react-router-dom';

interface ScholarshipTableProps {
  scholarships: IDataScholarship[];
  onDelete: (id: string) => void;
}

export const ScholarshipTable = ({ scholarships, onDelete }: ScholarshipTableProps) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="text-left text-sm text-gray-500">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3">
              No
            </th>
            <th scope="col" className="px-6 py-3">
              Nama Beasiswa
            </th>
            <th scope="col" className="px-6 py-3">
              Universitas
            </th>
            <th scope="col" className="px-6 py-3">
              Link Beasiswa
            </th>
            <th scope="col" className="px-6 py-3">
              Negara
            </th>
            <th scope="col" className="px-6 py-3">
              City
            </th>
            <th scope="col" className="px-6 py-3">
              Tipe Pendanaan Beasiswa
            </th>
            <th scope="col" className="px-6 py-3">
              jenjang beasiswa
            </th>
            <th scope="col" className="px-6 py-3">
              Jurusan
            </th>
            <th scope="col" className="px-6 py-3">
              Open Date
            </th>
            <th scope="col" className="px-6 py-3">
              Close Date
            </th>
            <th scope="col" className="px-6 py-3">
              Deskripsi
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {scholarships.map((scholarship, index) => (
            <tr key={scholarship._id} className="border-b bg-white">
              <td className="px-6 py-4">{index + 1}</td>
              <td className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap px-6 py-4">{scholarship.name.length > 20 ? `${scholarship.name.substring(0, 25)}...` : scholarship.name}</td>
              <td className="px-6 py-4">{scholarship.university}</td>
              <td className="px-6 py-4">
                <a href={scholarship.url_web} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                  {scholarship.url_web}
                </a>
              </td>
              <td className="px-6 py-4">{scholarship.country}</td>
              <td className="px-6 py-4">{scholarship.city}</td>
              <td className="px-6 py-4">{scholarship.funding_type}</td>
              <td className="px-6 py-4">{scholarship.degrees}</td>
              <td className="px-6 py-4">{scholarship.major}</td>
              <td className="px-6 py-4">{new Date(scholarship.open_date).toLocaleDateString('id-ID')}</td>
              <td className="px-6 py-4">{new Date(scholarship.close_date).toLocaleDateString('id-ID')}</td>
              <td className="block w-96 px-6 py-4">{scholarship.description}</td>
              <td className="space-x-4 px-6 py-4">
                <a href="#" className="text-red-500" onClick={() => onDelete(scholarship._id)}>
                  delete
                </a>
                <Link to={`/dashboard/scholarship/edit/${scholarship._id}`} className="text-blue-600">
                  update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};