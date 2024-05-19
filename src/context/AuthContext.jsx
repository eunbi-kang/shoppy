import { createContext, useContext, useEffect, useState } from "react";
import { login, logout, onUserStateChange } from "../api/firebase";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        onUserStateChange(user => {
            console.log(user);
            localStorage.setItem('isLoggedIn', true);
            setUser(user);
            setIsLoading(false);
        })
    }, []);
    return <AuthContext.Provider value={{ user, uid: user && user.uid, isLoading, login, logout }}>
        {children}
    </AuthContext.Provider>
}

export function useAuthContext() {
    return useContext(AuthContext);
}