import React from 'react';
import { motion } from 'framer-motion';
import { FaCoffee, FaLeaf, FaHandshake, FaUsers } from 'react-icons/fa';
import Divider from "../components/Divider";

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
  
  // Team members data
  const teamMembers = [
    {
      name: "Maria Santos",
      role: "Founder & Head Barista",
      bio: "With over 12 years of experience in specialty coffee, Maria brings passion and expertise to every cup. Her journey began in the coffee fields of Batangas, giving her unique insights into the entire coffee process.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Carlos Mendoza",
      role: "Coffee Sourcing Director",
      bio: "Carlos travels the world to find the finest coffee beans. His relationships with local farmers ensure ethical sourcing practices and the highest quality ingredients for our customers.",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Sophia Lee",
      role: "Creative Drink Designer",
      bio: "A culinary school graduate with a specialty in beverages, Sophia is the creative mind behind our unique drink menu. She constantly experiments with flavors to create memorable coffee experiences.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    }
  ];
  
  // Core values data
  const coreValues = [
    {
      icon: <FaCoffee className="text-3xl" />,
      title: "Quality Without Compromise",
      description: "We source only the finest beans and ingredients, ensuring every sip is exceptional."
    },
    {
      icon: <FaLeaf className="text-3xl" />,
      title: "Sustainability",
      description: "Our eco-friendly practices extend from bean sourcing to cup handling, minimizing our environmental footprint."
    },
    {
      icon: <FaHandshake className="text-3xl" />,
      title: "Community Connection",
      description: "We build lasting relationships with farmers, customers, and communities through fair practices."
    },
    {
      icon: <FaUsers className="text-3xl" />,
      title: "Inclusivity",
      description: "Creating a welcoming space where everyone feels comfortable enjoying great coffee."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f4e5]">
      {/* Hero Section */}
      <section className="bg-[#3e2723] text-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our <span className="text-[#e4c9a7]">Story</span></h1>
            <p className="text-lg md:text-xl leading-relaxed text-[#e4c9a7]/90">
              Brewing perfection one cup at a time since 2018
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex flex-col md:flex-row items-center gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              className="md:w-1/2"
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#3e2723] mb-6">The Journey of <span className="text-[#cc6d2d]">BrewCrafter</span></h2>
              <p className="text-[#5d4037] mb-4 leading-relaxed">
                BrewCrafter began with a simple vision: to transform the ordinary coffee experience into an extraordinary craft. Founded in 2018 by Maria Santos, our journey started in a small corner shop with just three coffee varieties and a passionate team of two.
              </p>
              <p className="text-[#5d4037] mb-4 leading-relaxed">
                What set us apart was our innovative approach to personalization. While other coffee shops offered standard menus, we pioneered the concept of "coffee crafting" – allowing customers to tailor every aspect of their beverage from bean selection to brewing method.
              </p>
              <p className="text-[#5d4037] leading-relaxed">
                Today, BrewCrafter has grown into a beloved destination for coffee enthusiasts who appreciate artisanal quality and creative freedom. Our commitment to excellence, sustainability, and innovation continues to drive everything we do.
              </p>
            </motion.div>
            <motion.div 
              className="md:w-1/2 rounded-2xl overflow-hidden shadow-xl border-4 border-[#e4c9a7]"
              variants={fadeIn}
            >
              {/* You can replace this with your actual coffee shop image */}
              <div className="aspect-video bg-[#cc6d2d]/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <FaCoffee className="text-8xl mx-auto text-[#cc6d2d] mb-4" />
                  <p className="text-[#3e2723] font-medium">Shop Image Placeholder</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* Core Values Section */}
      <section className="py-20 px-6 bg-[#f8f4e5]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#3e2723] mb-4">Our Core <span className="text-[#cc6d2d]">Values</span></h2>
            <p className="text-[#5d4037] max-w-2xl mx-auto">
              These principles guide every decision we make, from sourcing beans to serving our customers
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerVariants}
          >
            {coreValues.map((value, index) => (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-2xl shadow-md border border-[#e4c9a7] text-center"
                variants={fadeIn}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="w-16 h-16 bg-[#cc6d2d] rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-[#3e2723] mb-3">{value.title}</h3>
                <p className="text-[#5d4037]">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#3e2723] mb-4">Meet Our <span className="text-[#cc6d2d]">Team</span></h2>
            <p className="text-[#5d4037] max-w-2xl mx-auto">
              The passionate people behind every cup of BrewCrafter coffee
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerVariants}
          >
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                className="bg-[#f8f4e5] rounded-2xl overflow-hidden shadow-md border border-[#e4c9a7]"
                variants={fadeIn}
              >
                {/* Replace with actual team member images */}
                <div className="h-64 bg-[#cc6d2d]/20 relative overflow-hidden">
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="w-24 h-24 rounded-full bg-[#cc6d2d] flex items-center justify-center text-white text-4xl font-bold">
                        {member.name[0]}
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#3e2723]">{member.name}</h3>
                  <p className="text-[#cc6d2d] font-medium mb-3">{member.role}</p>
                  <p className="text-[#5d4037]">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="py-20 px-6 bg-[#f8f4e5]">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#3e2723] mb-4">Our <span className="text-[#cc6d2d]">Milestones</span></h2>
            <p className="text-[#5d4037] max-w-2xl mx-auto">
              The key moments in our journey to coffee excellence
            </p>
          </motion.div>

          <motion.div 
            className="relative border-l-4 border-[#cc6d2d] pl-10 ml-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerVariants}
          >
            {/* Timeline Items */}
            <motion.div 
              className="mb-12 relative"
              variants={fadeIn}
            >
              <div className="absolute -left-[3.25rem] w-10 h-10 bg-[#cc6d2d] rounded-full border-4 border-[#f8f4e5] flex items-center justify-center">
                <FaCoffee className="text-white" />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-[#e4c9a7]">
                <h3 className="text-xl font-bold text-[#3e2723] mb-1">2018</h3>
                <h4 className="text-[#cc6d2d] font-medium mb-3">Grand Opening</h4>
                <p className="text-[#5d4037]">BrewCrafter opened its doors in downtown Manila, introducing the innovative craft coffee concept.</p>
              </div>
            </motion.div>

            <motion.div 
              className="mb-12 relative"
              variants={fadeIn}
            >
              <div className="absolute -left-[3.25rem] w-10 h-10 bg-[#cc6d2d] rounded-full border-4 border-[#f8f4e5] flex items-center justify-center">
                <FaCoffee className="text-white" />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-[#e4c9a7]">
                <h3 className="text-xl font-bold text-[#3e2723] mb-1">2020</h3>
                <h4 className="text-[#cc6d2d] font-medium mb-3">Digital Transformation</h4>
                <p className="text-[#5d4037]">Launched our online ordering platform and custom drink builder, expanding our reach during challenging times.</p>
              </div>
            </motion.div>

            <motion.div 
              className="mb-12 relative"
              variants={fadeIn}
            >
              <div className="absolute -left-[3.25rem] w-10 h-10 bg-[#cc6d2d] rounded-full border-4 border-[#f8f4e5] flex items-center justify-center">
                <FaCoffee className="text-white" />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-[#e4c9a7]">
                <h3 className="text-xl font-bold text-[#3e2723] mb-1">2022</h3>
                <h4 className="text-[#cc6d2d] font-medium mb-3">Sustainability Partnership</h4>
                <p className="text-[#5d4037]">Formed key partnerships with local coffee farmers to ensure sustainable sourcing and fair trade practices.</p>
              </div>
            </motion.div>

            <motion.div 
              className="relative"
              variants={fadeIn}
            >
              <div className="absolute -left-[3.25rem] w-10 h-10 bg-[#cc6d2d] rounded-full border-4 border-[#f8f4e5] flex items-center justify-center">
                <FaCoffee className="text-white" />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-[#e4c9a7]">
                <h3 className="text-xl font-bold text-[#3e2723] mb-1">2023</h3>
                <h4 className="text-[#cc6d2d] font-medium mb-3">Expansion & Recognition</h4>
                <p className="text-[#5d4037]">Opened our second location and received "Best Craft Coffee Experience" award from Metro Manila Food Critics.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Visit Us Section */}
      <section className="py-20 px-6 bg-[#3e2723] text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex flex-col md:flex-row items-center gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              className="md:w-1/2"
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Visit <span className="text-[#e4c9a7]">BrewCrafter</span></h2>
              <p className="text-[#e4c9a7] mb-6 leading-relaxed">
                We'd love to welcome you to our coffee shops and share the BrewCrafter experience with you.
              </p>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3 text-[#e4c9a7]">Main Location</h3>
                <p className="mb-1">123 Coffee Street, Makati City</p>
                <p className="mb-1">Monday - Friday: 7am - 9pm</p>
                <p className="mb-3">Saturday - Sunday: 8am - 10pm</p>
                <p>Contact: (02) 8123-4567</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#e4c9a7]">Downtown Branch</h3>
                <p className="mb-1">456 Brew Avenue, BGC, Taguig</p>
                <p className="mb-1">Monday - Friday: 7am - 8pm</p>
                <p className="mb-3">Saturday - Sunday: 8am - 9pm</p>
                <p>Contact: (02) 8987-6543</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2 rounded-2xl overflow-hidden shadow-xl"
              variants={fadeIn}
            >
              {/* Replace with an actual map or store image */}
              <div className="aspect-square bg-[#5d4037] flex items-center justify-center p-8">
                <div className="text-center">
                  <FaUsers className="text-8xl mx-auto text-[#e4c9a7] mb-4" />
                  <p className="text-[#e4c9a7] text-xl font-medium">Store Map Placeholder</p>
                  <p className="text-[#e4c9a7]/80 mt-4">
                    In your final implementation, you can embed a Google Maps location here
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;