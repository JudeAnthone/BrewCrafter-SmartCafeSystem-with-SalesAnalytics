import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems(cartItems.filter(item => item.id !== itemId));
    } else {
      setCartItems(
        cartItems.map(item => 
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-[#3e2723] mb-6">Your Cart</h1>
        <p className="text-gray-600 mb-8">Your cart is currently empty</p>
        <Link to="/menu" className="bg-[#e4c9a7] text-[#3e2723] px-6 py-3 rounded-lg hover:bg-[#b5a397] hover:text-white transition-colors font-medium">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#3e2723] mb-8">Your Cart</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        {cartItems.map(item => (
          <div key={item.id} className="flex items-center py-4 border-b border-gray-200 last:border-0">
            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
              <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
            </div>
            <div className="ml-6 flex-1">
              <div className="flex justify-between">
                <h3 className="text-lg font-medium text-[#3e2723]">{item.name}</h3>
                <p className="text-lg font-medium text-[#3e2723]">₱{item.price * item.quantity}</p>
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
      </div>
    </div>
  );
};

export default Cart;