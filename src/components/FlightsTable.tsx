import Pagination from './Pagination';
import { Flight } from '../pages/Dashbord';

type Props = {
  data: Flight[];
  page: number;
  length: number;
  handlePageChange: (x: string) => void;
};
const FlightsTable = ({ data, page, length, handlePageChange }: Props) => {
  const start = page * 10 + 1;
  const end =
    page + 1 === Math.ceil(length / 10)
      ? page * 10 + (length % 10)
      : page * 10 + 10;
  return (
    <div className="inline-block min-w-full py-2 align-middle">
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Airport
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Time
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Arriving
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Departing
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white font-serif">
            {data
              ?.sort((x, y) => x.time - y.time)
              ?.slice(start - 1, end)
              ?.map((flight: Flight, id: number) => (
                <tr
                  key={id}
                  className={id % 2 === 0 ? undefined : 'bg-gray-50'}
                >
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {flight.airport}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {new Date(flight.time * 1000).toLocaleTimeString()}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {flight.arriving}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {flight.departing}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Pagination
        length={data?.length | 0}
        page={page}
        handlePageChange={handlePageChange}
        start={start}
        end={end}
      />
    </div>
  );
};

export default FlightsTable;
