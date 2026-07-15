export const fadeInUp = {
  from: {
    opacity: 0,
    y: 30,
  },
  to: {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: [0.33, 1, 0.68, 1],
  },
};

export const fadeInLeft = {
  from: {
    opacity: 0,
    x: -50,
  },
  to: {
    opacity: 1,
    x: 0,
    duration: 0.8,
    ease: [0.33, 1, 0.68, 1],
  },
};

export const fadeInRight = {
  from: {
    opacity: 0,
    x: 50,
  },
  to: {
    opacity: 1,
    x: 0,
    duration: 0.8,
    ease: [0.33, 1, 0.68, 1],
  },
};

export const scaleIn = {
  from: {
    opacity: 0,
    scale: 0.8,
  },
  to: {
    opacity: 1,
    scale: 1,
    duration: 0.6,
    ease: [0.34, 1.56, 0.64, 1],
  },
};

export const staggerChildren = {
  children: true,
  stagger: 0.1,
};

export const cardHoverAnimation = {
  hover: {
    y: -8,
    borderColor: '#996600',
    boxShadow: '0 20px 40px rgba(0, 51, 102, 0.3)',
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  tap: {
    scale: 0.98,
  },
};

export const buttonHoverAnimation = {
  hover: {
    y: -3,
    boxShadow: '0 8px 30px rgba(153, 102, 0, 0.6)',
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  tap: {
    scale: 0.98,
  },
};

export const pageTransitionVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const listItemVariants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
    },
  }),
};

export const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
  hover: {
    y: -8,
    borderColor: '#996600',
    boxShadow: '0 20px 40px rgba(0, 51, 102, 0.3)',
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const floatAnimation = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: [0.4, 0, 0.6, 1],
    },
  },
};

export const pulseGlowAnimation = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(153, 102, 0, 0.4)',
      '0 0 40px rgba(153, 102, 0, 0.8)',
      '0 0 20px rgba(153, 102, 0, 0.4)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: [0.4, 0, 0.6, 1],
    },
  },
};
