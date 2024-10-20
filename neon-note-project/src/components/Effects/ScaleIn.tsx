// src/components/animations/ScaleIn.tsx
import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';

interface ScaleInProps {
  children: ReactNode;
}

const scaleInVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
};

const ScaleIn: React.FC<ScaleInProps> = ({ children }) => {
  return (
    <motion.div
      initial='hidden'
      animate='visible'
      exit='hidden'
      variants={scaleInVariants}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default ScaleIn;
