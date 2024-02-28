import { Link } from "react-router-dom";
import { useFirebase } from "../FirebaseProvider";

function Sidebar() {
    let { userData } = useFirebase();

    let createRoleElement;

    if (parseInt(userData?.role!) === 2) {
        createRoleElement = <li className="nav-item">
            <Link className="nav-link d-flex align-items-center gap-2" to="/create-training">
                Create Training Pack
            </Link>
        </li>
    }


    return <>
        <div className="sidebar border border-right p-0 bg-body-tertiary h-100">
            <div className="offcanvas-lg offcanvas-start bg-body-tertiary" tabIndex={-1} id="offcanvas" aria-labelledby="sidebarMenuLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="sidebarMenuLabel">Company name</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                    <p className="fs-3 fw-light ps-3">Navigation</p>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link className="nav-link d-flex align-items-center gap-2 active" aria-current="page" to="/dashboard">
                                Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link d-flex align-items-center gap-2 active" aria-current="page" to="/all-training">
                                View Training Packs
                            </Link>
                        </li>
                        {createRoleElement}
                    </ul>
                </div>
            </div>
        </div>
    </>
}

export default Sidebar;