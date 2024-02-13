import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';

const Main = () => {
    const [token, setToken] = useState();

    return (
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/login' element={<Login />}></Route>
        </Routes>
    );
}

function App() {
    return (
        <div>
            <Main />
        </div>
    )
}

export default App;