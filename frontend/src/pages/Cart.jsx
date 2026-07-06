import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Nike Air Max",
      price: 89,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    },
    {
      id: 2,
      name: "Apple Watch",
      price: 399,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500",
    },
  ]);

  const increaseQty = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) =>
      items.filter((item) => item.id !== id)
    );
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 15 : 0;
  const total = subtotal + shipping;

  return (
    <section className="max-w-7xl mx-auto mt-10 px-5 py-10">

      <h1 className="text-4xl font-bold mb-8">
        Shopping Cart
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-5">

          {cartItems.length === 0 ? (
            <div className="bg-white rounded-2xl shadow p-10 text-center">
              <h2 className="text-2xl font-semibold">
                Your cart is empty
              </h2>

              <p className="text-gray-500 mt-2">
                Add some products to get started.
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow p-5 flex flex-col md:flex-row gap-5 items-center"
              >

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 rounded-xl object-cover"
                />

                <div className="flex-1">

                  <h2 className="text-xl font-semibold">
                    {item.name}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    ${item.price}
                  </p>

                  {/* Quantity */}
                  <div className="flex items-center gap-3 mt-4">

                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="border rounded-lg p-2 hover:bg-gray-100"
                    >
                      <Minus size={18} />
                    </button>

                    <span className="text-lg font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className="border rounded-lg p-2 hover:bg-gray-100"
                    >
                      <Plus size={18} />
                    </button>

                  </div>

                </div>

                <div className="text-right">

                  <p className="text-xl font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="mt-6 text-red-500 hover:text-red-700 flex items-center gap-2"
                  >
                    <Trash2 size={18} />
                    Remove
                  </button>

                </div>

              </div>
            ))
          )}

        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow p-6 h-fit sticky top-5">

          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>

            <hr />

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

          </div>

          <button className="w-full mt-8 bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition">
            Proceed to Checkout
          </button>

        </div>

      </div>

    </section>
  );
};

export default Cart;