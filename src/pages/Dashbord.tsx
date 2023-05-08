import { useEffect, useState } from 'react';
import { useFlights } from '../hooks/useFlights';
import Header from '../components/Header';
import FlightsTable from '../components/FlightsTable';
import Spinner from '../components/Spinner';
import { notify } from '../components/Alert';

export interface Flight {
  airport: string;
  time: number;
  arriving?: number;
  departing?: number;
}

// const begin = Math.floor(Date.now() / 1000) - 7200;
// const end = Math.floor(Date.now() / 1000);
const maxDate = new Date().toISOString().split('Z')[0];
export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [page, setPage] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [begin, setBegin] = useState(Math.floor(Date.now() / 1000) - 7200);
  const [end, setEnd] = useState(Math.floor(Date.now() / 1000));
  const [flightData, setflightData] = useState<Flight[] | null>(null);
  const { getAllFlights } = useFlights();

  useEffect(() => {
    if (!flightData || reload) {
      getFlights();
    }
  }, [reload, flightData]);

  const getFlights = async () => {
    setIsLoading(true);
    await getAllFlights(begin, end)
      .then(async (res) => {
        const data = await res.json();
        console.log({ res: data, begin, end });
        // Flip flag to show that loading has finished.
        setIsLoading(false);
        // Gets all departing flight
        const depAirports = data.reduce((acc: Flight[], flight: any) => {
          if (flight.estDepartureAirport) {
            const index = acc.findIndex(
              (a) => a.airport === flight.estDepartureAirport
            );
            if (index === -1) {
              acc.push({
                airport: flight.estDepartureAirport,
                time: flight.lastSeen,
                departing: 1,
              });
            } else {
              (acc[index].departing as number) += 1;
            }
          }
          return acc;
        }, []);
        // Gets all arriving flight
        const arrAirports = data.reduce((acc: Flight[], flight: any) => {
          if (flight.estArrivalAirport) {
            const index = acc.findIndex(
              (a) => a.airport === flight.estArrivalAirport
            );
            if (index === -1) {
              acc.push({
                airport: flight.estArrivalAirport,
                time: flight.lastSeen,
                arriving: 1,
              });
            } else {
              (acc[index].arriving as number) += 1;
            }
          }
          return acc;
        }, []);
        // Merge them
        const mergedArr = [...arrAirports, ...depAirports].reduce(
          (acc, airport) => {
            const {
              airport: code,
              time,
              arriving = 0,
              departing = 0,
            } = airport;
            const entry = acc[code] || {
              airport: code,
              time,
              arriving: 0,
              departing: 0,
            };
            return {
              ...acc,
              [code]: {
                ...entry,
                arriving: entry.arriving + arriving,
                departing: entry.departing + departing,
              },
            };
          },
          {}
        );
        setPage(0);
        setflightData(Object.values(mergedArr));
        console.log({ res2: Object.values(mergedArr) });

        notify('Airport records pulled successfully', { type: 'success' });
      })
      .catch((err) => {
        console.log(err);
        notify(
          'No Airport record found for your request please choose try a different start time',
          { type: 'error' }
        );
      })
      .finally(() => {
        setIsLoading(false);
        setReload(false);
      });
  };

  const setFlightStart = () => {
    if (startDate) {
      const new_start = Math.floor(new Date(startDate).getTime() / 1000);
      setBegin(new_start);
      setEnd(new_start + 7200);
      setReload(true);
    }
  };
  const handlePageChange = (str: string) => {
    if (str === 'prev') {
      setPage(page - 1);
    } else {
      setPage(page + 1);
    }
  };
  return (
    <>
      <div className="min-h-full">
        <Header begin={begin} end={end} />
        <main className="px-4 sm:px-6 lg:px-8 -mt-32">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                {isLoading ? (
                  <p className="w-full  bg-white flex justify-center py-4">
                    <Spinner extraClasses="h-6 w-6" color="text-gray-500" />
                  </p>
                ) : (
                  <>
                    <div className="py-4 flex flex-col md:flex-row gap-2 items-center">
                      <span className="text-white">
                        Chose a preferred start time:
                      </span>

                      <input
                        name="startTime"
                        type="datetime-local"
                        max={maxDate}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="block rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <button
                        type="submit"
                        className="bg-indigo-700 text-white rounded-md py-2 px-3 text-sm font-medium hover:bg-gray-300 hover:text-gray-900"
                        role="menuitem"
                        tabIndex={-1}
                        onClick={setFlightStart}
                      >
                        Search
                      </button>
                    </div>
                    <FlightsTable
                      data={flightData ?? []}
                      page={page}
                      length={flightData?.length || 0}
                      handlePageChange={handlePageChange}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
