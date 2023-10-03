import React, { createContext, useContext, useState } from "react";

const UserContext = createContext({});

export function UserProvider({ children }) {
    const [user, setUser] = useState([]);
    const [film, setFilm] = useState([]);
    const [tag, setTag] = useState([]);

    return (
        <UserContext.Provider value={{ user, setUser, film, setFilm, tag, setTag }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
