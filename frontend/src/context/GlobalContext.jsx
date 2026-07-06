import { useState,createContext } from 'react';
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

    const fetchUserRegistration = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", {
                fullName: signUpUserData.fullName,
                email: signUpUserData.email,
                password: signUpUserData.password,
                role: signUpUserData.role
            });
            const result = await res.data
            setSignUpUserData({
                fullName: "",
                email: "",
                password: "",
                role: "customer",
            });
            return result;
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
            setLoginUserData({ email: "", password: "" });
            return result;
        } catch (error) {
            console.error("Error logging in user:", error.message);
            return { success: false, message: "Login failed" };
        }
    }

    return (
        <div>
            <authContext.Provider value={{
                signUpUserData,
                setSignUpUserData,
                fetchUserRegistration,
                loginUserData, 
                setLoginUserData,
                fetchUserLogin
            }}>
                {children}
            </authContext.Provider>

        </div>
    )
}

export default GlobalContext