import React, { useState, useEffect } from "react"; // importing useState and useEffect hooks from React
import { useNavigate } from "react-router-dom";

const Menu = () => {
    
    // state managements (HOOKS)
	/* PARTS OF A useState HOOK:
	state: current value of a state
	setState: function to update the state
	initial value:Updates the state and triggers a re-render of the component.
. 	empty array for cartItems, "all" for activeCategory, and null for notification
	*/ 
	
	const navigate = useNavigate();
	const [cartItems, setCartItems] = useState([]); // manages list of items in the cart
	const [activeCategory, setActiveCategory] = useState("all"); // tracks the currently selected category ("coffee", "frappe", "smoothie", or "all")
	const [notification, setNotification] = useState(null); // manages the notification message. null because no notif shown initially

	
	// Get cart from localStorage on component mount
	useEffect(() => {
		const storedCart = localStorage.getItem("cart"); // effect that we are using to get the cart from localStorage
		// If the data exist, Check if there is a cart in localStorage and parse it to set the initial state
		if (storedCart) {
			setCartItems(JSON.parse(storedCart));
		}
	}, []);

	
	// Update localStorage whenever cart changes
	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cartItems));
	}, [cartItems]);

	
	
	const menuItems = [
		// Coffee category
		{
			id: 1,
			name: "Caramel Latte",
			description: "Sweet espresso with caramel syrup and steamed milk.",
			price: 120,
			image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
			category: "coffee",
		},
		{
			id: 2,
			name: "Vanilla Cold Brew",
			description: "Smooth cold brew coffee infused with vanilla flavor.",
			price: 110,
			image: "https://images.unsplash.com/photo-1578681326003-c293a15615f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
			category: "coffee",
		},
		{
			id: 3,
			name: "Mocha Espresso",
			description: "Rich espresso with chocolate and steamed milk.",
			price: 130,
			image: "https://images.unsplash.com/photo-1582202737800-8ab9a8012367?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
			category: "coffee",
		},
		{
			id: 4,
			name: "Classic Americano",
			description: "Espresso shots diluted with hot water for a rich flavor.",
			price: 100,
			image: "https://images.unsplash.com/photo-1551030173-122aabc4489c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
			category: "coffee",
		},
		{
			id: 5,
			name: "Hazelnut Cappuccino",
			description: "Espresso with steamed milk, foam, and hazelnut syrup.",
			price: 135,
			image: "https://images.unsplash.com/photo-1534687941688-651ccaafbff8?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
			category: "coffee",
		},
		{
			id: 6,
			name: "Flat White",
			description: "Espresso with velvety steamed milk and microfoam.",
			price: 125,
			image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
			category: "coffee",
		},

		// Frappe category
		{
			id: 7,
			name: "Matcha Frappe",
			description: "Creamy matcha green tea blended with ice and milk.",
			price: 140,
			image: "https://images.unsplash.com/photo-1644681584421-c8e5aea022f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
			category: "frappe",
		},
		{
			id: 8,
			name: "Caramel Frappe",
			description: "Coffee blended with ice, milk, and rich caramel sauce.",
			price: 145,
			image: "https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
			category: "frappe",
		},
		{
			id: 9,
			name: "Chocolate Chip Frappe",
			description: "Chocolate frappe loaded with chocolate chips and whipped cream.",
			price: 155,
			image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
			category: "frappe",
		},
		{
			id: 10,
			name: "Oreo Cookie Frappe",
			description: "Vanilla base blended with crushed Oreo cookies and ice.",
			price: 160,
			image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
			category: "frappe",
		},

		// Smoothie category
		{
			id: 11,
			name: "Strawberry Smoothie",
			description: "Fresh strawberries blended with yogurt and ice.",
			price: 150,
			image: "https://images.unsplash.com/photo-1638176066298-2756703a89c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
			category: "smoothie",
		},
		{
			id: 12,
			name: "Mango Passion Smoothie",
			description: "Tropical blend of mangoes and passion fruit.",
			price: 155,
			image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
			category: "smoothie",
		},
		{
			id: 13,
			name: "Berry Blast Smoothie",
			description: "Mixed berries with Greek yogurt and honey.",
			price: 160,
			image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
			category: "smoothie",
		},
		{
			id: 14,
			name: "Green Detox Smoothie",
			description: "Spinach, kale, banana, and pineapple health blend.",
			price: 165,
			image: "https://images.unsplash.com/photo-1638439430466-b2bb7fdc1d67?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
			category: "smoothie",
		},
		{
			id: 15,
			name: "Banana Peanut Butter Smoothie",
			description: "Creamy blend of bananas, peanut butter, and Greek yogurt.",
			price: 160,
			image: "https://images.unsplash.com/photo-1626222337147-1ae3a3bc2c18?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
			category: "smoothie",
		},
	];
	

	// defines all the categories available in the menu
	// "all" category shows all items, while others filter by specific
	const categories = ["all", "coffee", "frappe", "smoothie", "NIGGA"];
	

	// Function to add items to the cart
	//item represents the menuItem that the user wants to add to the cart
	const addToCart = (item) => {
		const existingItem = cartItems.find((cartItem) => cartItem.id === item.id); /* checks if the item already exists in the cart. if they are the same ID, 
																					it means the item is already in the cart (existing)*/  
																		
		if (existingItem) { // Checks if the item already exists in the cart. If it does, UPDATE the quantity
			setCartItems(
				cartItems.map((cartItem) =>
					cartItem.id === item.id
						? { ...cartItem, quantity: cartItem.quantity + 1 }
						: cartItem
				)
			);
		} else { // If the item doesn't exist, add it to the cart with a starting quantity of 1
			setCartItems([...cartItems, { ...item, quantity: 1 }]); 
		}  

		// Show notification
		setNotification(`${item.name} is Added to cart!`);
		setTimeout(() => setNotification(null), 2000);
	};
	
	
	// navigate to the cart page when the "Buy Now" button is clicked. or whether the user wants to go to the cart page
	// This function uses the useNavigate hook from react-router-dom to change the route to "/cart"
	const goToCart = () => {
		navigate("/cart");
	};

	
	// Filter menu items based on the selected category
	const filteredItems =
		activeCategory === "all"
			? menuItems //if TRUE, show all items
			: menuItems.filter((item) => item.category === activeCategory); // if FALSE, filter the items based on the selected category

	const itemCount = filteredItems.length; // count the number of items in the filtered list
	

	
	// FRONT END - RENDERING
	return (
		<div className="bg-[#f8f4e5] min-h-screen py-8">  {/* Main Wrapper (Outer wrapper) */} 
			<div className="max-w-7xl mx-auto px-4"> {/* Inner Wrapper - width limiter  */}
				
				
				{/* Title and subtitle */} 
				 <div className="text-center mb-10">
					<h1 className="text-4xl font-bold text-[#3e2723] mb-2">Our Menu</h1>
					<p1 className="text-[#3e2723] max-w-2xl mx-auto"> Discover our selection of handcrafted coffees, frappes, and smoothies made
					with premium ingredients </p1>
				 </div>



				{/* Category selector */}
				{/* This part shows clickable category buttons for filtering items */}
				<div className="flex justify-center mb-6 flex-wrap gap-2">
					{/* loop through category and creates a button for them */}
					{categories.map((category) => ( 
						<button
							key={category} // looping KEY
							className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
								activeCategory === category
									? "bg-[#3e2723] text-white" // active (clicked)
									: "bg-[#e4c9a7] text-[#3e2723] hover:bg-[#b5a397] hover:text-white" // not active (not clicked)
							}`}
							onClick={() => setActiveCategory(category)} // function to show the categories when it's active
						>
							{category.charAt(0).toUpperCase() + category.slice(1)}
						</button>
					))}
				</div>

				
				
				{/* Item count */}
				{/* Displays the item numbers available on the celected category */}
				<p className="text-center text-[#5d4037] mb-8">
					Showing {itemCount} {activeCategory !== "all" ? activeCategory : ""} Items
				</p>
				

				{/* Menu grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">  {/* MAIN WRAPPER - 1col for small device, 2cols for medium, 3cols for large screen, 8gaps spacing percards */}
					
					{filteredItems.map((item) => ( // loop through filtered items (item)
					
						<div // individual Menu Card
							key={item.id} 
							className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
						>
							
							{/* Card Image container */}
							<div className="h-48 overflow-hidden">
								<img // image of all the cards
									src={item.image}
									alt={item.name}
									className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" //class property of all the images
								/>
							</div>
							
							
							{/* Content sections - item name, category, description, prince and buttons. */}
							<div className="p-5"> {/* padding of 5 per content */}
								
								{/* Item name and category */}
								<div className="flex justify-between items-start mb-2">
									<h2 className="text-xl font-semibold text-[#3e2723]">
										{item.name} 
									</h2>
									<span className="bg-[#f8e8d0] text-[#3e2723] px-2 py-1 rounded-full text-xs font-medium">
										{item.category}
									</span>
								</div>
								
								
								{/* Item description */}
								<p className="text-gray-600 text-sm mb-4">{item.description}</p>


								{/* Price and buttons (add to cart, buy now) */}
								<div className="flex justify-between items-center"> {/* Container */}
									
									<span className="text-[#3e2723] font-bold text-lg"> {/* Item price */}
										₱{item.price} 
									</span>
									
									<div className="flex gap-2"> {/* Button container for add to cart and buy now */}
										<button // Add to Cart button
											className="bg-[#e4c9a7] text-[#3e2723] px-4 py-2 rounded-full text-sm hover:bg-[#b5a397] hover:text-white transition-colors flex items-center gap-1"
											onClick= {() => addToCart(item)} // button functionality
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-4 w-4"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M12 6v6m0 0v6m0-6h6m-6 0H6"
												/>
											</svg>
											Add to Cart
										</button>
										
										<button // Buy Now button
											className="bg-[#3e2723] text-white px-4 py-2 rounded-full text-sm hover:bg-[#5d4037] transition-colors"
											onClick={goToCart} // button functionality
										>
											Buy Now
										</button>
									</div>	
									
								</div>
								
							</div>
						</div>
						
					))}
				</div>



				{/* Empty state for no results */}
				{filteredItems.length === 0 && (
					<div className="text-center py-12">
						<h3 className="text-xl text-[#3e2723] mb-2">No items found</h3>
						<p className="text-gray-600">Try selecting a different category</p>
					</div>
				)}
				


				{/* Notification toast */}
				{notification && (
					<div className="fixed bottom-5 right-5 bg-[#3e2723] text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-out">
						{notification} 
					</div>
				)}
				
				

				{/* Back to top button */}
				<div className="text-center mt-12">
					<button
						onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} // button functionality
						className="bg-[#e4c9a7] text-[#3e2723] px-6 py-2 rounded-full text-sm hover:bg-[#b5a397] hover:text-white transition-colors inline-flex items-center gap-2"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M5 15l7-7 7 7"
							/>
						</svg>
						Back to Top
					</button>
				</div>
			</div>
		</div>
	);
};

export default Menu;
