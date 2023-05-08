import { useEffect, useState } from 'react';
import { useFlights } from '../hooks/useFlights';
import Header from '../components/Header';
import FlightsTable from '../components/FlightsTable';
import Spinner from '../components/Spinner';

export interface Flight {
  airport: string;
  time: number;
  arriving?: number;
  departing?: number;
}

const begin = Math.floor(Date.now() / 1000) - 7200;
const end = Math.floor(Date.now() / 1000);

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [flightData, setflightData] = useState<Flight[] | null>(null);
  const { getAllFlights } = useFlights();
  useEffect(() => {
    const getFlights = async () => {
      setIsLoading(true);
      await getAllFlights(begin, end)
        .then(async (res) => {
          const data = await res.json();
          // Flip flag to show that loading has finished.
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
          setflightData(Object.values(mergedArr));
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });
    };
    getFlights();
  }, []);

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
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                {isLoading ? (
                  <Spinner />
                ) : (
                  <FlightsTable
                    data={flightData ?? []}
                    page={page}
                    handlePageChange={handlePageChange}
                  />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
