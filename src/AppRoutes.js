import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthForm from './pages/login/AuthForm';
import Settings from "./pages/settings/Settings";
import {UserProvider} from "./UserContext";
import FilmDescription from './pages/film-item/FilmDescription';
import NewFilm from "./pages/newFilm/NewFilm";
import FilmPage from './pages/film_page/FilmPage';
import RegisterForm from './pages/register/RegisterForm';

function AppRoutes() {
    return (
        <UserProvider>
        <Router>
            <Routes>
                <Route path="/" element={<AuthForm/>} />
                <Route path="/register" element={<RegisterForm/>} />
                <Route path="/film" element={<FilmPage/>} />
                <Route path="/settings/:id" element={<Settings/>} />
                <Route path="/film/:id" element={<FilmDescription/>} />
                <Route path="/film/new" element={<NewFilm/>} />
            </Routes>
        </Router>
        </UserProvider>
    );
}

export default AppRoutes;
