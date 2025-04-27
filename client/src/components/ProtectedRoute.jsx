import { useAuth } from "../hooks/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ element, requiredType }){
    const { user, isLoggedIn, loading } = useAuth();

    if(!isLoggedIn || (requiredType && user?.type !== requiredType)){
        const alertShown = localStorage.getItem("alertShown"); // Check if alert has been shown
        if (!alertShown) {
            alert("You are not authorized to access this page. Please Log In.");
            localStorage.setItem("alertShown", "true");
            return <Navigate to="/login"/>
        }
        
    }

    if(loading){
        return <div>Loading...</div>
    }

    return element;
}

export default ProtectedRoute;