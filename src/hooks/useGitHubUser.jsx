import { useState, useEffect } from "react";

const useGitHubUser = (username) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGitHubUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}`
        );
        if (!response.ok) {
          throw new Error("No se pudo obtener el usuario");
        }
        const userData = await response.json();
        setUser(userData);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchGitHubUser();
    }
  }, [username]);

  return { user, loading, error };
};

export default useGitHubUser;
