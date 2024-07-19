import { createContext, useEffect, useState } from "react";
import usePersistent from "@/hooks/usePersistent";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const { clearPersistent, setPersistent, getPersistent, clearPersistentItem } = usePersistent();

    const [token, setToken] = useState(() => {
        try {
            return getPersistent('auth_token') || null;
        } catch {
            return null;
        }
    });

    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(getPersistent('user')) || null;
        } catch {
            return null;
        }
    });

    const handleLogout = () => {
        clearPersistent();
        setToken(null);
        setUser(null);
    };

    useEffect(() => {
        if (token) {
            setPersistent({ key: 'auth_token', value: token });
        } else {
            clearPersistentItem('auth_token');
        }

        if (user) {
            setPersistent({ key: 'user', value: JSON.stringify(user) });
        } else {
            clearPersistentItem('user');
        }
    }, [token, user, setPersistent, clearPersistentItem]);

    return (
        <AuthContext.Provider value={{ user, setUser, token, setToken, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
