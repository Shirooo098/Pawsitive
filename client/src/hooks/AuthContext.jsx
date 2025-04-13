import { createContext, useContext, useState, useEffect } from "react";
import { checkAuth } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserAuth = async () => {
            const data = await checkAuth();
            if(data.authenticated){
                setUser(data.user);
                setIsLoggedIn(true);
            }else{
                setIsLoggedIn(false);
                setUser(null);
            }
            setLoading(false);
        };

        checkUserAuth();
    }, []);

    return(
        <AuthContext.Provider value ={{ isLoggedIn, user, setIsLoggedIn, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}

export default AuthProvider;