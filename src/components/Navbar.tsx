import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../UserAuthContext";
import './Navbar.css';
import { faRightFromBracket, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
            <nav className="navbar navbar-dark bg-dark navbar-style vw-100" style={{ gap: '5px' }}>
                <div className="me-auto mx-md-3 mx-1">
                    <Link className="navbar-brand fs-1" to="/dashboard">CapTrainimi</Link>
                </div>
                <div className="p-md-3 p-1 text-center user-data-text" style={{ marginLeft: 'auto' }}>
                    <p>Logged in as: <br />
                        {user.email}
                    </p>
                </div>
                <div className="">
                    <button type="button" className="btn btn-outline-light btn-lg" aria-label='logout-button' onClick={handleLogout}>
                        <FontAwesomeIcon icon={faRightFromBracket} /> <span className='d-none d-sm-inline'>Log out</span>
                    </button>
                </div>

                <button className="btn d-lg-none btn-outline-secondary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" aria-controls="offcanvas"><FontAwesomeIcon icon={faBars} /></button>
            </nav>
        </div>
    );
}

export default NavBar;