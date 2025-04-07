import React from "react";
import HeroImage from "../assets/LOGO_brewcrafter.png";
import CraftImage from "../assets/food-sample.png";
import { motion } from "framer-motion";
import Divider from "../components/Divider";
import Buttons from "../components/Buttons";


const Home = () => {
	// Animation variants for text elements
	const textVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.8, ease: "easeOut" },
		},
	};
    
	
	return (
		<div className="overflow-hidden">
            
			{/* SECTION 1 - Text Left, Image Right */}
			<section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center min-h-[90vh] px-6 md:px-12 py-16">
                
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
{/* SECTION 2 reusable button*/}
					<Buttons 
					text="Explore Menu"
					bgColor="bg-[#cc6d2d]"
					hoverColor="hover:bg-[#f8e8d0]"
					textColor="text-[#3e2723]"
					onClick={() => console.log("Explore Menu clicked!")}
					/>
					
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
            

			{/* DEVIDER */}
			<Divider/>
            

			{/* SECTION 2 - Image Left, Text Right */}
			<section className="flex flex-col md:flex-row-reverse items-center justify-center min-h-[90vh] bg-[#f8f4f0] px-6 md:px-12 py-16">
                
				{/* SECTION 2 text-div*/}
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
						Experience <span className="text-[#cc6d2d]">Art</span> in Every Sip
					</motion.h1>

					<motion.p
						className="text-[#5d4037] text-xl leading-relaxed"
						variants={textVariants}
					>
						Indulge in a symphony of flavor notes and aromas that transform your coffee
						moment into an unforgettable craft experience.
					</motion.p>

	{/* SECTION 2 reusable button*/}
					<Buttons 
					text="Start Crafting"
					bgColor="bg-[#cc6d2d]"
					hoverColor="hover:bg-[#f8e8d0]"
					textColor="text-[#3e2723]"
					onClick={() => console.log("Craft button is clicked!")}
					/>
					
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

			{/* Footer accent */}
			<div className="h-12 bg-gradient-to-b from-[#f8f4f0] to-white"></div>
		</div>
	);
};

export default Home;
