import { useState, createContext, useEffect } from 'react';
import axios from 'axios';

export const authContext = createContext();


const GlobalContext = ({ children }) => {
    
    const [signUpUserData, setSignUpUserData] = useState({
        fullName: "",
        email: "",
        password: "",
        role: "customer",
    });
    const [loginUserData, setLoginUserData] = useState({
        email: "",
        password: "",
    });
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const fetchUserRegistration = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", {
                fullName: signUpUserData.fullName,
                email: signUpUserData.email,
                password: signUpUserData.password,
                role: signUpUserData.role
            });
            const result = await res.data
            if (result.success) {
                setSignUpUserData({
                    fullName: "",
                    email: "",
                    password: "",
                    role: "customer",
                });
                localStorage.setItem("accessToken", result.tokens.accessToken);
                localStorage.setItem("refreshToken", result.tokens.refreshToken);
                localStorage.setItem("userRole", result.user.role);
                setIsUserLoggedIn(true);
                return result;
            } else {
                throw new Error("Registration failed");
            }

        } catch (error) {
            console.error("Error registering user:", error.message);
            if (error.status === 409) {
                return { success: false, message: "User already exists" };
            }
            return { success: false, message: "Registration failed" };
        }

    }

    const fetchUserLogin = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", { email: loginUserData.email, password: loginUserData.password });
            const result = await res.data;
            if (result.success) {
                setLoginUserData({ email: "", password: "" });
                localStorage.setItem("accessToken", result.tokens.accessToken);
                localStorage.setItem("refreshToken", result.tokens.refreshToken);
                localStorage.setItem("userRole", result.user.role);
                setIsUserLoggedIn(true);
                return result;
            } else {
                throw new Error("Login failed");
            }

        } catch (error) {
            console.error("Error logging in user:", error.message);
            return { success: false, message: "Login failed" };
        }
    }
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            setIsUserLoggedIn(true);
        }
    }, []);

    return (
        <div>
            <authContext.Provider value={{
                signUpUserData,
                setSignUpUserData,
                fetchUserRegistration,
                loginUserData,
                setLoginUserData,
                fetchUserLogin,
                isUserLoggedIn,
                setIsUserLoggedIn
            }}>
                {children}
            </authContext.Provider>

        </div>
    )
}

export default GlobalContext