import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthForm from './auth/AuthForm';
import Film from './films/Film';
import Settings from "./settings/Settings";
import {UserProvider} from "./UserContext";

function AppRoutes() {
    return (
        <UserProvider>
        <Router>
            <Routes>
                <Route path="/" element={<AuthForm/>} />
                <Route path="/film" element={<Film/>} />
                <Route path="/settings/:id" element={<Settings/>} />
            </Routes>
        </Router>
        </UserProvider>
    );
}

export default AppRoutes;
