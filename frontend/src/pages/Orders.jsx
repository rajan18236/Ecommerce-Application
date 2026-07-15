import React, { useContext, useEffect } from 'react'
import { productContext } from '../context/GlobalContext';



const Orders = () => {
const {orders, setOrders,fetchOrders} = useContext(productContext)

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="max-w-6xl mx-auto py-10">

            <h1 className="text-3xl font-bold mb-8">
                My Orders
            </h1>
            {orders.length === 0 && (

                <div className="text-center mt-20">

                    <h2 className="text-3xl font-bold">
                        No Orders Yet
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Start shopping to see your orders here.
                    </p>

                </div>

            )}
            {orders.map(order => (

                <div
                    key={order._id}
                    className="bg-white rounded-xl shadow mb-8 p-6"
                >

                    <div className="flex justify-between border-b pb-4">

                        <div>
                            <h2 className="font-semibold">
                                Order #{order._id.slice(-6)}
                            </h2>

                            <p className="text-gray-500">
                                {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                        </div>

                        <div className="text-right">

                            <h3 className="font-bold text-xl">
                                ${order.totalAmount}
                            </h3>

                            <span className="text-green-600">
                                Paid
                            </span>

                        </div>

                    </div>

                    <div className="mt-5">

                        {order.products.map(item => (

                            <div
                                key={item._id}
                                className="flex items-center gap-5 py-4 border-b"
                            >

                                <img
                                    src={item.product.image}
                                    className="w-24 h-24 rounded-lg object-cover"
                                />

                                <div className="flex-1">

                                    <h3 className="font-semibold">
                                        {item.product.productName}
                                    </h3>

                                    <p>
                                        Quantity : {item.productQty}
                                    </p>

                                    <p>
                                        Price : ${item.price}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            ))}

        </div>
    )
}

export default Orders
