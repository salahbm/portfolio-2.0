import { motion } from 'motion/react';

type WaveProps = {
  isMuted?: boolean;
};

// Analog waveform component with active and muted states
export default function Wave({ isMuted = false }: WaveProps) {
  // Define paths for active state (high amplitude waves)
  const activePaths = {
    main: 'M0 20 Q10 5, 20 20 T40 10 T60 25 T80 5 T100 20 T120 10 T140 25 T160 5 T180 20 T200 15',
    secondary: 'M0 20 Q15 15, 30 22 T60 18 T90 23 T120 15 T150 22 T180 17 T200 20',
    detail:
      'M0 20 Q5 18, 10 20 T20 21 T30 19 T40 20 T50 18 T60 20 T70 21 T80 19 T90 20 T100 18 T110 20 T120 21 T130 19 T140 20 T150 18 T160 20 T170 21 T180 19 T190 20 T200 18',
  };

  // Define paths for muted state (low amplitude, flat waves)
  const mutedPaths = {
    main: 'M0 20 Q10 18, 20 20 T40 22 T60 19 T80 21 T100 20 T120 22 T140 19 T160 21 T180 20 T200 21',
    secondary: 'M0 20 Q15 19, 30 20 T60 21 T90 19 T120 20 T150 21 T180 19 T200 20',
    detail:
      'M0 20 Q5 19.5, 10 20 T20 20.5 T30 19.5 T40 20 T50 20.5 T60 20 T70 19.5 T80 20 T90 20.5 T100 20 T110 19.5 T120 20 T130 20.5 T140 20 T150 19.5 T160 20 T170 20.5 T180 19.5 T190 20 T200 20.5',
  };

  return (
    <svg viewBox="0 0 200 40" className="w-1/2 h-full">
      {/* Main waveform */}
      <motion.path
        initial={{ d: isMuted ? mutedPaths.main : activePaths.main }}
        animate={{ d: isMuted ? mutedPaths.main : activePaths.main }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        stroke="#94a3b8"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.9"
      />

      {/* Secondary wave for analog feel */}
      <motion.path
        initial={{ d: isMuted ? mutedPaths.secondary : activePaths.secondary }}
        animate={{ d: isMuted ? mutedPaths.secondary : activePaths.secondary }}
        transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.1 }}
        stroke="#94a3b8"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* High frequency detail */}
      <motion.path
        initial={{ d: isMuted ? mutedPaths.detail : activePaths.detail }}
        animate={{ d: isMuted ? mutedPaths.detail : activePaths.detail }}
        transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.2 }}
        stroke="#94a3b8"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}
