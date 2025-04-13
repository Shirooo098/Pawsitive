import { useAuth } from "../hooks/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ element, requiredType }){
    const location = useLocation();
    const { user, isLoggedIn, loading } = useAuth();

    if(loading){
        return <div>Loading...</div>
    }

    if(!isLoggedIn || (requiredType && user?.type !== requiredType)){
        console.log(`You don't have ${requiredType} permission`)
        return <Navigate to="/" state={{ from: location}} replace/>
    }

    return element;
}

export default ProtectedRoute;