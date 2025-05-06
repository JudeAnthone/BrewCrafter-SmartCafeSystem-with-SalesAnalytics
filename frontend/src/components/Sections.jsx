import React from "react";
import { motion } from "framer-motion";

const Sections = ({ title, description, buttonText, buttonAction, image, reverse = false }) => {
	return (
		<section
			className={`flex flex-col ${
				reverse ? "md:flex-row-reverse" : "md:flex-row"
			} items-center justify-center min-h-[90vh] px-6 md:px-12 py-16`}
		>
			{/* Text Content */}
			<motion.div
				className="text-center md:text-left space-y-8 max-w-lg"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.3 }}
				transition={{ staggerChildren: 0.2 }}
			>
				<motion.h2
					className="text-5xl md:text-6xl font-bold text-[#3e2723] leading-tight"
					variants={{
						hidden: { opacity: 0, y: 20 },
						visible: {
							opacity: 1,
							y: 0,
							transition: { duration: 0.8, ease: "easeOut" },
						},
					}}
				>
					{title}
				</motion.h2>
				<motion.p
					className="text-[#5d4037] text-xl leading-relaxed"
					variants={{
						hidden: { opacity: 0, y: 20 },
						visible: {
							opacity: 1,
							y: 0,
							transition: { duration: 0.8, ease: "easeOut" },
						},
					}}
				>
					{description}
				</motion.p>
				<button
					className="bg-[#cc6d2d] text-[#3e2723] px-6 py-3 rounded-lg hover:bg-[#f8e8d0] transition-colors font-medium"
					onClick={buttonAction}
				>
					{buttonText}
				</button>
			</motion.div>

			{/* Image Content */}
			<motion.div
				className={`mt-12 md:mt-0 ${
					reverse ? "md:mr-16 order-first md:order-last" : "md:ml-16"
				}`}
				animate={{ y: [0, -10, 0] }}
				transition={{
					duration: 3,
					repeat: Infinity,
					repeatType: "loop",
					ease: "easeInOut",
				}}
				initial={{ opacity: 0, x: reverse ? -50 : 50 }}
				whileInView={{ opacity: 1, x: 0 }}
				viewport={{ once: true }}
			>
				<img
					src={image}
					alt="section-image"
					className="w-[320px] md:w-[480px] rounded-lg shadow-xl"
				/>
			</motion.div>
		</section>
	);
};

export default Sections;
