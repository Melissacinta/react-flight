export const useFlights = () => {
  const apiUrl = 'https://opensky-network.org/api/flights/all';

  function getAllFlights(begin: number, end: number) {
    return fetch(`${apiUrl}?begin=${begin}&end=${end}`);
  }

  return { getAllFlights };
};
