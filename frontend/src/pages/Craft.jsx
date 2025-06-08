import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Craft = () => {
    // Check for user_id set by login, do NOT generate a new one here
    useEffect(() => {
        const user_id = localStorage.getItem("user_id");
        if (!user_id) {
            alert("Please log in to craft a drink.");
            // Optionally: window.location.href = "/login";
        }
    }, []);

    const navigate = useNavigate();
    const [notification, setNotification] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);

    // custom drink details 
    const [craftedDrink, setCraftedDrink] = useState({
        base: "",
        size: "",
        milk: "",
        sweetener: "",
        toppings: [],
        extras: [],
        temperature: "",
        name: "",
        price: 0,
    });

    // Price calculation with useEffect whenever craftedDrink changes
    useEffect(() => {
        let totalPrice = 0;
        const basePrices = {
            Espresso: 80,
            "Cold Brew": 90,
            Matcha: 100,
            Tea: 70,
            Chocolate: 85,
        };
        const sizeMultipliers = {
            Small: 1,
            Medium: 1.25,
            Large: 1.5,
        };
        const milkPrices = {
            "Whole Milk": 10,
            "Almond Milk": 15,
            "Oat Milk": 15,
            "Coconut Milk": 15,
            "Soy Milk": 10,
            None: 0,
        };
        const sweetenerPrices = {
            Sugar: 0,
            Honey: 5,
            "Maple Syrup": 10,
            Stevia: 5,
            None: 0,
        };
        const toppingPrice = 10;
        const extraPrice = 15;

        if (craftedDrink.base && basePrices[craftedDrink.base]) {
            totalPrice += basePrices[craftedDrink.base];
        }
        if (craftedDrink.size && sizeMultipliers[craftedDrink.size]) {
            totalPrice *= sizeMultipliers[craftedDrink.size];
        }
        if (craftedDrink.milk && milkPrices[craftedDrink.milk]) {
            totalPrice += milkPrices[craftedDrink.milk];
        }
        if (craftedDrink.sweetener && sweetenerPrices[craftedDrink.sweetener]) {
            totalPrice += sweetenerPrices[craftedDrink.sweetener];
        }
        totalPrice += craftedDrink.toppings.length * toppingPrice;
        totalPrice += craftedDrink.extras.length * extraPrice;
        totalPrice = Math.round(totalPrice);

        setCraftedDrink((prev) => ({ ...prev, price: totalPrice }));
    }, [
        craftedDrink.base,
        craftedDrink.size,
        craftedDrink.milk,
        craftedDrink.sweetener,
        craftedDrink.toppings,
        craftedDrink.extras,
    ]);

    const nextStep = () => {
        setCurrentStep((prevStep) => Math.min(prevStep + 1, 7));
    };

    const prevStep = () => {
        setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCraftedDrink((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (category, item) => {
        setCraftedDrink((prev) => {
            const updatedArray = prev[category].includes(item)
                ? prev[category].filter((i) => i !== item)
                : [...prev[category], item];
            return { ...prev, [category]: updatedArray };
        });
    };

    const addToCart = async () => {
        try {
            const user_id = localStorage.getItem("user_id");
            if (!user_id) {
                alert("Please log in to add to cart.");
                return;
            }
            const payload = {
                user_id,
                base: craftedDrink.base,
                size: craftedDrink.size,
                milk: craftedDrink.milk,
                sweetener: craftedDrink.sweetener,
                toppings: craftedDrink.toppings,
                extras: craftedDrink.extras,
                temperature: craftedDrink.temperature,
                name: craftedDrink.name || "Custom Crafted Drink",
                price: craftedDrink.price
            };
            const res = await axios.post("http://localhost:5000/api/custom-drinks", payload);
            const savedDrink = res.data;

            await axios.post("http://localhost:5000/api/cart", {
                user_id,
                custom_drink_id: savedDrink.id,
                quantity: 1
            });

            setNotification("Your Custom Drink is added to the Cart!");
            setTimeout(() => setNotification(null), 3000);

            setCraftedDrink({
                base: "",
                size: "",
                milk: "",
                sweetener: "",
                toppings: [],
                extras: [],
                temperature: "",
                name: "",
                price: 0,
            });
            setCurrentStep(1);
        } catch (err) {
            setNotification("Failed to save your custom drink. Please try again.");
            setTimeout(() => setNotification(null), 3000);
        }
    };

    const buyNow = async () => {
        await addToCart();
        navigate("/cart");
    };

    // Options for the customization
    // STEP 1
    const drinkBases = ["Espresso", "Cold Brew", "Matcha", "Tea", "Chocolate"];
    
    // STEP 2
    const drinkSizes = ["Small", "Medium", "Large"];
    
    // STEP 3
    const milkOptions = [
        "Whole Milk",
        "Almond Milk",
        "Oat Milk",
        "Coconut Milk",
        "Soy Milk",
        "None",
    ];
    
    // STEP 4
    const sweetenerOptions = ["Sugar", "Honey", "Maple Syrup", "Stevia", "None"];
    
    // STEP 5
    const toppingOptions = [
        "Whipped Cream",
        "Chocolate Drizzle",
        "Caramel Drizzle",
        "Cinnamon",
        "Cocoa Powder",
        "Sprinkles",
    ];
    
    // STEP 6
    const extraOptions = [
        "Extra Shot",
        "Vanilla Syrup",
        "Hazelnut Syrup",
        "Caramel Syrup",
        "Chocolate Syrup",
        "Mint Syrup",
    ];
    
    // STEP 7
    const temperatureOptions = ["Hot", "Iced", "Blended"];

    // Calculate progress percentage
    const progressPercentage = (currentStep / 7) * 100;

    
    
    // FRONT END - RENDERING
    return (
        <div className="bg-[#f8f4e5] min-h-screen py-8"> {/* Main/Outer Container*/}
            <div className="max-w-4xl mx-auto px-4"> {/* Inner Container */}
                
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-[#3e2723] mb-2">Craft Your Own Drink</h1>
                    <p className="text-[#5d4037] max-w-2xl mx-auto">
                        Create your perfect beverage by selecting your preferred ingredients
                    </p>
                </div>
                

                {/* Progress bar */}
                <div className="mb-8">
                    <div className="h-2 w-full bg-[#e4c9a7] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#3e2723] transition-all duration-500 ease-in-out"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                    
                    {/* Start - Finish label */}
                    <div className="flex justify-between mt-2 text-sm text-[#5d4037]">
                        <span>Start</span>
                        <span>Finish</span>
                    </div>
                </div>


                {/* Craft Form */}
                {/* Container for the 1 to 7 steps */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    
                    {/* Step 1: Choose Base */}
                    {currentStep === 1 && (
                        <div className="animate-fadeIn"> {/* Step 1 Container */}
                            <h2 className="text-2xl font-semibold text-[#3e2723] mb-4">
                                Choose Your Base
                            </h2>
                            
                            <p className="text-gray-600 mb-6">
                                Select the foundation of your drink
                            </p>

                            {/* Container for options of base */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {drinkBases.map((base) => (
                                    <label
                                        key={base}
                                        className={`bg-[#f8f4e5] p-4 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                                            craftedDrink.base === base
                                                ? "ring-2 ring-[#3e2723] shadow-md"
                                                : ""
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="base"
                                            value={base}
                                            checked={craftedDrink.base === base}
                                            onChange={handleChange}
                                            className="sr-only"
                                        />
                                        
                                         {/* Container for each content */}
                                        <div className="flex flex-col items-center text-center">
                                            <span className="text-lg font-medium text-[#3e2723]">
                                                {base}
                                            </span>
                                            {base === "Espresso" && (
                                                <span className="text-sm text-gray-500">
                                                    Rich, strong coffee shot
                                                </span>
                                            )}
                                            
                                            {base === "Cold Brew" && (
                                                <span className="text-sm text-gray-500">
                                                    Smooth, less acidic coffee
                                                </span>
                                            )}
                                            
                                            {base === "Matcha" && (
                                                <span className="text-sm text-gray-500">
                                                    Earthy green tea powder
                                                </span>
                                            )}
                                            
                                            {base === "Tea" && (
                                                <span className="text-sm text-gray-500">
                                                    Black, green, or herbal
                                                </span>
                                            )}
                                            
                                            {base === "Chocolate" && (
                                                <span className="text-sm text-gray-500">
                                                    Rich cocoa base
                                                </span>
                                            )}
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                    

                    {/* Step 2: Choose Size */}
                    {currentStep === 2 && (
                        <div className="animate-fadeIn">
                            <h2 className="text-2xl font-semibold text-[#3e2723] mb-4">
                                Choose Your Size
                            </h2>
                            <p className="text-gray-600 mb-6">How much would you like?</p>

                            <div className="flex justify-center space-x-6">
                                {drinkSizes.map((size) => (
                                    <label
                                        key={size}
                                        className={`flex flex-col items-center cursor-pointer transition-all duration-200 ${
                                            craftedDrink.size === size
                                                ? "text-[#3e2723] font-medium"
                                                : "text-gray-500"
                                        }`}
                                    >
                                        <div
                                            className={`w-16 mb-2 flex items-end justify-center ${
                                                craftedDrink.size === size ? "scale-110" : ""
                                            }`}
                                        >
                                            <div
                                                className={`bg-[#e4c9a7] rounded-lg transition-all duration-200 ${
                                                    size === "Small"
                                                        ? "h-16 w-10"
                                                        : size === "Medium"
                                                        ? "h-20 w-12"
                                                        : "h-24 w-14"
                                                }`}
                                            ></div>
                                        </div>
                                        <input
                                            type="radio"
                                            name="size"
                                            value={size}
                                            checked={craftedDrink.size === size}
                                            onChange={handleChange}
                                            className="sr-only"
                                        />
                                        <span>{size}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                    

                    {/* Step 3: Milk Options */}
                    {currentStep === 3 && (
                        <div className="animate-fadeIn">
                            <h2 className="text-2xl font-semibold text-[#3e2723] mb-4">
                                Choose Your Milk
                            </h2>
                            <p className="text-gray-600 mb-6">Select milk type or choose none</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {milkOptions.map((milk) => (
                                    <label
                                        key={milk}
                                        className={`bg-[#f8f4e5] p-4 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                                            craftedDrink.milk === milk
                                                ? "ring-2 ring-[#3e2723] shadow-md"
                                                : ""
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="milk"
                                            value={milk}
                                            checked={craftedDrink.milk === milk}
                                            onChange={handleChange}
                                            className="sr-only"
                                        />
                                        <div className="flex items-center">
                                            <span className="ml-2 font-medium">{milk}</span>
                                            {milk !== "None" && milk !== "Whole Milk" && (
                                                <span className="ml-auto text-sm text-gray-500">
                                                    +₱{milk === "Soy Milk" ? "10" : "15"}
                                                </span>
                                            )}
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                    

                    {/* Step 4: Sweetener Options */}
                    {currentStep === 4 && (
                        <div className="animate-fadeIn">
                            <h2 className="text-2xl font-semibold text-[#3e2723] mb-4">
                                Choose Your Sweetener
                            </h2>
                            <p className="text-gray-600 mb-6">
                                How would you like to sweeten your drink?
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {sweetenerOptions.map((sweetener) => (
                                    <label
                                        key={sweetener}
                                        className={`bg-[#f8f4e5] p-4 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                                            craftedDrink.sweetener === sweetener
                                                ? "ring-2 ring-[#3e2723] shadow-md"
                                                : ""
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="sweetener"
                                            value={sweetener}
                                            checked={craftedDrink.sweetener === sweetener}
                                            onChange={handleChange}
                                            className="sr-only"
                                        />
                                        <div className="flex items-center">
                                            <span className="ml-2 font-medium">{sweetener}</span>
                                            {sweetener !== "None" && sweetener !== "Sugar" && (
                                                <span className="ml-auto text-sm text-gray-500">
                                                    +₱
                                                    {sweetener === "Honey" || sweetener === "Stevia"
                                                        ? "5"
                                                        : "10"}
                                                </span>
                                            )}
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}


                    {/* Step 5: Toppings */}
                    {currentStep === 5 && (
                        <div className="animate-fadeIn">
                            <h2 className="text-2xl font-semibold text-[#3e2723] mb-4">
                                Choose Your Toppings
                            </h2>
                            <p className="text-gray-600 mb-6">Add some extras on top (₱10 each)</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {toppingOptions.map((topping) => (
                                    <label
                                        key={topping}
                                        className={`bg-[#f8f4e5] p-4 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                                            craftedDrink.toppings.includes(topping)
                                                ? "ring-2 ring-[#3e2723] shadow-md"
                                                : ""
                                        }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={craftedDrink.toppings.includes(topping)}
                                            onChange={() =>
                                                handleCheckboxChange("toppings", topping)
                                            }
                                            className="sr-only"
                                        />
                                        <div className="flex items-center">
                                            <span className="ml-2 font-medium">{topping}</span>
                                            <span className="ml-auto text-sm text-gray-500">
                                                +₱10
                                            </span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}


                    {/* Step 6: Extras */}
                    {currentStep === 6 && (
                        <div className="animate-fadeIn">
                            <h2 className="text-2xl font-semibold text-[#3e2723] mb-4">
                                Choose Your Add-ins
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Enhance your drink's flavor (₱15 each)
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {extraOptions.map((extra) => (
                                    <label
                                        key={extra}
                                        className={`bg-[#f8f4e5] p-4 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                                            craftedDrink.extras.includes(extra)
                                                ? "ring-2 ring-[#3e2723] shadow-md"
                                                : ""
                                        }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={craftedDrink.extras.includes(extra)}
                                            onChange={() => handleCheckboxChange("extras", extra)}
                                            className="sr-only"
                                        />
                                        <div className="flex items-center">
                                            <span className="ml-2 font-medium">{extra}</span>
                                            <span className="ml-auto text-sm text-gray-500">
                                                +₱15
                                            </span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}


                    {/* Step 7: Temperature and Name */}
                    {currentStep === 7 && (
                        <div className="animate-fadeIn">
                            <h2 className="text-2xl font-semibold text-[#3e2723] mb-4">
                                Final Touches
                            </h2>

                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-[#3e2723] mb-2">
                                    Temperature
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {temperatureOptions.map((temp) => (
                                        <label
                                            key={temp}
                                            className={`bg-[#f8f4e5] p-4 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                                                craftedDrink.temperature === temp
                                                    ? "ring-2 ring-[#3e2723] shadow-md"
                                                    : ""
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="temperature"
                                                value={temp}
                                                checked={craftedDrink.temperature === temp}
                                                onChange={handleChange}
                                                className="sr-only"
                                            />
                                            <div className="flex items-center justify-center">
                                                <span className="font-medium">{temp}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-[#3e2723] mb-2">
                                    Name Your Creation
                                </h3>
                                <input
                                    type="text"
                                    name="name"
                                    value={craftedDrink.name}
                                    onChange={handleChange}
                                    placeholder="My Perfect Drink"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3e2723]"
                                />
                            </div>
                        </div>
                    )}
                    

                    {/* Navigation buttons */}
                    <div className="flex justify-between mt-8">
                        <button
                            onClick={prevStep}
                            disabled={currentStep === 1}
                            className={`px-6 py-2 rounded-lg ${
                                currentStep === 1
                                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                    : "bg-[#e4c9a7] text-[#3e2723] hover:bg-[#b5a397] hover:text-white"
                            } transition-colors`}
                        >
                            Previous
                        </button>

                        {currentStep < 7 ? (
                            <button
                                onClick={nextStep}
                                disabled={
                                    (currentStep === 1 && !craftedDrink.base) ||
                                    (currentStep === 2 && !craftedDrink.size) ||
                                    (currentStep === 3 && !craftedDrink.milk) ||
                                    (currentStep === 4 && !craftedDrink.sweetener) ||
                                    (currentStep === 7 && !craftedDrink.temperature)
                                }
                                className={`px-6 py-2 rounded-lg ${
                                    (currentStep === 1 && !craftedDrink.base) ||
                                    (currentStep === 2 && !craftedDrink.size) ||
                                    (currentStep === 3 && !craftedDrink.milk) ||
                                    (currentStep === 4 && !craftedDrink.sweetener) ||
                                    (currentStep === 7 && !craftedDrink.temperature)
                                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                        : "bg-[#3e2723] text-white hover:bg-[#5d4037]"
                                } transition-colors`}
                            >
                                Next
                            </button>
                        ) : (
                            <div className="flex gap-3">
                                <button
                                    onClick={addToCart}
                                    disabled={!craftedDrink.temperature}
                                    className={`px-6 py-2 rounded-lg ${
                                        !craftedDrink.temperature
                                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                            : "bg-[#e4c9a7] text-[#3e2723] hover:bg-[#b5a397] hover:text-white"
                                    } transition-colors flex items-center gap-2`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                    Add to Cart
                                </button>
                                <button
                                    onClick={buyNow}
                                    disabled={!craftedDrink.temperature}
                                    className={`px-6 py-2 rounded-lg ${
                                        !craftedDrink.temperature
                                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                            : "bg-[#3e2723] text-white hover:bg-[#5d4037]"
                                    } transition-colors`}
                                >
                                    Buy Now
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                


                {/* Drink Preview */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-2xl font-semibold text-[#3e2723] mb-4">Your Creation</h2>

                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-1/3 relative">
                            <div className="bg-[#f8f4e5] rounded-lg aspect-square flex items-center justify-center overflow-hidden">
                                {craftedDrink.base ? (
                                    <div className="relative w-1/2 h-3/4">
                                        <div
                                            className={`absolute inset-0 rounded-t-lg ${
                                                craftedDrink.temperature === "Hot"
                                                    ? "bg-[#B25D48]"
                                                    : craftedDrink.temperature === "Iced"
                                                    ? "bg-[#7BA0C9]"
                                                    : "bg-[#9C8277]"
                                            }`}
                                            style={{ height: "90%" }}
                                        ></div>
                                        <div
                                            className={`absolute inset-x-0 top-0 rounded-t-lg ${
                                                craftedDrink.base === "Espresso"
                                                    ? "bg-[#3A2218]"
                                                    : craftedDrink.base === "Cold Brew"
                                                    ? "bg-[#5D4037]"
                                                    : craftedDrink.base === "Matcha"
                                                    ? "bg-[#8BC34A]"
                                                    : craftedDrink.base === "Tea"
                                                    ? "bg-[#D1A067]"
                                                    : "bg-[#6D4C41]"
                                            }`}
                                            style={{ height: "30%" }}
                                        ></div>
                                        {craftedDrink.milk && craftedDrink.milk !== "None" && (
                                            <div
                                                className="absolute inset-x-0 bottom-0 bg-[#F5F5DC]"
                                                style={{ height: "30%" }}
                                            ></div>
                                        )}
                                        {craftedDrink.toppings.includes("Whipped Cream") && (
                                            <div className="absolute inset-x-0 -top-4 h-8 bg-white rounded-t-full"></div>
                                        )}
                                        {(craftedDrink.toppings.includes("Chocolate Drizzle") ||
                                            craftedDrink.toppings.includes("Caramel Drizzle")) && (
                                            <div className="absolute inset-x-0 top-0 flex justify-center">
                                                <div
                                                    className={`w-1/2 h-6 ${
                                                        craftedDrink.toppings.includes(
                                                            "Chocolate Drizzle"
                                                        )
                                                            ? "bg-[#3A2218]"
                                                            : "bg-[#C87F0E]"
                                                    } opacity-70 rounded-full`}
                                                ></div>
                                            </div>
                                        )}
                                        <div
                                            className="absolute inset-0 border-2 border-[#3e2723] rounded-t-lg"
                                            style={{ height: "90%" }}
                                        ></div>
                                        <div className="absolute inset-x-0 bottom-0 h-2 bg-[#3e2723] rounded-b-lg transform translate-y-full"></div>
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-center p-4">
                                        Select ingredients to see your drink
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="w-full md:w-2/3">
                            <h3 className="text-xl font-semibold text-[#3e2723] mb-2">
                                {craftedDrink.name || "Custom Drink"}
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mb-4">
                                {craftedDrink.base && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Base:</span>
                                        <span className="font-medium">{craftedDrink.base}</span>
                                    </div>
                                )}

                                {craftedDrink.size && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Size:</span>
                                        <span className="font-medium">{craftedDrink.size}</span>
                                    </div>
                                )}

                                {craftedDrink.milk && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Milk:</span>
                                        <span className="font-medium">{craftedDrink.milk}</span>
                                    </div>
                                )}

                                {craftedDrink.sweetener && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Sweetener:</span>
                                        <span className="font-medium">
                                            {craftedDrink.sweetener}
                                        </span>
                                    </div>
                                )}

                                {craftedDrink.temperature && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Temperature:</span>
                                        <span className="font-medium">
                                            {craftedDrink.temperature}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {craftedDrink.toppings.length > 0 && (
                                <div className="mb-3">
                                    <h4 className="text-sm font-semibold text-[#3e2723] mb-1">
                                        Toppings:
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {craftedDrink.toppings.map((topping) => (
                                            <span
                                                key={topping}
                                                className="bg-[#f8e8d0] text-[#3e2723] px-2 py-1 rounded-full text-xs"
                                            >
                                                {topping}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {craftedDrink.extras.length > 0 && (
                                <div className="mb-3">
                                    <h4 className="text-sm font-semibold text-[#3e2723] mb-1">
                                        Add-ins:
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {craftedDrink.extras.map((extra) => (
                                            <span
                                                key={extra}
                                                className="bg-[#f8e8d0] text-[#3e2723] px-2 py-1 rounded-full text-xs"
                                            >
                                                {extra}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Total Price */}
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-lg font-semibold text-[#3e2723]">
                                    Total Price:
                                </span>
                                <span className="text-xl font-bold text-[#3e2723]">
                                    ₱{craftedDrink.price}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Craft;
