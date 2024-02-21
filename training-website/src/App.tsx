import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import { UserAuthContextProvider } from './UserAuthContext';
import ProtectedRoute from './ProtectedRoute';
import AllTraining from './AllTraining';
import CreateTraining from './CreateTraining';
import ViewTraining from './ViewTraining';
import './App.css';
import { FirebaseProvider } from './FirebaseProvider';

const Main = () => {

    return (
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>}></Route>
            <Route path='/all-training' element={<ProtectedRoute><AllTraining /></ProtectedRoute>}></Route>
            <Route path='/create-training' element={<ProtectedRoute><CreateTraining /></ProtectedRoute>}></Route>
            <Route path='/view-training' element={<ProtectedRoute><ViewTraining /></ProtectedRoute>}></Route>
        </Routes>
    );
}

function App() {
    return (
        <UserAuthContextProvider>
            <FirebaseProvider>

                <Main />
            </FirebaseProvider>

        </UserAuthContextProvider>

    )
}

export default App;