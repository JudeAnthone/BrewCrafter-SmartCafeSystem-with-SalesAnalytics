import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";


const Craft = () => {
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
    
    // Base price (liquid based)
    const basePrices = {
      Espresso: 80,
      "Cold Brew": 90,
      Matcha: 100,
      Tea: 70,
      Chocolate: 85
    };
    
    // Size Multipliers
    const sizeMultipliers = {
      Small: 1,
      Medium: 1.25,
      Large: 1.5,
    };
    
    //Add-on prices (Milk based)
    const milkPrices = {
      "Whole Milk": 10,
      "Almond Milk": 15,
      "Oat Milk": 15,
      "Coconut Milk": 15,
      "Soy Milk": 10,
      None: 0,
    }
    
    // Sweetener Prices
    const sweetenerPrices = {
      Sugar: 0,
      Honey: 5,
      "Maple Syrup": 10,
      Stevia: 5,
      None: 0,
    }
    
    // Topings and Exteas
    const toppingPrice = 10; // per topping
    const extraPrice = 15; // per extra
    
    // Price calculation logic (if selected, same with others)
    if (craftedDrink.base && basePrices[craftedDrink.base]) {
      totalPrice += basePrices[craftedDrink.base];
    }
    
    // Size Multiplier
    if (craftedDrink.size && sizeMultipliers[craftedDrink.size]){
      totalPrice *= sizeMultipliers[craftedDrink.size];
    }
    
    // Milk prices
    if(craftedDrink.milk && milkPrices[craftedDrink.milk]){
      totalPrice += milkPrices[craftedDrink.milk];
    }
    
    // Sweetener prices
    if(craftedDrink.sweetener && sweetenerPrices[craftedDrink.sweetener]){
      totalPrice += sweetenerPrices[craftedDrink.sweetener];
    }
    
    // toppings and extras
    totalPrice += craftedDrink.toppings.length * toppingPrice;
    totalPrice += craftedDrink.extras.length * extraPrice;
    
    // Rounding to the nearest whole number
    totalPrice = Math.round(totalPrice);
    
    
    // updates the craftedDrink with its new prices 
    setCraftedDrink((prev) => ({...prev, price: totalPrice}));
  },[ // dependency array (use this if we have useEffect)
    craftedDrink.base,
    craftedDrink.size,
    craftedDrink.milk,
    craftedDrink.sweetener,
    craftedDrink.toppings,
    craftedDrink.extras,
  ]);
	
  const nextStep = () => {
    
  };
  
  const prevStep = () => {
    
  }
	
  const handleChange = () => {
    
  }
  
  const handleCheckboxChange = () => {
    
  }
  
  const addToCart = () => {
    
  }
  
  const buyNow = () => {
    
  }
  
  
  
  return (
	<div>NIGGA!</div>
  )
}

export default Craft