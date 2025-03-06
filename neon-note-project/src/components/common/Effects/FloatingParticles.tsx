import { useContextGlobal } from "@/Context";
import { motion } from "framer-motion";
import { useState } from "react";

const FloatingParticles = () => {
  const [particles] = useState(
    Array.from({ length: 40 }, () => ({
      id: Math.random(),
      size: Math.random() * 8 + 2, // Tamanho entre 4px e 12px
      x: Math.random() * 100, // Posição inicial X aleatória
      delay: 0, // Atraso aleatório no início
      duration: Math.random() * 40, // Duração da animação entre 5 e 10 segundos
    }))
  );

  const { darkMode } = useContextGlobal();

  return (
    <div className="fixed">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            opacity: 0,
            x: `${particle.x}vw`,
            y: "100vh",
            scale: 0.5,
          }}
          animate={{
            opacity: [0, 2, 0],
            y: "-10vh",
            scale: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
          className={`z-50 ${darkMode ? 'bg-neon-400' : 'bg-neon-300'} rounded-full`}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
