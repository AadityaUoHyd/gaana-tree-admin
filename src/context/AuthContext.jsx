import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import apiClient from "../services/apiService.js";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("adminToken"));
    const [loading, setLoading] = useState(true);


    const login = async (email, password) => {
        try {
            const response = await apiClient.post(`/api/auth/login`, {email, password, portal: "admin"});
            if(response.status === 200){
                setToken(response.data.token);
                setUser({email: response.data.email, role: response.data.role});
                localStorage.setItem('adminToken', response.data.token);
                localStorage.setItem('adminUser', JSON.stringify({email: response.data.email, role: response.data.role}));
                return {success: true};
            } else {
                return {success: false, message: response.data.message || "Login failed"};
            }
        }catch(error) {
            return {success: false, message: error.response?.data || "Login failed"};
        }
    }

    const isAuthenticated = () => {
        return !!token && !!user;
    }

    const isAdmin = () => {
        return user && user.role === "ADMIN";
    }

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
    }

    useEffect(() => {
        const storedToken = localStorage.getItem("adminToken");
        const storedUser = localStorage.getItem("adminUser");

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const contextValue = {
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated,
        isAdmin
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}