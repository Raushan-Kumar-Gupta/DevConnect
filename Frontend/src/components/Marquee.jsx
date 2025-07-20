import { motion } from "framer-motion";

const Marquee = ({ imgurl, direction = "left" }) => {
  const animation = {
    initial: { x: direction === "left" ? "0%" : "-100%" },
    animate: { x: direction === "left" ? "-100%" : "0%" },
    transition: {
      ease: "linear",
      duration: 20,
      repeat: Infinity
    }
  };

  // Combined logos to repeat them naturally
  const combinedLogos = [...imgurl, ...imgurl];

  return (
    <div className="overflow-hidden w-full">
      <motion.div
        {...animation}
        className="flex gap-16 py-6 w-fit"
      >
        {combinedLogos.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`logo-${index}`}
            className="h-10 md:h-12 w-auto object-contain opacity-90 hover:opacity-100 transition duration-300"
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
