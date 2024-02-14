import { Navigate } from "react-router-dom";
import { useUserAuth } from "./UserAuthContext";

function ProtectedRoute({ children }: { children: any }) {
    let user: any = {};
    user = useUserAuth().user;

    console.log("Check user in Private: ", user);
    if (!user) {
        return <Navigate to="/" />;
    }
    return children;
}

export default ProtectedRoute;