import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
	
	//BUG CREATED IN THIS PART. 
	// Holds and updates list of items in the cart. 
	const [cartItems, setCartItems] = useState([]); 

	// This is a CALLBACK. Fetches the cart data from the localStorage and updates he cartItems state. 
	useEffect(() => {
		const storedCart = localStorage.getItem("cart"); // retrieves the cart data fromt the localStorage. returns NULL when not found
		
		if (storedCart) { // basically, if storedCart is found. It does the code block. 
			setCartItems(JSON.parse(storedCart)); // converts the JSON to object. Updates the cartItems with the parsed data using the setCartItems function. 
		}
	}, []); // dependency array. Ensures the useEffect runs only once.  

	
	/*
	Updates a quantity, Removing an item.
	Persisting the updated cart in the local storage. 
	
	If newQuantity <= 0, the item is removed from the cart using .filter()
	Otherwise, the item's quantity is updated using .map()
	*/ 
	const updateQuantity = (itemId, newQuantity) => {
		
		if (newQuantity <= 0) { // if newQuantity is 0 or less, the item is removed from the cart (cartItems.filter)
			setCartItems(cartItems.filter((item) => item.id !== itemId)); // if true, the items is kept. If False it is removed. 
			
			/*
			If the newQuantity is greater than 0 (> 0)
			the function updates the quantity of the item with the matching itemId.
			*/
		} else { // updates the quantity if newQuantity is > 0
			setCartItems(
				cartItems.map((item) =>
					item.id === itemId ? { ...item, quantity: newQuantity } : item // sets the quantity into newQuantity (updated quantity)
				)
			);
		}
		localStorage.setItem("cart", JSON.stringify(cartItems));
	};


	//calculates the total price of all items in the cart. 
	const calculateTotal = () => {
		return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
	};

	
	// checks if the cart is empty. 
	if (cartItems.length === 0) {
		return (
			<div className="max-w-7xl mx-auto px-4 py-16 text-center">
				<h1 className="text-3xl font-bold text-[#3e2723] mb-6">Your Cart</h1>
				<p className="text-gray-600 mb-8">Your cart is currently empty</p>
				<Link // Link to the menu if the cart is empty. 
					to="/menu"
					className="bg-[#e4c9a7] text-[#3e2723] px-6 py-3 rounded-lg hover:bg-[#b5a397] hover:text-white transition-colors font-medium"
				>
					Browse Menu
				</Link>
			</div>
		);
	}

	
	//FRONT END RENDERING
	return (
		<div className="max-w-7xl mx-auto px-4 py-8"> {/* Main Wrapper */}
		
			<h1 className="text-3xl font-bold text-[#3e2723] mb-8">Your Cart</h1> {/* Page Title */}


			{/* Cart Items selection box */}
			<div className="bg-white rounded-lg shadow-md p-6 mb-8"> {/* Inner Wrapper for Cart Items - white BG */}
				
				{cartItems.map((item) => (
					
					<div  // individual cart item wrapper
						key={item.id} // Individual cart items
						className="flex items-center py-4 border-b border-gray-200 last:border-0"
					>
						 {/* Item Image */}
						<div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md"> 
							<img
								src={item.image}
								alt={item.name}
								className="h-full w-full object-cover"
							/>
						</div> 
						
						
						{/* Item Details - name and total price */}
						<div className="ml-6 flex-1"> {/* Div for Item Details */}
							
							{/* Name and total price */}
							<div className="flex justify-between">
								<h3 className="text-lg font-medium text-[#3e2723]">{item.name}</h3>
								<p className="text-lg font-medium text-[#3e2723]">
									₱{item.price * item.quantity}
								</p>
							</div>
							
							
							{/* Quantity controls */}
							<div className="flex items-center mt-2">
								{/* Minus button*/}
								<button
									className="px-3 py-1 bg-gray-100 rounded-l-md hover:bg-gray-200"
									onClick={() => updateQuantity(item.id, item.quantity - 1)}
								>
									-
								</button>
								
								<span className="px-4 py-1 bg-gray-100">{item.quantity}</span>
								
								{/* Add button*/}
								<button
									className="px-3 py-1 bg-gray-100 rounded-r-md hover:bg-gray-200"
									onClick={() => updateQuantity(item.id, item.quantity + 1)} 
								>
									+
								</button>
								
								{/* Remove item button*/}
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



			{/* Subtotal, total, price, checkout Container */}
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
