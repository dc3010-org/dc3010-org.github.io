import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../UserAuthContext";
import './Navbar.css';

function NavBar() {
    let logOut: any = {};
    let user: any = {};
    logOut = useUserAuth().logOut;
    user = useUserAuth().user;

    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logOut();
            navigate("/");
        } catch (error) {
            console.log(error as string);
        }
    };

    return (
        <nav className="navbar navbar-dark bg-dark navbar-style">
            <div className="container-fluid">
                <a className="navbar-brand" href="/dashboard">CapTrainimi</a>
            </div>
            <div className="p-4 box mt-3 text-center user-data-text">
                Welcome <br />
                {user && user.email}
            </div>
            <div className="d-grid gap-2">

                <button type="button" className="btn btn-outline-secondary btn-lg" aria-label='logout-button' onClick={handleLogout}>
                    Log out
                </button>

            </div>
            <button className="btn btn-primary d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" aria-controls="offcanvas">Toggle offcanvas</button>
        </nav>
    );
}

export default NavBar;