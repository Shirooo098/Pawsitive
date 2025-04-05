import { createContext, useContext, useState, useEffect } from "react";
import { checkAuth } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkUserAuth = async () => {
            const authenticated = await checkAuth();
            if(authenticated){
                setUser(authenticated.user);
                setIsLoggedIn(authenticated);
            }else{
                setIsLoggedIn(false);
                setUser(null);
            }
        };

        checkUserAuth();
    }, []);

    return(
        <AuthContext.Provider value ={{ isLoggedIn, user, setIsLoggedIn, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}


export default AuthProvider;
