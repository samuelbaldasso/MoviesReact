import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthForm from './auth/AuthForm';
import Film from './films/Film';
import Settings from "./settings/Settings";
import {UserProvider} from "./UserContext";
import FilmDescription from './film-item/FilmDescription';
import NewFilm from "./newFilm/NewFilm";

function AppRoutes() {
    return (
        <UserProvider>
        <Router>
            <Routes>
                <Route path="/" element={<AuthForm/>} />
                <Route path="/film" element={<Film/>} />
                <Route path="/settings/:id" element={<Settings/>} />
                <Route path="/film/:id" element={<FilmDescription/>} />
                <Route path="/film/new" element={<NewFilm/>} />
            </Routes>
        </Router>
        </UserProvider>
    );
}

export default AppRoutes;
