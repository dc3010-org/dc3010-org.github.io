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
import { ToastContainer } from 'react-toastify';
import NavBar from './components/Navbar';
import Sidebar from './components/Sidebar';


function App() {

    const routes = [
        { path: '/', element: <Home /> },
        { path: '/signup', element: <Signup /> },
        { path: '/login', element: <Login /> },
        { path: '/dashboard', element: <Dashboard />, authRequired: true, },
        { path: '/all-training', element: <AllTraining />, authRequired: true },
        { path: '/create-training', element: <CreateTraining />, authRequired: true },
        { path: '/view-training', element: <ViewTraining />, authRequired: true },
    ]


    const x = [1, 2, 3].map(e => e + 1); // [ 2, 3, 4]

    const renderedRoutes = routes.map(route => <Route path={route.path} element={<ProtectedRoute authRequired={route.authRequired}>{route.element}</ProtectedRoute>} />);

    return (
        <UserAuthContextProvider>
            <FirebaseProvider>
                <Routes>
                    {renderedRoutes}
                </Routes>
            </FirebaseProvider>
        </UserAuthContextProvider>
    )
}

export default App;