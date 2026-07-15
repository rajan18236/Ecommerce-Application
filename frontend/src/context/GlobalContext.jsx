import { useState, createContext, useEffect } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51TsfI742willoDNog4TVCUdNfqTXXT64jxRJkMJY7uXsPZuO3RrOPnLBkNeJFt8IeY1TVGE71dp7ID11Z0jve9vd00IPbgOch7');


export const authContext = createContext();
export const productContext = createContext();
export const orderContext = createContext();


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
    const [cartItems, setCartItems] = useState([]);
    const [orders, setOrders] = useState([]);


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
                }
                )
                authCheck()
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
                authCheck()
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
            setOrders([])
        } catch (error) {
            console.error("Error logging out user:", error.message);
        }
    };

    const addToCart = async (productId) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/cart/addToCart`, { product: productId }, { withCredentials: true })
            const result = await res.data;
            console.log(result);
            return result
        } catch (error) {
            console.error("Error on addToCart:", error.message);
            return ({ success: false, message: 'Fail to add' })
        }

    }

    const removeFromCart = async (cartItemId) => {
        try {
            const res = await axios.delete('http://localhost:5000/api/cart/removeFromCart', {
                data: { cartItemId },
                withCredentials: true,
            })
            const result = await res.data;
            console.log(result);
            fetchCartItems()
            return result
        } catch (error) {
            console.error("Error on removeToCart:", error.message);
            return ({ success: false, message: 'Fail to remove' })
        }
    }

    const updateCartItem = async (qty) => {
        const res = await axios.patch(`http://localhost:5000/api/cart/removeFromCart`, {})
    }

    const fetchCartItems = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/cart/getAllCartItems`, { withCredentials: true })
            const result = await res.data;
            console.log(result);

            if (result.success) {
                setCartItems(result.items)
            }

        } catch (error) {
            console.error("error on fetchCartItmes:", error.message);

        }
    }

    const authCheck = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/auth/me`, { withCredentials: true })
            const result = res.data
            if (result.success) {
                setIsUserLoggedIn(true);
                setUserInfo(result.user);
            }
        } catch (error) {
            console.error("Error on auth check:", error.message);
        }
    }

   
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
                fetchProducts()
                return result
            }
            else {
                throw new Error("Add product failed")
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
            console.log(result);

            return result
        } catch (error) {
            console.error('error on fetchProduct:', error.message)
        }

    }
    const fetchOrders = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/orders/my-orders",
                {
                    withCredentials: true,
                }
            );

            setOrders(res.data.orderItems);

        } catch (error) {
            console.log(error);
        }
    };
    const getProductsByCategory = async (category) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/product/category/${category}`)
            const result = await res.data;
            setCaterogyItems(result.products)
            return result
        } catch (error) {
            console.error('Error on getProductByCategory:', error.message);
        }
    };

    const stripePayment = async () => {
        try {
            const res = await axios.post(
                "http://localhost:5000/api/payments/create-checkout-session",
                {
                    products: cartItems,
                },
                {
                    withCredentials: true,
                }
            );
            window.location.href = res.data.url;
        } catch (error) {
            console.error(error);
        }
    };

    const clearCart = async () => {
        setCartItems([])
        const res = await axios.get(`http://localhost:5000/api/auth/clearCartItems`, {
            withCredentials: true,
        })
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
                authCheck,

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
                    addToCart,
                    fetchCartItems,
                    cartItems,
                    setCartItems,
                    removeFromCart,
                    stripePayment,
                    clearCart,
                    orders,
                    setOrders,
                   fetchOrders,
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