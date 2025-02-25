import { motion } from "framer-motion";
import React from "react";
import { FaRegLightbulb, FaUserFriends } from "react-icons/fa";
import { GiBookshelf } from "react-icons/gi";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { number: "500+", label: "Books Collection" },
    { number: "10K+", label: "Happy Readers" },
    { number: "100+", label: "Featured Authors" },
  ];

  return (
    <section className="min-h-screen bg-[#f7f7f7] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          ref={ref}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-6 relative inline-block">
            <span className="relative z-10">
              Our Literary Journey
              <GiBookshelf className="absolute -top-6 -right-8 text-4xl text-[#f39c12] transform rotate-12" />
            </span>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-[#f39c12]/30 -z-1" />
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Where Stories Come Alive and Minds Expand
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#f39c12] to-[#ffd700] rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000" />
            <div className="relative bg-white rounded-3xl p-8 shadow-xl h-full">
              <FaRegLightbulb className="text-4xl text-[#f39c12] mb-6" />
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Igniting Creativity Through Literature
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Welcome to our Book Library – your ultimate destination for
                discovering and indulging in the world of literature. Our
                mission is to fuel minds and spark creativity through an
                extensive collection of carefully curated books.
              </p>
            </div>
          </div>

          <div className="space-y-12">
            <div className="bg-white rounded-3xl p-8 shadow-xl border-l-4 border-[#f39c12]">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Curated Collections for Every Reader
              </h3>
              <p className="text-gray-600 leading-relaxed">
                With years of experience and a passion for excellence, we offer
                diverse range from timeless classics to modern masterpieces.
                Whether you're a casual reader or avid bibliophile, our
                collection inspires and engages.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#f39c12] to-[#ffd700] rounded-3xl p-8 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-4">Our Achievements</h3>
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold mb-2">{stat.number}</div>
                    <div className="text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#f39c12] to-[#ffd700] rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000" />
            <div className="relative bg-white rounded-3xl p-8 shadow-xl">
              <FaUserFriends className="text-4xl text-[#f39c12] mb-6" />
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Join Our Reading Community
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Experience the transformative power of reading in our vibrant
                community. Discover new worlds, exchange ideas, and grow with
                fellow book enthusiasts through our exclusive events and
                discussions.
              </p>
              <Link to="/register">
                <button
                  to="/register"
                  className="mt-6 px-8 py-3 bg-[#f39c12] text-white rounded-xl font-semibold hover:bg-[#e67e22] transition-colors shadow-lg"
                >
                  Become a Member
                </button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
                alt="Library"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform"
              />
            </div>
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1506880018603-83d5b814b5a6"
                alt="Reading"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform"
              />
            </div>
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl col-span-2">
              <img
                src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d"
                alt="Books"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
