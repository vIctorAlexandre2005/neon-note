// src/components/animations/FadeIn.tsx
import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
}

const fadeInVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const FadeIn: React.FC<FadeInProps> = ({ children }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={fadeInVariants}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
