import { useState, createContext, useEffect } from 'react';
import axios from 'axios';

export const authContext = createContext();
export const productContext = createContext();


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
    const [userInfo, setUserInfo] = useState({});
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [caterogyItems, setCaterogyItems] = useState([]);
    const userRegistration = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", {
                fullName: signUpUserData.fullName,
                email: signUpUserData.email,
                password: signUpUserData.password,
                role: signUpUserData.role
            }, { withCredentials: true });
            const result = await res.data
            if (result.success) {
                setSignUpUserData({
                    fullName: "",
                    email: "",
                    password: "",
                    role: "customer",
                })
                setUserInfo(result.user)
                setIsUserLoggedIn(true)

                console.log(result);
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

    };

    const userLogin = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", { email: loginUserData.email, password: loginUserData.password }, { withCredentials: true });
            const result = await res.data;
            if (result.success) {
                setLoginUserData({ email: "", password: "" })
                setUserInfo(result.user)
                setIsUserLoggedIn(true)
                console.log(result);
                return result;
            }
        } catch (error) {
            console.error("Error logging in user:", error.message);
            return { success: false, message: "Login failed" };
        }
    };

    const userLogout = async () => {
        try {
            await axios.post(
                "http://localhost:5000/api/auth/logout",
                {},
                {
                    withCredentials: true,
                }
            )
            setUserInfo({})
            setIsUserLoggedIn(false)
        } catch (error) {
            console.error("Error logging out user:", error.message);
        }
    };

    const addToCart = async (productId) => {
        try {
            const res = await axios.patch(`http://localhost:5000/api/cart/addToCart/${productId}`)
            const result = await res.data;
            console.log(result);
            return result
        } catch (error) {
            console.error("Error on addToCart:", error.message);
            return ({ success: false, message: 'Fail to add' })
        }

    }

    const removeFromCart = async (product) => {
        try {
            const res = await axios.delete('http://localhost:5000/api/cart/removeFromCart', {
                product
            })
            const result = await res.data;
            console.log(result);
            return result
        } catch (error) {
            console.error("Error on removeToCart:", error.message);
            return ({ success: false, message: 'Fail to remove' })
        }
    }

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/api/auth/me",
                    {
                        withCredentials: true,
                    }
                );

                if (res.data.success) {
                    setUserInfo(res.data.user)
                    setIsUserLoggedIn(true)
                } else {
                    setIsUserLoggedIn(false)
                }

            } catch (err) {
                console.error('Error on check auth:', err.message);

            }
        };
        checkAuth();
        fetchProducts();
    }, []);

    const [product, setProduct] = useState({
        productName: "",
        price: "",
        description: "",
        image: "",
        category: "",
    });

    const addProduct = async () => {
        try {
            const res = await axios.post(`http://localhost:5000/api/product/create`, {
                productName: product.productName,
                price: product.price,
                description: product.description,
                image: product.image,
                category: product.category,
            }, {
                withCredentials: true
            })
            const result = await res.data;
            if (result.success) {
                setProduct({
                    productName: "",
                    price: "",
                    description: "",
                    image: "",
                    category: "",
                })
                console.log(result);

                return result
            }
            else {
                throw error
            }
        } catch (error) {
            console.error("Error on add product:", error.message)
            return { success: false, message: "Something went wrong" }
        }
    }

    const fetchProducts = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/product/getAll`)
            const result = await res.data;
            setFeaturedProducts(result.products)
            return result
        } catch (error) {
            console.error('error on fetchProduct:', error.message)
        }

    }

    const getProductsByCategory = async (category) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/product/category/${category}`)
            const result = await res.data;
            setCaterogyItems(result.products)
            return result
        } catch (error) {
            console.error('Error on getProductByCategory:', error.message);
        }

    }
    return (
        <div>
            <authContext.Provider value={{
                signUpUserData,
                setSignUpUserData,
                userRegistration,
                loginUserData,
                setLoginUserData,
                userLogin,
                userLogout,
                userInfo,
                setUserInfo,
                isUserLoggedIn, 
                setIsUserLoggedIn,
                addToCart,
                removeFromCart,
            }}>
                <productContext.Provider value={{
                    product,
                    setProduct,
                    addProduct,
                    getProductsByCategory,
                    caterogyItems,
                    setCaterogyItems,
                    fetchProducts,
                    featuredProducts,
                    setFeaturedProducts,
                    // updateProduct,
                    // deleteProduct
                }}>
                    {children}
                </productContext.Provider>
            </authContext.Provider>

        </div>
    )
}

export default GlobalContext