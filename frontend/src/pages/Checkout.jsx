import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [placingOrder, setPlacingOrder] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const navigate = useNavigate();
    const user_id = localStorage.getItem("user_id");

    useEffect(() => {
        if (!user_id) {
            navigate("/login");
            return;
        }
        const fetchCart = async () => {
            setLoading(true);
            try {
                const res = await axios.get("http://localhost:5000/api/cart", {
                    params: { user_id }
                });
                setCartItems(res.data);
            } catch (err) {
                setCartItems([]);
            }
            setLoading(false);
        };
        fetchCart();
    }, [user_id, navigate]);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const itemPrice = item.price || item.product_price || 0;
            return total + (itemPrice * item.quantity);
        }, 0).toFixed(2);
    };

    const handlePlaceOrder = async () => {
        setPlacingOrder(true);
        try {
            await axios.post("http://localhost:5000/api/orders", { user_id });
            setOrderSuccess(true);
            setCartItems([]);
        } catch (err) {
            alert("Failed to place order. Please try again.");
        }
        setPlacingOrder(false);
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold text-[#3e2723] mb-6">Checkout</h1>
                <p className="text-gray-600 mb-8">Loading...</p>
            </div>
        );
    }

    if (orderSuccess) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold text-[#3e2723] mb-6">Order Placed!</h1>
                <p className="text-gray-600 mb-8">Thank you for your order. You can view your order history in your profile.</p>
                <Link
                    to="/menu"
                    className="bg-[#e4c9a7] text-[#3e2723] px-6 py-3 rounded-lg hover:bg-[#b5a397] hover:text-white transition-colors font-medium"
                >
                    Back to Menu
                </Link>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold text-[#3e2723] mb-6">Checkout</h1>
                <p className="text-gray-600 mb-8">Your cart is empty.</p>
                <Link
                    to="/menu"
                    className="bg-[#e4c9a7] text-[#3e2723] px-6 py-3 rounded-lg hover:bg-[#b5a397] hover:text-white transition-colors font-medium"
                >
                    Browse Menu
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-[#3e2723] mb-8">Order Summary</h1>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                {cartItems.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center py-4 border-b border-gray-200 last:border-0"
                    >
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                            <img
                                src={
                                    item.image_url ||
                                    "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80"
                                }
                                alt={item.name || item.product_name || "Drink"}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        
                        <div className="ml-6 flex-1">
                            <div className="flex justify-between">
                                <h3 className="text-lg font-medium text-[#3e2723]">
                                    {item.name || item.product_name}
                                </h3>
                                <p className="text-lg font-medium text-[#3e2723]">
                                    ₱{((item.price || item.product_price || 0) * item.quantity).toFixed(2)}
                                </p>
                            </div>
                            
                            <div className="text-sm text-gray-600">
                                Qty: {item.quantity}
                                {item.base && (
                                    <>
                                        {" | "}Base: {item.base}
                                        {item.size && <> | Size: {item.size}</>}
                                        {item.milk && <> | Milk: {item.milk}</>}
                                        {item.sweetener && <> | Sweetener: {item.sweetener}</>}
                                        {item.temperature && <> | Temp: {item.temperature}</>}
                                        {item.toppings && item.toppings.length > 0 && (
                                            <> | Toppings: {item.toppings.join(", ")}</>
                                        )}
                                        {item.add_ins && item.add_ins.length > 0 && (
                                            <> | Add-ins: {item.add_ins.join(", ")}</>
                                        )}
                                    </>
                                )}
                            </div>
                            
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between mb-2">
                    <p className="text-gray-600">Subtotal</p>
                    <p className="font-medium">₱{calculateTotal()}</p>
                </div>
                <div className="border-t border-gray-200 my-4"></div>
                <div className="flex justify-between mb-6">
                    <p className="text-lg font-medium text-[#3e2723]">Total</p>
                    <p className="text-lg font-bold text-[#3e2723]">₱{calculateTotal()}</p>
                </div>
                <button
                    className="w-full bg-[#3e2723] text-white py-3 rounded-lg hover:bg-[#5d4037] transition-colors font-medium"
                    onClick={handlePlaceOrder}
                    disabled={placingOrder}
                >
                    {placingOrder ? "Placing Order..." : "Place Order"}
                </button>
            </div>
        </div>
    );
};

export default Checkout;

