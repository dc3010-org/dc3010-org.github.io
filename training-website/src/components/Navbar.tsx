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
        <div className="d-inline-flex">
            <nav className="navbar navbar-dark bg-dark navbar-style vw-100">
                <div className="me-auto mx-3">
                    <a className="navbar-brand fs-1" href="/dashboard">CapTrainimi</a>
                </div>
                <div className="p-4 text-center user-data-text">
                    <p>Logged in as: <br />
                        {user.email}
                    </p>
                </div>
                <div className="m-3">
                    <button type="button" className="btn btn-outline-light btn-lg" aria-label='logout-button' onClick={handleLogout}>
                        Log out
                    </button>
                </div>

                <button className="btn btn-primary d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" aria-controls="offcanvas">Toggle offcanvas</button>
            </nav>
        </div>
    );
}

export default NavBar;