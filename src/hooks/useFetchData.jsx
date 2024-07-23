import { useState, useEffect } from 'react';

export function useFetchData(url) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      try {
        const response = await fetch(url);
        if (response.ok) {
          if (!ignore) {
            const fetchedData = await response.json();
            setData(Array.isArray(fetchedData) ? fetchedData : [fetchedData]);
          }
        } else {
          setError('Error');
        }
      } catch (e) {
        setError('Error');
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }
    fetchData();
    return () => {
      ignore = true;
    };
  }, []);

  return {
    data,
    isLoading,
    error,
  };
}