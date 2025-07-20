import { useEffect, useState } from "react";
import { useScroll, useSpring, motion } from "framer-motion";

// Professional Images (engineers working on laptops)
const professionalImages = [
  {
    url: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=600",
    alt: "Software Engineer at work"
  },
  {
    url: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=600",
    alt: "ML Engineer coding"
  },
  {
    url: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=600",
    alt: "Developer team meeting"
  },
  {
    url: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=600",
    alt: "Backend developer on laptop"
  },
  {
    url: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=600",
    alt: "Tech architect working"
  },
  {
    url: "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=600",
    alt: "Frontend engineer focused"
  },
  {
    url: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=600",
    alt: "Software developer in office"
  },
  {
    url: "https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=600",
    alt: "Engineer working remotely"
  }
];

const LandingPage = () => {
  const { scrollYProgress } = useScroll();
  const scroll = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  const radius = 25;
  const centerX = 45;
  const centerY = 40;
  const imageSize = 140;

  const [imgData, setImgData] = useState(() =>
    professionalImages.map((img, i) => {
      const angle = (i / professionalImages.length) * 2 * Math.PI;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      return { ...img, x, y, scale: 1, opacity: 0.9 };
    })
  );

  useEffect(() => {
    return scroll.on("change", (latest) => {
      const progress = Math.min(latest * 2, 1);
      const updated = professionalImages.map((img, i) => {
        const angle = (i / professionalImages.length) * 2 * Math.PI;
        const fromX = centerX + radius * Math.cos(angle);
        const fromY = centerY + radius * Math.sin(angle);
        return {
          ...img,
          x: fromX + (50 - fromX) * progress,
          y: fromY + (50 - fromY) * progress,
          scale: 1.1 + 0.3 * progress,
          opacity: 0.9 + 0.1 * progress
        };
      });
      setImgData(updated);
    });
  }, [scroll]);

  return (
    <div className="w-full h-[150vh] relative bg-gradient-to-b from-[#182430] via-[#1e2d3a] to-[#1e2d3a] overflow-hidden">
      {/* Floating Developer Avatars */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {imgData.map((img, idx) => (
          <motion.div
            key={idx}
            className="absolute rounded-full border-4 border-white shadow-xl overflow-hidden"
            animate={{
              left: `${img.x}%`,
              top: `${img.y}%`,
              scale: img.scale,
              opacity: img.opacity
            }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            style={{
              width: `${imageSize}px`,
              height: `${imageSize}px`,
              transform: "translate(-50%, -50%)"
            }}
          >
            <img
              src={img.url}
              alt={img.alt}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>

      {/* Center Heading Content */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center text-white z-20 px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
          Dev<span className="text-cyan-400">Connect</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-2 max-w-xl">
          Connecting professionals across the tech world — seamlessly.
        </p>
        <p className="text-sm text-gray-400">
          Scroll down to see connections coming closer 👥
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
