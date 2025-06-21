import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HeroImage from "../assets/LOGO_brewcrafter.png";
import CraftImage from "../assets/Screenshot 2025-06-18 153806.png";
import Divider from "../components/Divider";
import Buttons from "../components/Buttons";
import { FaCoffee, FaLeaf, FaCog } from "react-icons/fa";  

// Import your asset images
import BerryBlastImg from "../assets/Screenshot 2025-06-10 005509.png";
import MatchaFrappeImg from "../assets/Screenshot 2025-06-10 003427.png";
import CaramelLatteImg from "../assets/Screenshot 2025-06-09 234939.png";
import PremiumImg from "../assets/Screenshot 2025-06-18 154843.png";
import CustomImg from "../assets/Screenshot 2025-06-18 153806.png";
import SustainableImg from "../assets/Screenshot 2025-06-18 155055.png";

const Home = () => {
  const navigate = useNavigate();

  // Animation variants for text elements
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Animation variants for features
  const featureVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Animation variants for sliding in from sides
  const slideInLeftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const slideInRightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: "Jude Anthone Duarte",
      quote: "I absolutely love the ability to craft my own coffee! BrewCrafter has changed my morning routine completely.",
      role: "Regular Customer",
    },
    {
      id: 2,
      name: "Jude Anthone Duarte",
      quote: "The best coffee shop in town. Their custom drinks are unmatched in flavor and quality.",
      role: "Coffee Enthusiast",
    },
    {
      id: 3,
      name: "Jude Anthone Duarte",
      quote: "I visit BrewCrafter at least three times a week. Their craft options let me try something new every time!",
      role: "Loyal Customer",
    },
  ];
  

  // Popular drinks data
  const popularDrinks = [
    {
      name: "Berry Blast Smoothie",
      description: "Mixed berries with Greek yogurt and honey.",
      price: "₱160",
      image: BerryBlastImg,
    },
    {
      name: "Matcha Frappe",
      description: "Creamy matcha green tea blended with ice and milk.",
      price: "₱140",
      image: MatchaFrappeImg,
    },
    {
      name: "Caramel Latte",
      description: "Sweet espresso with caramel syrup and steamed milk.",
      price: "₱120",
      image: CaramelLatteImg,
    },
  ];
  

  return (
    <div className="overflow-hidden">
      {/* SECTION 1 - Hero Section */}
      <section
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center min-h-[90vh] px-6 md:px-12 py-16"
        id="hero-section"
        aria-label="Hero Section"
      >
        {/* SECTION 1 text-div*/}
        <motion.div
          className="text-center md:text-left space-y-8 max-w-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-[#3e2723] leading-tight"
            variants={textVariants}
          >
            Brew and Craft Your <span className="text-[#cc6d2d]">Perfect</span> Cup!
          </motion.h1>

          <motion.p
            className="text-[#5d4037] text-xl leading-relaxed"
            variants={textVariants}
          >
            Immerse yourself in a world where coffee becomes art. Craft your coffee
            experience, just the way you like it.
          </motion.p>


          {/* SECTION 1 reusable button*/}
          <motion.div variants={textVariants}>
            <Buttons
              text="Explore Menu"
              bgColor="bg-[#cc6d2d]"
              hoverColor="hover:bg-[#3e2723]"
              textColor="text-white"
              onClick={() => navigate("/menu")}
            />
          </motion.div>
        </motion.div>


        {/* SECTION 1 img-div*/}
        <motion.div
          className="mt-12 md:mt-0 md:ml-16"
          animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
          initial={{ opacity: 1, x: 0 }}
        >
          <img
            src={HeroImage}
            alt="Coffee Hero"
            className="w-[320px] md:w-[480px] drop-shadow-xl"
          />
        </motion.div>
      </section>


      {/* DIVIDER */}
      <Divider />


      {/* SECTION 2 - Craft Experience */}
      <section className="flex flex-col md:flex-row-reverse items-center justify-center min-h-[90vh] bg-[#f8f4f0] px-6 md:px-12 py-16">
        {/* SECTION 2 text-div*/}
        <motion.div
          className="text-center md:text-left space-y-8 max-w-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-[#3e2723] leading-tight"
            variants={textVariants}
          >
            Experience <span className="text-[#cc6d2d]">Art</span> in Every Sip
          </motion.h2>

          <motion.p
            className="text-[#5d4037] text-xl leading-relaxed"
            variants={textVariants}
          >
            Indulge in a symphony of flavor notes and aromas that transform your coffee
            moment into an unforgettable craft experience.
          </motion.p>

          {/* SECTION 2 reusable button*/}
          <motion.div variants={textVariants}>
            <Buttons
              text="Start Crafting"
              bgColor="bg-[#cc6d2d]"
              hoverColor="hover:bg-[#3e2723]"
              textColor="text-white"
              onClick={() => navigate("/craft")}
            />
          </motion.div>
        </motion.div>

        {/* SECTION 2 img-div*/}
        <motion.div
          className="mt-12 md:mt-0 md:mr-16 order-first md:order-last"
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <img
            src={CraftImage}
            alt="craft-content-img"
            className="w-[320px] md:w-[480px] rounded-lg shadow-xl"
          />
        </motion.div>
      </section>



      {/* NEW SECTION 3 - Features (Why Choose BrewCrafter) */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2
              className="text-4xl font-bold text-[#3e2723] mb-4"
              variants={textVariants}
            >
              Why Choose <span className="text-[#cc6d2d]">BrewCrafter</span>
            </motion.h2>
            <motion.p className="text-[#5d4037] text-lg max-w-2xl mx-auto" variants={textVariants}>
              We're not just another coffee shop. Discover what makes our craft coffee experience special.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.2 }}
          >
            {/* Image 1 - Premium Ingredients */}
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-md border border-[#e4c9a7] group min-h-[380px] flex flex-col justify-end"
              variants={featureVariants}
            >
              <img
                src={PremiumImg}
                alt="Premium Ingredients"
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="relative z-10 bg-gradient-to-t from-[#fff8] via-[#fff6] to-[#fff0] p-8 pt-32 text-center">
                <h3 className="text-2xl font-bold text-[#3e2723] mb-3 drop-shadow">Premium Ingredients</h3>
                <p className="text-[#5d4037] font-medium drop-shadow">
                  We source only the finest coffee beans and ingredients, ensuring a premium experience with every sip.
                </p>
              </div>
            </motion.div>

            {/* Image 2 - Custom Crafting */}
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-md border border-[#e4c9a7] group min-h-[380px] flex flex-col justify-end"
              variants={featureVariants}
            >
              <img
                src={CustomImg}
                alt="Custom Crafting"
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="relative z-10 bg-gradient-to-t from-[#fff8] via-[#fff6] to-[#fff0] p-8 pt-32 text-center">
                <h3 className="text-2xl font-bold text-[#3e2723] mb-3 drop-shadow">Custom Crafting</h3>
                <p className="text-[#5d4037] font-medium drop-shadow">
                  Create your perfect drink with our intuitive customization options. Your coffee, your way.
                </p>
              </div>
            </motion.div>

            {/* Image 3 - Sustainable Practices */}
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-md border border-[#e4c9a7] group min-h-[380px] flex flex-col justify-end"
              variants={featureVariants}
            >
              <img
                src={SustainableImg}
                alt="Sustainable Practices"
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="relative z-10 bg-gradient-to-t from-[#fff8] via-[#fff6] to-[#fff0] p-8 pt-32 text-center">
                <h3 className="text-2xl font-bold text-[#3e2723] mb-3 drop-shadow">Sustainable Practices</h3>
                <p className="text-[#5d4037] font-medium drop-shadow">
                  We're committed to eco-friendly practices from bean to cup, ensuring a positive impact on our community.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    
    
      {/* NEW SECTION 4 - Popular Drinks */}
      <section className="py-20 px-6 bg-[#f8f4f0]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2
              className="text-4xl font-bold text-[#3e2723] mb-4"
              variants={textVariants}
            >
              Most <span className="text-[#cc6d2d]">Popular</span> Drinks
            </motion.h2>
            <motion.p className="text-[#5d4037] text-lg max-w-2xl mx-auto" variants={textVariants}>
              Customer favorites that keep people coming back for more
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularDrinks.map((drink, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-[#e4c9a7]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={index % 2 === 0 ? slideInLeftVariants : slideInRightVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="h-64 flex items-center justify-center bg-gray-100">
                  <img
                    src={drink.image}
                    alt={drink.name}
                    className="object-contain h-48"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-[#3e2723] mb-2">{drink.name}</h3>
                  <p className="text-[#5d4037] mb-2">{drink.description}</p>
                  <div className="text-[#cc6d2d] font-bold text-lg mb-4">{drink.price}</div>
                  <button 
                    className="text-[#cc6d2d] font-semibold hover:text-[#3e2723] transition-colors border border-[#cc6d2d] px-4 py-2 rounded-full"
                    onClick={() => navigate("/menu")}
                  >
                    Order Now →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={textVariants}
          >
            <button
              className="bg-[#cc6d2d] hover:bg-[#3e2723] text-white font-semibold px-8 py-3 rounded-full transition duration-300 shadow-md hover:shadow-lg"
              onClick={() => navigate("/menu")}
            >
              View Full Menu
            </button>
          </motion.div>
        </div>
      </section>



      {/* NEW SECTION 5 - Testimonials */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2
              className="text-4xl font-bold text-[#3e2723] mb-4"
              variants={textVariants}
            >
              What Our <span className="text-[#cc6d2d]">Customers</span> Say
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="bg-[#f8f4e5] p-8 rounded-2xl shadow-md border border-[#e4c9a7] relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={featureVariants}
                transition={{ delay: index * 0.2 }}
              >
                <div className="absolute -top-5 left-8 text-6xl text-[#cc6d2d] opacity-30">"</div>
                <p className="text-[#5d4037] mb-6 relative z-10">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#cc6d2d] rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-[#3e2723]">{testimonial.name}</p>
                    <p className="text-sm text-[#5d4037]">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Footer */}
      <section className="py-24 px-6 bg-[#3e2723] text-white">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            variants={textVariants}
          >
            Ready to Craft Your <span className="text-[#e4c9a7]">Perfect Cup</span>?
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl mb-10 text-[#e4c9a7]"
            variants={textVariants}
          >
            Join thousands of coffee lovers who have discovered their perfect brew with BrewCrafter
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={textVariants}
          >
            <Buttons
              text="Start Crafting"
              bgColor="bg-[#cc6d2d]"  
              hoverColor="hover:bg-[#e4c9a7]"
              textColor="text-white"
              onClick={() => navigate("/craft")}
            />
            <Buttons
              text="Browse Menu"
              bgColor="bg-transparent"
              hoverColor="hover:bg-[#5d4037]"
              textColor="text-white"
              extraClasses="border-2 border-[#e4c9a7]"
              onClick={() => navigate("/menu")}
            />
          </motion.div>
        </motion.div>
      </section>


      {/* Footer accent */}
      <div className="h-12 bg-gradient-to-b from-[#3e2723] to-[#5d4037]"></div>
    </div>
  );
};

export default Home;
