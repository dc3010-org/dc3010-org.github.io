import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Signup from './Signup';

const Main = () => {
    return (
        <Routes> 
          <Route path='/' element={<Home />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
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