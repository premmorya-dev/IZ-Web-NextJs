export const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

export const scaleOnHover = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.97 }
};

export const glowOnHover = {
  whileHover: {
    boxShadow: "0 0 30px rgba(79,70,229,0.4)",
    borderColor: "rgba(79,70,229,0.6)"
  }
};

export const slideInLeft = {
  initial: { x: -60, opacity: 0 },
  animate: { x: 0, opacity: 1 }
};

export const slideInRight = {
  initial: { x: 60, opacity: 0 },
  animate: { x: 0, opacity: 1 }
};

export const scrollReveal = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: "easeOut" }
};

export const floatingLoop = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 5,
      ease: "easeInOut",
      repeat: Number.POSITIVE_INFINITY
    }
  }
};

export const softRotate = {
  animate: {
    rotate: [0, 2, 0, -2, 0],
    transition: {
      duration: 8,
      ease: "easeInOut",
      repeat: Number.POSITIVE_INFINITY
    }
  }
};
