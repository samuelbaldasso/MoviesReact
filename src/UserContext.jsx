import React, { createContext, useContext, useState } from "react";

const UserContext = createContext({});

export function UserProvider({ children }) {
  const [user, setUser] = useState([]);
  const [film, setFilm] = useState([]);
  const [tag, setTag] = useState([]);
  const [filteredFilms, setFilteredFilms] = useState([]);
  const [search, setSearch] = useState("");

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        film,
        setFilm,
        tag,
        setTag,
        filteredFilms,
        setFilteredFilms,
        search,
        setSearch
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
