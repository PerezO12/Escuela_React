import { useState, useCallback } from 'react';
import { errorMapper } from '../utils/errorMapper';

const useApi = (requestFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (...params) => {
    setLoading(true);
    setError(null);
    try {
      const response = await requestFunction(...params);
      setData(response);
    } catch (err) {
      setError(errorMapper(err)?.values || 'Ocurrió un error, inténtelo nuevamente más tarde.');
    } finally {
      setLoading(false);
    }
  }, [requestFunction]);

  return { data, loading, error, fetchData };
};

export default useApi;
