import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// categ name mapping
const CATEGORY_MAP = {
  1: "Coffee",
  2: "Frappe",
  3: "Smoothie"
};

const Menu = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState("all");
    const [notification, setNotification] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState(["all"]);

    // Fetch products from backend
    useEffect(() => {
        axios.get("http://localhost:5000/api/products")
            .then(res => {
                setMenuItems(res.data);
                // Get unique category IDs from products and map to names
                const cats = Array.from(new Set(res.data.map(item => item.category_id))).filter(Boolean);
                const catNames = cats.map(id => CATEGORY_MAP[id]).filter(Boolean);
                setCategories(["all", ...catNames]);
            })
            .catch(() => setMenuItems([]));
    }, []);

    // Add to cart (send to backend, not localStorage)
    const addToCart = async (item) => {
        const user_id = localStorage.getItem("user_id");
        if (!user_id) {
            alert("Please log in to add to cart.");
            return;
        }
        try {
            await axios.post("http://localhost:5000/api/cart", {
                user_id,
                product_id: item.id,
                quantity: 1
            });
            setNotification(`${item.product_name} is Added to cart!`);
            setTimeout(() => setNotification(null), 2000);
        } catch (err) {
            setNotification("Failed to add to cart. Please try again.");
            setTimeout(() => setNotification(null), 2000);
        }
    };

    const goToCart = () => navigate("/cart");

    // Filter menu items based on the selected category name
    const filteredItems =
        activeCategory === "all"
            ? menuItems
            : menuItems.filter((item) =>
                CATEGORY_MAP[item.category_id] === activeCategory
            );

    const itemCount = filteredItems.length;

    return (
        <div className="bg-[#f8f4e5] min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-[#3e2723] mb-2">Our Menu</h1>
                    <p className="text-[#3e2723] max-w-2xl mx-auto">
                        Discover our selection of handcrafted coffees, frappes, and smoothies made with premium ingredients
                    </p>
                </div>

                {/* Category selector */}
                <div className="flex justify-center mb-6 flex-wrap gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                activeCategory === category
                                    ? "bg-[#3e2723] text-white"
                                    : "bg-[#e4c9a7] text-[#3e2723] hover:bg-[#b5a397] hover:text-white"
                            }`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <p className="text-center text-[#5d4037] mb-8">
                    Showing {itemCount} {activeCategory !== "all" ? activeCategory : ""} Items
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                        >
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={item.image_url}
                                    alt={item.product_name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <h2 className="text-xl font-semibold text-[#3e2723]">
                                        {item.product_name}
                                    </h2>
                                    <span className="bg-[#f8e8d0] text-[#3e2723] px-2 py-1 rounded-full text-xs font-medium">
                                        {CATEGORY_MAP[item.category_id]}
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm mb-4">{item.product_description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#3e2723] font-bold text-lg">
                                        ₱{item.product_price}
                                    </span>
                                    <div className="flex gap-2">
                                        <button
                                            className="bg-[#e4c9a7] text-[#3e2723] px-4 py-2 rounded-full text-sm hover:bg-[#b5a397] hover:text-white transition-colors flex items-center gap-1"
                                            onClick={() => addToCart(item)}
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
                                        <button
                                            className="bg-[#3e2723] text-white px-4 py-2 rounded-full text-sm hover:bg-[#5d4037] transition-colors"
                                            onClick={goToCart}
                                        >
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-12">
                        <h3 className="text-xl text-[#3e2723] mb-2">No items found</h3>
                        <p className="text-gray-600">Try selecting a different category</p>
                    </div>
                )}

                {notification && (
                    <div className="fixed bottom-5 right-5 bg-[#3e2723] text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-out">
                        {notification}
                    </div>
                )}

                <div className="text-center mt-12">
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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
