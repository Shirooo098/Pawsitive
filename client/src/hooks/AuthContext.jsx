import { createContext, useContext, useState, useEffect } from "react";
import { checkAuth } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkUserAuth = async () => {
            const authenticated = await checkAuth();
            setIsLoggedIn(authenticated);
        };

        checkUserAuth();
    }, []);

    return(
        <AuthContext.Provider value ={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}


export default AuthProvider;
