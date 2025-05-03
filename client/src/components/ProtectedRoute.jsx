import { useAuth } from "../hooks/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ element, requiredType }){
    const { user, isLoggedIn, loading } = useAuth();

    if(loading){
        return <div>Loading...</div>
    }

    if(!isLoggedIn || (requiredType && user?.type !== requiredType)){
        alert("Please Login to access this page. Redirecting to login page...");
        return <Navigate to="/login" />;
    }

    return element;
}

export default ProtectedRoute;