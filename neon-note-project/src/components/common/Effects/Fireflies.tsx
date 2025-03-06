import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FirefliesProps {
  count: number;
}

const MotionBox = motion(Box);

export function Fireflies({ count }: FirefliesProps) {
  const [fireflies, setFireflies] = useState([]);

  useEffect(() => {
    const newFireflies = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // Posição horizontal aleatória
      y: Math.random() * 100, // Posição vertical aleatória
      delay: Math.random() * 5, // Delay para efeito aleatório
    }));
    setFireflies(newFireflies as []);
  }, [count]);

  return (
    <Box
      position='fixed'
      top={0}
      left={0}
      width='100vw'
      height='100vh'
      zIndex={1}
      pointerEvents='none'
    >
      {fireflies.map(({ id, x, y, delay }) => (
        <MotionBox
          key={id}
          position='absolute'
          left={`${x}vw`}
          top={`${y}vh`}
          width='6px'
          height='6px'
          borderRadius='50%'
          backgroundColor='blue.500'
          boxShadow='0 0 15px #fff'
          animate={{
            opacity: [0, 1, 0],
            scale: [0.6, 1.2, 0.6],
            x: [`${x}vw`, `${x + Math.random() * 5 - 2.5}vw`], // Pequeno deslocamento
            y: [`${y}vh`, `${y + Math.random() * 5 - 2.5}vh`], // Pequeno deslocamento
          }}
          transition={{
            duration: 1 + Math.random() * 3, // Tempo de animação variado
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay,
          }}
        />
      ))}
    </Box>
  );
}
