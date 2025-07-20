import { motion } from "framer-motion";
import { FaArrowRightLong } from "react-icons/fa6";

const Card = ({ width, start, hover = false }) => {
  return (
    <motion.div
      whileHover={{ padding: "25px" }}
      className={`
        ${width} p-5 rounded-2xl 
        ${hover ? "hover:bg-[#2c3e50] transition-colors duration-300 ease-in-out" : "bg-[#243447]"} 
        text-white min-h-60 flex flex-col justify-between shadow-md
      `}
    >
      <div className="w-full">
        <div className="w-full flex items-center justify-between">
          <h3 className="text-sm font-semibold tracking-wide uppercase text-cyan-300">
            Let’s Collaborate
          </h3>
          <FaArrowRightLong />
        </div>
        <h1 className="font-semibold text-2xl mt-4">
          Explore Opportunities
        </h1>
      </div>

      <div>
        {start ? (
          <div>
            <h1 className="mt-28 text-[10vh] font-semibold leading-none">
              Start a Project
            </h1>
            <button className="rounded-full mt-4 text-white px-6 py-2 border border-white hover:bg-white hover:text-[#2c3e50] transition">
              Contact Us
            </button>
          </div>
        ) : (
          <p className="text-sm mt-4 text-gray-300 font-medium leading-relaxed">
            Connect with top developers, build your network, and collaborate on real-world tech projects through DevConnect.
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default Card;
