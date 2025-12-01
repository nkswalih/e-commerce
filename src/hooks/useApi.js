import { useState, useEffect } from "react";
import { api } from "../api/api";

export default function useApi(endpoint, id = null) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchCall = id
      ? api.getById(endpoint, id)
      : api.getAll(endpoint);

    fetchCall
      .then((res) => {
        if (mounted) {
          setData(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err);
          setLoading(false);
        }
      });

    return () => (mounted = false);
  }, [endpoint, id]);

  return { data, loading, error };
}
