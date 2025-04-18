import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setLoading, setError } from "./redux/userSlice";
import useGitHubUser from "./hooks/useGitHubUser";

function UserProfile({ username }) {
  const dispatch = useDispatch();
  const { user, loading, error } = useGitHubUser(username);

  useEffect(() => {
    dispatch(setUser(user));
    dispatch(setLoading(loading));
    dispatch(setError(error));
  }, [dispatch, user, loading, error]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Username: {user.login}</p>
      <p>Seguidores: {user.followers}</p>
      <p>Repositorios públicos: {user.public_repos}</p>
      <img src={user.avatar_url} alt="Avatar" />
    </div>
  );
}

export default UserProfile;
