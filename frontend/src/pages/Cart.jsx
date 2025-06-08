import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const user_id = localStorage.getItem("user_id");

    // Fetch cart items from backend
    useEffect(() => {
        if (!user_id) return;
        const fetchCart = async () => {
            setLoading(true);
            try {
                const res = await axios.get("http://localhost:5000/api/cart", {
                    params: { user_id }
                });
                setCartItems(res.data);
            } catch (err) {
                console.error("Cart fetch error:", err);
                setCartItems([]);
            }
            setLoading(false);
        };
        fetchCart();
    }, [user_id]);

    // Update quantity or remove item
    const updateQuantity = async (itemId, newQuantity) => {
        try {
            const item = cartItems.find((i) => i.id === itemId);
            if (!item) return;

            if (newQuantity <= 0) {
                // Remove item
                await axios.delete(`http://localhost:5000/api/cart/${itemId}`);
                setCartItems(cartItems.filter((item) => item.id !== itemId));
            } else {
                await axios.put(`http://localhost:5000/api/cart/${itemId}`, {
                    quantity: newQuantity,
                    notes: item.notes || null
                });
                setCartItems(
                    cartItems.map((item) =>
                        item.id === itemId 
                            ? { ...item, quantity: newQuantity }
                            : item
                    )
                );
            }
        } catch (err) {
            console.error("Update quantity error:", err);
            alert("Failed to update quantity");
        }
    };

    // Empty cart (send user_id as query param)
    const clearCart = async () => {
        if (!window.confirm("Are you sure you want to empty your cart?")) return;
        try {
            await axios.delete("http://localhost:5000/api/cart/clear", { params: { user_id } });
            setCartItems([]);
        } catch (err) {
            alert("Failed to clear cart.");
        }
    };

    // Calculate total with fallback to product_price
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const itemPrice = item.price || item.product_price || 0;
            return total + (itemPrice * item.quantity);
        }, 0).toFixed(2);
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold text-[#3e2723] mb-6">Your Cart</h1>
                <p className="text-gray-600 mb-8">Loading...</p>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold text-[#3e2723] mb-6">Your Cart</h1>
                <p className="text-gray-600 mb-8">Your cart is currently empty</p>
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
            <h1 className="text-3xl font-bold text-[#3e2723] mb-8">Your Cart</h1>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                {cartItems.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center py-4 border-b border-gray-200 last:border-0"
                    >
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                            <img
                                src={
                                    item.image_url || item.product_image ||
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
                            <div className="flex items-center mt-2">
                                <button
                                    className="px-3 py-1 bg-gray-100 rounded-l-md hover:bg-gray-200"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                    -
                                </button>
                                <span className="px-4 py-1 bg-gray-100">{item.quantity}</span>
                                <button
                                    className="px-3 py-1 bg-gray-100 rounded-r-md hover:bg-gray-200"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                    +
                                </button>
                                <button
                                    className="ml-4 text-red-500 hover:text-red-700"
                                    onClick={() => updateQuantity(item.id, 0)}
                                >
                                    Remove
                                </button>
                            </div>
                            {/* Show details for custom drinks */}
                            {item.base && (
                                <div className="mt-2 text-xs text-gray-600">
                                    <span>Base: {item.base}</span>
                                    {item.size && <span> | Size: {item.size}</span>}
                                    {item.milk && <span> | Milk: {item.milk}</span>}
                                    {item.sweetener && <span> | Sweetener: {item.sweetener}</span>}
                                    {item.temperature && <span> | Temp: {item.temperature}</span>}
                                    {item.toppings && item.toppings.length > 0 && (
                                        <span> | Toppings: {item.toppings.join(", ")}</span>
                                    )}
                                    {item.add_ins && item.add_ins.length > 0 && (
                                        <span> | Add-ins: {item.add_ins.join(", ")}</span>
                                    )}
                                </div>
                            )}
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
                <button className="w-full bg-[#3e2723] text-white py-3 rounded-lg hover:bg-[#5d4037] transition-colors font-medium">
                    Proceed to Checkout
                </button>
                <button
                    className="w-full mt-3 bg-red-100 text-red-700 py-2 rounded-lg hover:bg-red-200 transition-colors font-medium"
                    onClick={clearCart}
                >
                    Empty Cart
                </button>
            </div>
        </div>
    );
};

export default Cart;
