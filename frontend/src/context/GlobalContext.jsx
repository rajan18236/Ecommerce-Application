import { useState, createContext, useEffect } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-hot-toast';

const stripePromise = loadStripe('pk_test_51TsfI742willoDNog4TVCUdNfqTXXT64jxRJkMJY7uXsPZuO3RrOPnLBkNeJFt8IeY1TVGE71dp7ID11Z0jve9vd00IPbgOch7');


export const authContext = createContext();
export const productContext = createContext();
export const adminContext = createContext();


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
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [myProducts, setMyProducts] = useState([]);
    const [caterogyItems, setCaterogyItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [productForEdit, setProductForEdit] = useState(null)


    const userRegistration = async () => {
        try {
            const res = await axios.post("https://ecommerce-application-sfmh.onrender.com/api/auth/register", {
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
                toast.success(result.message)
                return result;
            } else {
                throw new Error("Registration failed");
            }

        } catch (error) {
            console.error("Error registering user:", error.message);
            if (error.status === 409) {
                return (toast.error("User already exists"));
            }
            toast.error("Registration failed")
            return { success: false };
        }

    };

    const userLogin = async () => {
        try {
            const res = await axios.post("https://ecommerce-application-sfmh.onrender.com/api/auth/login", { email: loginUserData.email, password: loginUserData.password }, { withCredentials: true });
            const result = await res.data;
            if (result.success) {
                setLoginUserData({ email: "", password: "" })
                authCheck()
                toast.success(result.message)
                return result;
            }
        } catch (error) {
            console.error("Error logging in user:", error.message);
            toast.error("Login failed")
            return { success: false };
        }
    };

    const userLogout = async () => {
        try {
            await axios.post(
                "https://ecommerce-application-sfmh.onrender.com/api/auth/logout",
                {},
                {
                    withCredentials: true,
                }
            )

            setUserInfo({})
            setIsUserLoggedIn(false)
            setIsAuthReady(true)
            setOrders([])
            toast.success("Successfully Logout")
        } catch (error) {
            console.error("Error logging out user:", error.message);
            toast.error("Logout failed")
        }
    };

    const addToCart = async (productId) => {
        try {
            const res = await axios.put(`https://ecommerce-application-sfmh.onrender.com/api/cart/addToCart`, { product: productId }, { withCredentials: true })
            const result = await res.data;
            if (!result.success) {
                return toast('Removed from Cart', {
                    icon: '🔴',
                });
            }
            toast.success("Successfully added")
            return result
        } catch (error) {
            console.error("Error on addToCart:", error.message);
            toast.error("Something went wrong")
            return ({ success: false, message: 'Fail to add' })
        }

    }

    const removeFromCart = async (cartItemId) => {
        try {
            const res = await axios.delete('https://ecommerce-application-sfmh.onrender.com/api/cart/removeFromCart', {
                data: { cartItemId },
                withCredentials: true,
            })
            const result = await res.data;
            toast.success("Successfully removed")
            fetchCartItems()
            return result
        } catch (error) {
            console.error("Error on removeToCart:", error.message);
            toast.error("Something went wrong")
            return ({ success: false, message: 'Fail to remove' })
        }
    }

    const updateCartItem = async (cartId, qty) => {
        console.log(cartId, qty);
        try {
            const res = await axios.patch(`https://ecommerce-application-sfmh.onrender.com/api/cart/updateCart`, { cartId, qty }, { withCredentials: true })
        } catch (error) {
            console.error(error.message);

        }
    }

    const fetchCartItems = async () => {
        try {
            const res = await axios.get(`https://ecommerce-application-sfmh.onrender.com/api/cart/getAllCartItems`, { withCredentials: true })
            const result = await res.data;
            if (result.success) {
                setCartItems(result.items)
            }

        } catch (error) {
            console.error("error on fetchCartItmes:", error.message);

        }
    }

    const authCheck = async () => {
        try {
            const res = await axios.get(`https://ecommerce-application-sfmh.onrender.com/api/auth/me`, { withCredentials: true })
            const result = res.data
            if (result.success) {
                setIsUserLoggedIn(true);
                setUserInfo(result.user);
            } else {
                setIsUserLoggedIn(false);
                setUserInfo({});
            }
        } catch (error) {
            console.error("Error on auth check:", error.message);
            setIsUserLoggedIn(false);
            setUserInfo({});
        } finally {
            setIsAuthReady(true);
        }
    };




    const addProduct = async (imageOverride, product) => {
        try {
            const res = await axios.post(`https://ecommerce-application-sfmh.onrender.com/api/product/create`, {
                productName: product.productName,
                price: product.price,
                stock: product.stock,
                description: product.description,
                image: imageOverride ?? product.image,
                category: product.category,
            }, {
                withCredentials: true
            })
            const result = await res.data;
            if (result.success) {
                fetchProducts()
                fetchMyProducts()
                toast.success("Successfully added Product")
                return result
            }
            else {
                throw new Error("Add product failed")
            }
        } catch (error) {
            console.error("Error on add product:", error.message)
            toast.error("Not Added ")
            return { success: false, message: "Something went wrong" }
        }
    };

    const fetchProducts = async () => {
        try {
            const res = await axios.get(`https://ecommerce-application-sfmh.onrender.com/api/product/getAll`, { withCredentials: true })
            const result = await res.data;
            setFeaturedProducts(result.products)
            return result
        } catch (error) {
            console.error('error on fetchProduct:', error.message)
        }

    };

    const fetchOrders = async () => {
        try {
            const res = await axios.get(
                "https://ecommerce-application-sfmh.onrender.com/api/orders/my-orders",
                {
                    withCredentials: true,
                }
            );

            const orderItems = res.data.orderItems || [];
            setOrders(orderItems);
            return { success: true, orders: orderItems };
        } catch (error) {
            console.log(error);
            setOrders([]);
            return { success: false, message: "Failed to fetch orders" };
        }
    };

    const fetchProductsByCategory = async (category) => {
        try {
            const res = await axios.get(`https://ecommerce-application-sfmh.onrender.com/api/product/category/${category}`)
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
                "https://ecommerce-application-sfmh.onrender.com/api/payments/create-checkout-session",
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
        const res = await axios.get(`https://ecommerce-application-sfmh.onrender.com/api/auth/clearCartItems`, {
            withCredentials: true,
        })
    };

    const fetchMyProducts = async () => {
        try {
            const res = await axios.get(
                "https://ecommerce-application-sfmh.onrender.com/api/product/my-products",
                {
                    withCredentials: true,
                }
            );
            setMyProducts(res.data.products);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(
                `https://ecommerce-application-sfmh.onrender.com/api/product/delete/${id}`,
                {
                    withCredentials: true,
                }
            );
            toast.success("Successfully removed")
            fetchProducts()
            fetchMyProducts()
        } catch (error) {
            console.log(error);
            toast.error("Not Removed")
        }
    };

    const fetchProductById = async (id) => {
        try {
            const res = await axios.get(
                `https://ecommerce-application-sfmh.onrender.com/api/product/${id}`,
                {
                    withCredentials: true,
                }
            );

            setProductForEdit(res.data.product);

        } catch (error) {
            console.log(error);
        }
    };

    const editProduct = async (productId) => {
        try {
            const res = await axios.put(`https://ecommerce-application-sfmh.onrender.com/api/product/edit`, {
                productData: productForEdit
            }, { withCredentials: true })
            setProductForEdit(
                null
            )
            fetchMyProducts()
            toast.success("Successfully Update")
            return res.data
        } catch (error) {
            toast.error("Something went wrong")
            console.error(error.message);

        }
    };

    const disableProducts = async (productId, isBlocked) => {
        try {
            const res = await axios.patch('https://ecommerce-application-sfmh.onrender.com/api/product/disable', {
                productId,
                isBlocked
            }, {
                withCredentials: true
            })
        } catch (error) {
            console.error(error.message);

        }
    }

    const fetchOrdersList = async () => {
        try {
            const res = await axios.get('https://ecommerce-application-sfmh.onrender.com/api/orders/getAll',{withCredentials:true})
            const result = await res.data;
            setOrderList(result.orders)

        } catch (error) {
            console.error(error.message);

        }
    }
    useEffect(() => {
        fetchProducts()
        authCheck();
        fetchOrdersList();
    }, [])

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
                isAuthReady,
                authCheck,

            }}>
                <productContext.Provider value={{
                    addProduct,
                    fetchProductsByCategory,
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
                    fetchMyProducts,
                    myProducts,
                    setMyProducts,
                    deleteProduct,
                    fetchProductById,
                    editProduct,
                    productForEdit, setProductForEdit,
                    updateCartItem,
                    disableProducts
                    // updateProduct,
                    // deleteProduct
                }}>
                    <adminContext.Provider value={{
                        fetchOrdersList,
                        orderList
                    }}>


                        {children}
                    </adminContext.Provider>

                </productContext.Provider>
            </authContext.Provider>

        </div>
    )


}

export default GlobalContext