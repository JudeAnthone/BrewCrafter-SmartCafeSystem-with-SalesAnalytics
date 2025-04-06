import React from "react";
import HeroImage from "../assets/LOGO_brewcrafter.png";
import CraftImage from "../assets/food-sample.png";
import { motion } from "motion/react";

const Home = () => {
  // Animation variants for text elements
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  // Animation variants for buttons
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  };
  
  return (
    <div className="overflow-hidden">
      {/* SECTION 1 - Text Left, Image Right */}
      <section className="flex flex-col md:flex-row items-center justify-center min-h-[90vh] px-6 md:px-12 py-16">
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
            Brew and Craft Your <span className="text-[#b5a397]">Perfect</span> Cup
          </motion.h1>
          
          <motion.p 
            className="text-[#5d4037] text-xl leading-relaxed"
            variants={textVariants}
          >
            Immerse yourself in a world where coffee becomes art. Craft your coffee experience, just the way you like it.
          </motion.p>
          
          <motion.button 
            className="bg-[#e4c9a7] hover:bg-[#b5a397] text-[#3e2723] font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-md"
            variants={buttonVariants}
            whileHover="hover"
          >
            Explore Menu
          </motion.button>
        </motion.div>

        <motion.div
          className="mt-12 md:mt-0 md:ml-16"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <img 
            src={HeroImage} 
            alt="Coffee Hero" 
            className="w-[320px] md:w-[480px] drop-shadow-xl" 
          />
        </motion.div>
      </section>

      {/* Stylish Divider */}
      <div className="relative py-12 bg-gradient-to-r from-[#f8f4f0] via-white to-[#f8f4f0]">
        <div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-1/4 h-px bg-gradient-to-r from-transparent via-[#e4c9a7] to-transparent"></div>
        
        <div className="flex justify-center items-center">
          <div className="w-2 h-2 rounded-full bg-[#e4c9a7] mx-1"></div>
          <div className="w-3 h-3 rounded-full bg-[#d7ccc8] mx-1"></div>
          <div className="w-2 h-2 rounded-full bg-[#e4c9a7] mx-1"></div>
        </div>
        
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-1/4 h-px bg-gradient-to-r from-transparent via-[#e4c9a7] to-transparent"></div>
      </div>

      {/* SECTION 2 - Image Left, Text Right */}
      <section className="flex flex-col md:flex-row-reverse items-center justify-center min-h-[90vh] bg-[#f8f4f0] px-6 md:px-12 py-16">
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
            Experience <span className="text-[#a89f9c]">Art</span> in Every Sip
          </motion.h1>
          
          <motion.p 
            className="text-[#5d4037] text-xl leading-relaxed"
            variants={textVariants}
          >
            Indulge in a symphony of flavor notes and aromas that transform your coffee moment into an unforgettable craft experience.
          </motion.p>
          
          <motion.button 
            className="bg-[#d7ccc8] hover:bg-[#a89f9c] text-[#3e2723] font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-md"
            variants={buttonVariants}
            whileHover="hover"
          >
            Start Crafting
          </motion.button>
        </motion.div>

        <motion.div
          className="mt-12 md:mt-0 md:mr-16 order-first md:order-last"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
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
      
      {/* Footer accent */}
      <div className="h-12 bg-gradient-to-b from-[#f8f4f0] to-white"></div>
    </div>
  );
};

export default Home;