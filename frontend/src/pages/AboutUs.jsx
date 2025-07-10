import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaUserPlus, 
  FaSignInAlt, 
  FaCoffee, 
  FaShoppingCart, 
  FaUserShield, 
  FaChartBar, 
  FaCog,
  FaCreditCard  
} from 'react-icons/fa';
import Divider from "../components/Divider";

// about us images
import RegisterImg from "../assets/Screenshot 2025-06-18 155902.png";
import LoginImg from "../assets/Screenshot 2025-06-18 155935.png";
import MenuImg from "../assets/Screenshot 2025-06-18 160049.png";
import CraftImg from "../assets/Screenshot 2025-06-18 153806.png";
import OrderImg from "../assets/Screenshot 2025-06-18 160151.png";
import DashboardImg from "../assets/Screenshot 2025-06-18 160302.png";
import MenuMgmtImg from "../assets/Screenshot 2025-06-18 160343.png";
import OrderProcessImg from "../assets/Screenshot 2025-06-18 160421.png";
import SettingsImg from "../assets/Screenshot 2025-06-18 160449.png";

const AboutUs = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };
  
  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const customerSteps = [
    {
      icon: <FaUserPlus className="text-3xl" />,
      title: "1. Create an Account",
      description: "Sign up with your email, set a password, and verify through OTP sent to your email.",
      image: RegisterImg
    },
    {
      icon: <FaSignInAlt className="text-3xl" />,
      title: "2. Login Securely",
      description: "Access your account with email and password. After 5 failed attempts, verify with birthday and OTP.",
      image: LoginImg
    },
    {
      icon: <FaCoffee className="text-3xl" />,
      title: "3. Browse & Customize",
      description: "Explore our menu and customize your drinks with various options.",
      images: [MenuImg, CraftImg],
      dual: true
    },
    {
      icon: <FaShoppingCart className="text-3xl" />,
      title: "4. Place Order",
      description: "Add items to cart, review your order, and proceed to checkout.",
      image: OrderImg
    }
  ];

  const adminSteps = [
    {
      icon: <FaUserShield className="text-3xl" />,
      title: "1. Admin Authentication",
      description: "Secure login with IP verification and multi-factor authentication.",
      image: LoginImg
    },
    {
      icon: <FaChartBar className="text-3xl" />,
      title: "2. Dashboard Overview",
      description: "Monitor orders, sales, and customer activity in real-time.",
      image: DashboardImg
    },
    {
      icon: <FaCoffee className="text-3xl" />,
      title: "3. Menu Management",
      description: "Add, edit, or remove menu items and manage categories.",
      image: MenuMgmtImg
    },
    {
      icon: <FaShoppingCart className="text-3xl" />,
      title: "4. Order Processing",
      description: "View and manage incoming orders, track status, and update customers.",
      image: OrderProcessImg
    },
    {
      icon: <FaCog className="text-3xl" />,
      title: "5. System Settings",
      description: "Configure system preferences, user accounts, and security settings.",
      image: SettingsImg
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f4e5]">
      {/* Hero Section - User Manual */}
      <section className="bg-[#3e2723] text-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">BrewCrafter <span className="text-[#e4c9a7]">User Manual</span></h1>
            <p className="text-lg md:text-xl leading-relaxed text-[#e4c9a7]/90">
              A comprehensive guide to using the BrewCrafter system
            </p>
          </motion.div>
        </div>
      </section>


      {/* Customer Guide Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#3e2723] mb-4">
              Customer <span className="text-[#cc6d2d]">Guide</span>
            </h2>
            <p className="text-[#5d4037] max-w-2xl mx-auto">
              Follow these steps to order your perfect craft coffee
            </p>
          </motion.div>

          <motion.div 
            className="space-y-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerVariants}
          >
            {customerSteps.map((step, index) => (
              <motion.div 
                key={index}
                className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                variants={fadeIn}
              >
                <div className="md:w-1/2 space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#cc6d2d] to-[#e4c9a7] rounded-full flex items-center justify-center text-white mb-4 shadow-lg">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-[#3e2723]">{step.title}</h3>
                  <p className="text-[#5d4037] text-lg leading-relaxed">{step.description}</p>
                </div>
                <div className={`md:w-1/2 ${step.dual ? 'grid grid-cols-2 gap-4' : ''}`}>
                  {step.dual ? (
                    step.images.map((img, i) => (
                      <img 
                        key={i}
                        src={img} 
                        alt={`${step.title} - ${i + 1}`}
                        className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-[#e4c9a7] w-full h-auto"
                      />
                    ))
                  ) : (
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-[#e4c9a7] w-full h-auto"
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* Admin Guide Section */}
      <section className="py-20 px-6 bg-[#f8f4e5]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#3e2723] mb-4">
              Administrator <span className="text-[#cc6d2d]">Guide</span>
            </h2>
            <p className="text-[#5d4037] max-w-2xl mx-auto">
              Management and control features for system administrators
            </p>
          </motion.div>

          <motion.div 
            className="space-y-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerVariants}
          >
            {adminSteps.map((step, index) => (
              <motion.div 
                key={index}
                className="flex flex-col md:flex-row items-center gap-8 bg-[#f8f4e5] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                variants={fadeIn}
              >
                <div className="md:w-1/2 space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#3e2723] to-[#cc6d2d] rounded-full flex items-center justify-center text-white mb-4 shadow-lg">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-[#3e2723]">{step.title}</h3>
                  <p className="text-[#5d4037] text-lg leading-relaxed">{step.description}</p>
                </div>
                <div className="md:w-1/2">
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-[#e4c9a7] w-full h-auto"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Security Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#3e2723] mb-4">
              Security <span className="text-[#cc6d2d]">Features</span>
            </h2>
            <p className="text-[#5d4037] max-w-2xl mx-auto">
              Understanding our multi-layer security system
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* User Security */}
            <motion.div 
              className="bg-[#f8f4e5] p-8 rounded-2xl border border-[#e4c9a7]"
              variants={fadeIn}
            >
              <h3 className="text-2xl font-bold text-[#3e2723] mb-6">User Security</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <FaUserPlus className="text-[#cc6d2d] mt-1" />
                  <span className="text-[#5d4037]">Email verification with OTP during registration</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaSignInAlt className="text-[#cc6d2d] mt-1" />
                  <span className="text-[#5d4037]">Birthday verification after 5 failed login attempts</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCreditCard className="text-[#cc6d2d] mt-1" />
                  <span className="text-[#5d4037]">Secure payment processing</span>
                </li>
              </ul>
            </motion.div>

            {/* Admin Security */}
            <motion.div 
              className="bg-[#f8f4e5] p-8 rounded-2xl border border-[#e4c9a7]"
              variants={fadeIn}
            >
              <h3 className="text-2xl font-bold text-[#3e2723] mb-6">Admin Security</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <FaUserShield className="text-[#cc6d2d] mt-1" />
                  <span className="text-[#5d4037]">IP-based access restriction</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaSignInAlt className="text-[#cc6d2d] mt-1" />
                  <span className="text-[#5d4037]">Multi-factor authentication</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaCog className="text-[#cc6d2d] mt-1" />
                  <span className="text-[#5d4037]">Account lockout protection</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;