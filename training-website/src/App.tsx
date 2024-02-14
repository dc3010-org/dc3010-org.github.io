import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import { UserAuthContextProvider } from './UserAuthContext';
import ProtectedRoute from './ProtectedRoute';

const Main = () => {
    const [token, setToken] = useState();

    return (
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>}></Route>
        </Routes>
    );
}

function App() {
    return (
        <UserAuthContextProvider>
            <Main />
        </UserAuthContextProvider>

    )
}

export default App;