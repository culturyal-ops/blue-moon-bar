import { motion, useReducedMotion } from 'framer-motion';
import CircularText from './CircularText';
import './CircularOverlay.css';

interface CircularOverlayProps {
  text?: string;
  spinDuration?: number;
}

export default function CircularOverlay({
  text = "BAR & KITCHEN · PALA · BLUE MOON · ",
  spinDuration = 22
}: CircularOverlayProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="circular-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 1 }}
      aria-hidden="true"
    >
      <CircularText
        text={text}
        spinDuration={shouldReduceMotion ? 0 : spinDuration}
        onHover="slowDown"
      />
    </motion.div>
  );
}
