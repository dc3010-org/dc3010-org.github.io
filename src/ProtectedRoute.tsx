import { Navigate } from "react-router-dom";
import { useUserAuth } from "./UserAuthContext";
import NavBar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { ToastContainer } from 'react-toastify';

function ProtectedRoute({ children, authRequired = false }: { children: any, authRequired?: boolean }) {
    let user: any = {};
    user = useUserAuth().user;

    if (!user === !!authRequired) {
        return <Navigate to={authRequired ? '/' : '/dashboard'} />;
    }
    if (!authRequired) {
        return children;
    }
    return (
        <div className="vh-100 d-flex flex-column">
            <NavBar />
            <div className="container-fluid flex-grow-1">
                <div className="row h-lg-100">
                    <div className="col-lg-2 col-12" style={{ marginLeft: '-12px' }}>
                        <Sidebar />
                    </div>
                    {children}

                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default ProtectedRoute;