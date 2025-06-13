"use client";

import { motion } from "framer-motion";

const FadeInWhenVisible = ({ children, direction = "right", delay = 0, effect = "spring",className='' }) => {
  const variants = {
    hidden: {
      opacity: 0,
      x: direction === "right" ? 50 : direction === "left" ? -50 : 0,
      y: direction === "top" ? -50 : direction === "bottom" ? 50 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };

  // 🎨 Multiple Animation Effects
  const transitions = {
    easeOut: { duration: 0.6, ease: "easeOut", delay },
    easeInOut: { duration: 0.8, ease: "easeInOut", delay },
    spring: { type: "spring", stiffness: 100, damping: 12, delay },
    linear: { duration: 0.5, ease: "linear", delay },
    back: { type: "spring", stiffness: 150, damping: 10, delay }, // 🔥 Slight rubber band effect
    bounce: { type: "spring", stiffness: 200, damping: 5, delay }, // 🔥 Bouncy effect
    custom: { duration: 0.8, ease: [0.17, 0.67, 0.83, 0.67], delay }, // 🔥 Custom cubic-bezier curve
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={transitions[effect]}
      variants={variants}
      className={className}
      style={{zIndex:'9'}}
    >
      {children}
    </motion.div>
  );
};

export default FadeInWhenVisible;
