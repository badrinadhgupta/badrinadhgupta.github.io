"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DomeGallery from "@/components/cool_components/DomeGallery";

// Types
type GameState = "greeting" | "q1" | "q2" | "q3" | "q4" | "celebration";
type WrongAnswerEffect = "blackhole" | "crying" | "monster" | null;

// Floating Hearts Background Component (only for greeting screen)
function FloatingHearts() {
  const [hearts, setHearts] = useState<Array<{id: number; x: number; delay: number; duration: number; size: number}>>([]);
  
  useEffect(() => {
    setHearts(Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      size: 16 + Math.random() * 24,
    })));
  }, []);

  if (hearts.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-pink-400/40"
          style={{
            left: `${heart.x}%`,
            fontSize: heart.size,
          }}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{
            y: "-100vh",
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}

// Themed emoji sets for each question
const questionEmojis: Record<string, string[]> = {
  q1: ["🤪", "😜", "🥴", "🤓", "😎", "🤡", "👻", "🙈", "🐸", "🦄", "🌈", "✨", "🎪", "🎭", "🎈"], // Silly/fun
  q2: ["😊", "😄", "🥰", "😍", "🤗", "💖", "💕", "💗", "🌸", "🌺", "🦋", "🌈", "⭐", "✨", "🎀"], // Sweet/happy
  q3: ["👑", "💎", "🌟", "⭐", "✨", "🔥", "💫", "🏆", "💅", "😏", "🦄", "🌈", "💖", "🎭", "🪩"], // Confident/sparkly
  q4: ["💘", "💝", "💖", "💗", "💓", "💞", "💕", "❤️", "🥰", "😍", "🌹", "🌸", "💐", "🦋", "✨"], // Romantic/valentine
};

type EmojiState = "floating" | "frozen" | "sucking";
type EffectType = "blackhole" | "crying" | "monster" | null;

function FloatingFunnyEmojis({ 
  state = "floating", 
  question = "q1",
  effectType = null,
}: { 
  state?: EmojiState;
  question?: string;
  effectType?: EffectType;
}) {
  // Get the emoji set for current question
  const emojiSet = questionEmojis[question] || questionEmojis.q1;
  
  // Pre-calculate emojis with their center offsets - regenerate when question changes
  const [emojis, setEmojis] = useState<ReturnType<typeof generateEmojis>>([]);
  const [mounted, setMounted] = useState(false);
  
  // Initialize emojis only on client side to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    setEmojis(generateEmojis(questionEmojis[question] || questionEmojis.q1));
  }, []);
  
  // Regenerate emojis when question changes
  useEffect(() => {
    if (mounted && state === "floating") {
      setEmojis(generateEmojis(questionEmojis[question] || questionEmojis.q1));
    }
  }, [question, state, mounted]);
  
  function generateEmojis(emojiList: string[]) {
    return Array.from({ length: 25 }, (_, i) => {
      const x = Math.random() * 80 + 10; // 10-90%
      const y = Math.random() * 80 + 10; // 10-90%
      return {
        id: i,
        x,
        y,
        emoji: emojiList[i % emojiList.length],
        size: 24 + Math.random() * 20,
        duration: 4 + Math.random() * 3,
        delay: Math.random() * 2,
        floatRange: 30 + Math.random() * 40,
        suckDelay: i * 0.03,
        centerOffsetX: (50 - x),
        centerOffsetY: (50 - y),
      };
    });
  }

  // When sucking, emojis need to be ABOVE the black hole overlay (z-40), so use z-50
  const zIndex = state === "sucking" ? "z-50" : "z-10";

  // Get sucking animation based on effect type
  const getSuckingAnimation = (emoji: typeof emojis[0], toCenterX: number, toCenterY: number) => {
    const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
    
    switch (effectType) {
      case "crying":
        // Fall DOWN like rain (emojis will transform to crying)
        return {
          y: vh - (emoji.y / 100) * vh + 200, // Fall to bottom and beyond
          x: (Math.random() - 0.5) * 50,
          scale: 1,
          opacity: [1, 1, 0.5],
          rotate: 0,
        };
      case "monster":
        // Shatter outward from center (for mirror crack effect)
        const vw = typeof window !== 'undefined' ? window.innerWidth : 1000;
        const directionX = emoji.x > 50 ? 1 : -1;
        const directionY = emoji.y > 50 ? 1 : -1;
        return {
          x: directionX * (150 + Math.random() * 200),
          y: directionY * (150 + Math.random() * 200) + vh * 0.3,
          scale: 0,
          opacity: 0,
          rotate: directionX * 360,
        };
      case "blackhole":
      default:
        // Spiral to center
        return {
          x: toCenterX,
          y: toCenterY,
          scale: 0,
          opacity: 0,
          rotate: 1080,
        };
    }
  };

  // For crying effect, transform emojis to crying face
  const getDisplayEmoji = (originalEmoji: string) => {
    if (state === "sucking" && effectType === "crying") {
      return "😢";
    }
    return originalEmoji;
  };

  // Don't render until client-side initialization
  if (emojis.length === 0) return null;

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${zIndex}`}>
      {emojis.map((emoji) => {
        // Calculate actual pixel offset to center based on viewport
        const toCenterX = (emoji.centerOffsetX / 100) * (typeof window !== 'undefined' ? window.innerWidth : 1000);
        const toCenterY = (emoji.centerOffsetY / 100) * (typeof window !== 'undefined' ? window.innerHeight : 800);
        
        return (
          <motion.div
            key={emoji.id}
            className="absolute"
            style={{
              left: `${emoji.x}%`,
              top: `${emoji.y}%`,
              fontSize: emoji.size,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={
              state === "sucking" 
                ? getSuckingAnimation(emoji, toCenterX, toCenterY)
                : state === "frozen"
                ? {
                    // Just set opacity/scale, DON'T touch x/y so they stay in place
                    opacity: 1,
                    scale: 1,
                  }
                : {
                    // Floating animation
                    opacity: [0.5, 0.9, 0.5],
                    scale: [0.9, 1.1, 0.9],
                    y: [-emoji.floatRange / 2, emoji.floatRange / 2, -emoji.floatRange / 2],
                    x: [-15, 15, -15],
                    rotate: [-10, 10, -10],
                  }
            }
            transition={
              state === "sucking"
                ? {
                    duration: effectType === "crying" ? 2.0 : effectType === "monster" ? 1.0 : 1.5,
                    delay: emoji.suckDelay,
                    ease: effectType === "crying" ? "easeIn" : [0.4, 0, 0.8, 1],
                  }
                : state === "frozen"
                ? { 
                    duration: 0.1,
                  }
                : {
                    duration: emoji.duration,
                    delay: emoji.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
          >
            {getDisplayEmoji(emoji.emoji)}
          </motion.div>
        );
      })}
    </div>
  );
}

// Greeting Screen Component
function GreetingScreen({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen gap-8 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      {/* Background images in different positions */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Top left */}
        <motion.img 
          src="/images2/Di.webp" 
          alt="" 
          className="absolute top-2 left-2 w-48 h-48 md:w-72 md:h-72 object-contain rounded-2xl"
          initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
          animate={{ 
            opacity: 1, 
            scale: [1, 1.05, 1],
            rotate: [-8, -3, -8],
            y: [0, -10, 0],
          }}
          transition={{ 
            opacity: { delay: 0.5, duration: 0.8 },
            scale: { delay: 0.5, duration: 3, repeat: Infinity, ease: "easeInOut" },
            rotate: { delay: 0.5, duration: 3, repeat: Infinity, ease: "easeInOut" },
            y: { delay: 0.5, duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
        />
        {/* Top right */}
        <motion.img 
          src="/images2/Di2.webp" 
          alt="" 
          className="absolute top-2 right-2 w-48 h-48 md:w-72 md:h-72 object-contain rounded-2xl"
          initial={{ opacity: 0, scale: 0.5, rotate: 15 }}
          animate={{ 
            opacity: 1, 
            scale: [1, 1.08, 1],
            rotate: [8, 3, 8],
            x: [0, 8, 0],
          }}
          transition={{ 
            opacity: { delay: 0.7, duration: 0.8 },
            scale: { delay: 0.7, duration: 2.5, repeat: Infinity, ease: "easeInOut" },
            rotate: { delay: 0.7, duration: 2.5, repeat: Infinity, ease: "easeInOut" },
            x: { delay: 0.7, duration: 2.5, repeat: Infinity, ease: "easeInOut" },
          }}
        />
        {/* Bottom left */}
        <motion.img 
          src="/images2/Di3.webp" 
          alt="" 
          className="absolute bottom-2 left-2 w-48 h-48 md:w-72 md:h-72 object-contain rounded-2xl"
          initial={{ opacity: 0, scale: 0.5, rotate: 15 }}
          animate={{ 
            opacity: 1, 
            scale: [1, 1.06, 1],
            rotate: [5, 10, 5],
            x: [0, -8, 0],
            y: [0, 8, 0],
          }}
          transition={{ 
            opacity: { delay: 0.9, duration: 0.8 },
            scale: { delay: 0.9, duration: 2.8, repeat: Infinity, ease: "easeInOut" },
            rotate: { delay: 0.9, duration: 2.8, repeat: Infinity, ease: "easeInOut" },
            x: { delay: 0.9, duration: 2.8, repeat: Infinity, ease: "easeInOut" },
            y: { delay: 0.9, duration: 2.8, repeat: Infinity, ease: "easeInOut" },
          }}
        />
        {/* Bottom right */}
        <motion.img 
          src="/images2/Di4.webp" 
          alt="" 
          className="absolute bottom-2 right-2 w-48 h-48 md:w-72 md:h-72 object-contain rounded-2xl"
          initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
          animate={{ 
            opacity: 1, 
            scale: [1, 1.1, 1],
            rotate: [-5, -12, -5],
            y: [0, 12, 0],
          }}
          transition={{ 
            opacity: { delay: 1.1, duration: 0.8 },
            scale: { delay: 1.1, duration: 2.2, repeat: Infinity, ease: "easeInOut" },
            rotate: { delay: 1.1, duration: 2.2, repeat: Infinity, ease: "easeInOut" },
            y: { delay: 1.1, duration: 2.2, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      </div>

      <motion.h1
        className="text-6xl md:text-8xl font-bold text-rose-700 z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
      >
        Hi Dinuuuuuu <span className="text-yellow-500">💛</span>
      </motion.h1>

      <motion.p
        className="text-2xl md:text-3xl text-rose-600/80 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Answer these questions for me plss....
      </motion.p>

      <motion.button
        className="mt-8 px-12 py-4 bg-rose-500 hover:bg-rose-600 text-white text-2xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
      >
        Ask meeeeee
      </motion.button>
    </motion.div>
  );
}

// Black Hole Effect Component (emojis are handled by FloatingFunnyEmojis with "sucking" state)
function BlackHoleEffect({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"sucking" | "angry">("sucking");

  useEffect(() => {
    // Phase 1: Black hole visual (2s)
    // Phase 2: Message appears for 3 seconds
    const angryTimer = setTimeout(() => setPhase("angry"), 2000);
    const completeTimer = setTimeout(onComplete, 5000); // 2000 + 3000 = 3 seconds for message
    return () => {
      clearTimeout(angryTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Dark background - fades in to cover the pink */}
      <motion.div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at center, #1a0a2e 0%, #0d0015 40%, #000 100%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {phase === "sucking" && (
        <>
          {/* Rotating accretion disk rings */}
          {[1, 2, 3, 4].map((ring) => (
            <motion.div
              key={ring}
              className="absolute rounded-full"
              style={{
                width: 120 * ring,
                height: 120 * ring,
                border: `${4 - ring * 0.5}px solid rgba(138, 43, 226, ${0.7 - ring * 0.12})`,
                boxShadow: `0 0 ${25 * ring}px rgba(138, 43, 226, 0.4), inset 0 0 ${15 * ring}px rgba(138, 43, 226, 0.2)`,
              }}
              initial={{ scale: 2.5, opacity: 0, rotate: 0 }}
              animate={{
                scale: [2.5, 1.2, 0],
                opacity: [0, 0.9, 0],
                rotate: [0, 720 * (ring % 2 === 0 ? 1 : -1)],
              }}
              transition={{
                duration: 1.8,
                delay: ring * 0.1,
                ease: "easeIn",
              }}
            />
          ))}

          {/* Central black hole with intense glow */}
          <motion.div
            className="absolute rounded-full bg-black"
            style={{
              boxShadow: `
                0 0 60px 20px rgba(75, 0, 130, 0.9),
                0 0 120px 60px rgba(138, 43, 226, 0.5),
                0 0 200px 100px rgba(75, 0, 130, 0.3)
              `,
            }}
            initial={{ width: 10, height: 10 }}
            animate={{
              width: [10, 30, 60, 1200],
              height: [10, 30, 60, 1200],
            }}
            transition={{
              duration: 2,
              ease: [0.4, 0, 0.2, 1],
              times: [0, 0.2, 0.4, 1],
            }}
          />

          {/* Subtle vortex lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`line-${i}`}
              className="absolute h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
              style={{
                width: 300,
                transformOrigin: "left center",
                rotate: `${i * 45}deg`,
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: [0, 1, 0],
                opacity: [0, 0.6, 0],
                rotate: [`${i * 45}deg`, `${i * 45 + 180}deg`],
              }}
              transition={{
                duration: 1.3,
                delay: 0.2 + i * 0.08,
                ease: "easeInOut",
              }}
            />
          ))}
        </>
      )}

      {/* Angry message phase */}
      {phase === "angry" && (
        <div className="flex flex-col items-center justify-center gap-6 z-10">
          <img src="/images2/b_d.webp" alt="" className="w-64 h-64 md:w-96 md:h-96 object-contain" />
          <h2
            className="text-4xl md:text-6xl font-bold text-red-500"
            style={{
              textShadow: "0 0 20px rgba(239, 68, 68, 0.5)",
            }}
          >
            I&apos;m not annoying.
          </h2>
        </div>
      )}
    </motion.div>
  );
}

// Crying Emoji Flood Effect Component
function CryingFloodEffect({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"crying" | "darkening" | "angry">("crying");

  useEffect(() => {
    // Phase 1: Crying rain (2s)
    // Phase 2: Screen darkens (0.8s)
    // Phase 3: Message appears for 3 seconds
    const darkenTimer = setTimeout(() => setPhase("darkening"), 2000);
    const angryTimer = setTimeout(() => setPhase("angry"), 2800);
    const completeTimer = setTimeout(onComplete, 5800); // 2800 + 3000 = 3 seconds for message
    return () => {
      clearTimeout(darkenTimer);
      clearTimeout(angryTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // Multiple waves of crying emojis for continuous rain
  const wave1 = Array.from({ length: 30 }, (_, i) => ({
    id: `w1-${i}`,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    size: 28 + Math.random() * 20,
    duration: 1.5 + Math.random() * 0.5,
  }));
  
  const wave2 = Array.from({ length: 30 }, (_, i) => ({
    id: `w2-${i}`,
    x: Math.random() * 100,
    delay: 0.5 + Math.random() * 0.5,
    size: 28 + Math.random() * 20,
    duration: 1.5 + Math.random() * 0.5,
  }));
  
  const wave3 = Array.from({ length: 30 }, (_, i) => ({
    id: `w3-${i}`,
    x: Math.random() * 100,
    delay: 1.0 + Math.random() * 0.5,
    size: 28 + Math.random() * 20,
    duration: 1.5 + Math.random() * 0.5,
  }));

  const allEmojis = [...wave1, ...wave2, ...wave3];

  return (
    <motion.div
      className="fixed inset-0 z-40 overflow-hidden flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Blue tint overlay - transitions to black */}
      <motion.div
        className="absolute inset-0"
        initial={{ backgroundColor: "rgba(30, 58, 138, 0.7)" }}
        animate={{ 
          backgroundColor: phase === "angry" 
            ? "rgba(0, 0, 0, 1)" 
            : phase === "darkening"
            ? "rgba(10, 20, 50, 0.95)"
            : "rgba(30, 58, 138, 0.7)"
        }}
        transition={{ duration: 0.8 }}
      />

      {/* Continuous raining crying emojis */}
      {(phase === "crying" || phase === "darkening") && (
        <>
          {allEmojis.map((emoji) => (
            <motion.div
              key={emoji.id}
              className="absolute"
              style={{ 
                left: `${emoji.x}%`,
                top: -50, // Start above the viewport
                fontSize: emoji.size,
              }}
              initial={{ y: 0, opacity: 0 }}
              animate={{
                y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
                opacity: [0, 1, 1, 0.5],
              }}
              transition={{
                duration: emoji.duration,
                delay: emoji.delay,
                ease: "linear",
              }}
            >
              😢
            </motion.div>
          ))}
        </>
      )}

      {/* Screen darkening overlay */}
      {phase === "darkening" && (
        <motion.div
          className="absolute inset-0 bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
      )}

      {/* Angry message phase */}
      {phase === "angry" && (
        <div className="flex flex-col items-center justify-center gap-6 z-10">
          <img src="/images2/bd.webp" alt="" className="w-64 h-64 md:w-96 md:h-96 object-contain" />
          <h2
            className="text-4xl md:text-6xl font-bold text-blue-400"
            style={{ textShadow: "0 0 20px rgba(59, 130, 246, 0.8)" }}
          >
            This is proof :D
          </h2>
        </div>
      )}
    </motion.div>
  );
}

// Shattered Mirror Effect Component  
function MonsterEatEffect({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"mirror" | "impact" | "cracking" | "falling" | "shocked">("mirror");

  useEffect(() => {
    const impactTimer = setTimeout(() => setPhase("impact"), 300);
    const crackTimer = setTimeout(() => setPhase("cracking"), 400);
    const fallTimer = setTimeout(() => setPhase("falling"), 1300);
    const shockedTimer = setTimeout(() => setPhase("shocked"), 2900);
    const completeTimer = setTimeout(onComplete, 5900); // 2900 + 3000 = 3 seconds for message
    return () => {
      clearTimeout(impactTimer);
      clearTimeout(crackTimer);
      clearTimeout(fallTimer);
      clearTimeout(shockedTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // Generate large glass shards - fewer pieces but much bigger
  const [shards] = useState(() => {
    const pieces: Array<{
      id: number;
      // Position on screen (percentage)
      startX: number;
      startY: number;
      // Size of the shard
      width: number;
      height: number;
      // Clip path for irregular shape
      clipPath: string;
      // Animation
      fallX: number;
      fallY: number;
      rotation: number;
      delay: number;
    }> = [];

    // Create 25 large shards spread across the screen
    for (let i = 0; i < 25; i++) {
      const row = Math.floor(i / 5);
      const col = i % 5;
      
      // Position in a rough grid with randomization
      const startX = col * 20 + Math.random() * 10;
      const startY = row * 20 + Math.random() * 10;
      
      // Random size - large pieces
      const width = 80 + Math.random() * 120;
      const height = 80 + Math.random() * 120;
      
      // Generate irregular polygon clip path (5-7 vertices)
      const numVertices = 5 + Math.floor(Math.random() * 3);
      const vertices: string[] = [];
      for (let v = 0; v < numVertices; v++) {
        const angle = (v / numVertices) * Math.PI * 2 - Math.PI / 2;
        const radius = 35 + Math.random() * 15;
        const px = 50 + Math.cos(angle) * radius;
        const py = 50 + Math.sin(angle) * radius;
        vertices.push(`${px}% ${py}%`);
      }
      const clipPath = `polygon(${vertices.join(', ')})`;
      
      // Distance from center affects animation
      const cx = startX + 10;
      const cy = startY + 10;
      const angleFromCenter = Math.atan2(cy - 50, cx - 50);
      const distFromCenter = Math.sqrt(Math.pow(cx - 50, 2) + Math.pow(cy - 50, 2));
      
      pieces.push({
        id: i,
        startX,
        startY,
        width,
        height,
        clipPath,
        fallX: Math.cos(angleFromCenter) * (100 + Math.random() * 150),
        fallY: 150 + Math.random() * 200,
        rotation: (Math.random() - 0.5) * 180,
        delay: distFromCenter * 0.005 + Math.random() * 0.1,
      });
    }
    return pieces;
  });

  // Generate organic crack lines
  const [cracks] = useState(() => {
    const lines: Array<{
      id: string;
      d: string;
      strokeWidth: number;
      delay: number;
    }> = [];
    
    // 18 main radial cracks with jagged paths
    for (let i = 0; i < 18; i++) {
      const baseAngle = (i / 18) * Math.PI * 2;
      let path = 'M 50 50';
      let dist = 0;
      const maxDist = 52 + Math.random() * 12;
      let currentAngle = baseAngle;
      
      while (dist < maxDist) {
        const segment = 4 + Math.random() * 6;
        dist += segment;
        // Add jaggedness
        currentAngle += (Math.random() - 0.5) * 0.25;
        const x = 50 + Math.cos(currentAngle) * dist;
        const y = 50 + Math.sin(currentAngle) * dist;
        path += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
      }
      
      lines.push({
        id: `main-${i}`,
        d: path,
        strokeWidth: 0.25 + Math.random() * 0.25,
        delay: i * 0.008,
      });
      
      // Add 2-4 branches per main crack
      const numBranches = 2 + Math.floor(Math.random() * 3);
      for (let b = 0; b < numBranches; b++) {
        const branchDist = 8 + Math.random() * 30;
        const bx = 50 + Math.cos(baseAngle) * branchDist;
        const by = 50 + Math.sin(baseAngle) * branchDist;
        const branchAngle = baseAngle + (Math.random() > 0.5 ? 1 : -1) * (0.3 + Math.random() * 0.6);
        
        let branchPath = `M ${bx.toFixed(1)} ${by.toFixed(1)}`;
        let bDist = 0;
        const maxBDist = 6 + Math.random() * 12;
        let bAngle = branchAngle;
        
        while (bDist < maxBDist) {
          bDist += 3 + Math.random() * 4;
          bAngle += (Math.random() - 0.5) * 0.3;
          const x = bx + Math.cos(bAngle) * bDist;
          const y = by + Math.sin(bAngle) * bDist;
          branchPath += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
        }
        
        lines.push({
          id: `branch-${i}-${b}`,
          d: branchPath,
          strokeWidth: 0.1 + Math.random() * 0.15,
          delay: 0.06 + i * 0.008 + b * 0.015,
        });
      }
    }
    
    // Add concentric stress fractures
    [10, 18, 28, 40].forEach((radius, ri) => {
      const numArcs = 6 + ri * 2;
      for (let a = 0; a < numArcs; a++) {
        if (Math.random() > 0.5) continue;
        const startAngle = (a / numArcs) * Math.PI * 2 + Math.random() * 0.2;
        const arcLen = (0.15 + Math.random() * 0.2) * Math.PI;
        const r = radius + (Math.random() - 0.5) * 2;
        
        const x1 = 50 + Math.cos(startAngle) * r;
        const y1 = 50 + Math.sin(startAngle) * r;
        const x2 = 50 + Math.cos(startAngle + arcLen) * r;
        const y2 = 50 + Math.sin(startAngle + arcLen) * r;
        
        lines.push({
          id: `arc-${ri}-${a}`,
          d: `M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`,
          strokeWidth: 0.08 + Math.random() * 0.1,
          delay: 0.1 + ri * 0.02,
        });
      }
    });
    
    return lines;
  });

  const showMirror = phase === "mirror" || phase === "impact" || phase === "cracking";
  const showCracks = phase === "cracking" || phase === "falling";

  return (
    <motion.div
      className="fixed inset-0 z-40 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Screen shake on impact */}
      <motion.div
        className="absolute inset-0"
        animate={phase === "impact" ? {
          x: [0, -15, 18, -12, 8, -4, 0],
          y: [0, 10, -12, 8, -5, 2, 0],
        } : {}}
        transition={{ duration: 0.2 }}
      >
        {/* Mirror surface */}
        {showMirror && (
          <div className="absolute inset-0">
            {/* Base mirror - silver metallic */}
            <div 
              className="absolute inset-0"
              style={{
                background: `linear-gradient(
                  170deg,
                  #f0f2f5 0%,
                  #e0e4e8 8%,
                  #f5f7fa 18%,
                  #d8dce2 30%,
                  #eef0f4 45%,
                  #d4d8de 58%,
                  #e8ebf0 72%,
                  #dde0e6 85%,
                  #f2f4f7 100%
                )`,
              }}
            />
            {/* Horizontal reflection bands */}
            <div 
              className="absolute inset-0 opacity-25"
              style={{
                background: `
                  linear-gradient(0deg,
                    transparent 0%,
                    rgba(255,255,255,0.4) 15%,
                    transparent 30%,
                    rgba(255,255,255,0.3) 50%,
                    transparent 65%,
                    rgba(255,255,255,0.2) 80%,
                    transparent 100%
                  )
                `,
              }}
            />
            {/* Corner glare */}
            <div 
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse 50% 35% at 20% 20%, rgba(255,255,255,0.5) 0%, transparent 60%),
                  radial-gradient(ellipse 30% 25% at 85% 75%, rgba(255,255,255,0.25) 0%, transparent 50%)
                `,
              }}
            />
          </div>
        )}

        {/* Black background for falling phase */}
        {(phase === "falling" || phase === "shocked") && (
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
        )}

        {/* Impact white flash */}
        {phase === "impact" && (
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.1 }}
          />
        )}

        {/* SVG Crack Pattern */}
        {showCracks && (
          <svg 
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid slice"
          >
            {cracks.map((crack) => (
              <motion.path
                key={crack.id}
                d={crack.d}
                fill="none"
                stroke="rgba(10, 10, 20, 0.85)"
                strokeWidth={crack.strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ 
                  pathLength: { duration: 0.12, delay: crack.delay, ease: "easeOut" },
                  opacity: { duration: 0.05, delay: crack.delay }
                }}
              />
            ))}
            
            {/* Impact epicenter glow */}
            <motion.circle
              cx="50"
              cy="50"
              r="5"
              fill="white"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: [0, 1.5, 1], opacity: [1, 0.8, 0] }}
              transition={{ duration: 0.25 }}
            />
          </svg>
        )}
      </motion.div>

      {/* Falling Glass Shards */}
      {phase === "falling" && (
        <div className="absolute inset-0 overflow-visible">
          {shards.map((shard) => (
            <motion.div
              key={shard.id}
              className="absolute"
              style={{
                left: `${shard.startX}%`,
                top: `${shard.startY}%`,
                width: shard.width,
                height: shard.height,
                clipPath: shard.clipPath,
                background: `linear-gradient(
                  ${135 + shard.rotation * 0.5}deg,
                  rgba(255, 255, 255, 0.95) 0%,
                  rgba(230, 235, 250, 0.85) 25%,
                  rgba(200, 215, 240, 0.75) 50%,
                  rgba(180, 200, 230, 0.65) 75%,
                  rgba(160, 180, 220, 0.55) 100%
                )`,
                boxShadow: `
                  inset 2px 2px 4px rgba(255, 255, 255, 0.8),
                  inset -1px -1px 3px rgba(0, 0, 0, 0.1),
                  4px 8px 20px rgba(0, 0, 0, 0.4)
                `,
                border: "1px solid rgba(255, 255, 255, 0.6)",
              }}
              initial={{ 
                x: 0, 
                y: 0, 
                rotate: 0,
                opacity: 1,
                scale: 1,
              }}
              animate={{ 
                x: shard.fallX,
                y: shard.fallY,
                rotate: shard.rotation,
                opacity: [1, 1, 0.8, 0],
                scale: [1, 1.05, 0.95],
              }}
              transition={{
                duration: 1.5,
                delay: shard.delay,
                ease: [0.25, 0.1, 0.25, 1],
                opacity: { duration: 1.5, times: [0, 0.3, 0.7, 1] }
              }}
            />
          ))}
        </div>
      )}

      {/* Cracking phase text */}
      {phase === "cracking" && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-20"
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ 
            opacity: [0, 1, 1, 0], 
            scale: [0.2, 1.2, 1.1, 1],
          }}
          transition={{ duration: 0.8, times: [0, 0.15, 0.7, 1] }}
        >
          <span 
            className="text-7xl md:text-[10rem] font-black tracking-widest"
            style={{
              color: "white",
              textShadow: `
                0 0 30px rgba(255,255,255,1),
                0 0 60px rgba(255,255,255,0.7),
                0 0 100px rgba(255,255,255,0.4),
                5px 5px 0 rgba(0,0,0,0.3)
              `,
              fontFamily: "'Impact', 'Arial Black', sans-serif",
              letterSpacing: "0.1em",
            }}
          >
            {/* CRACK! */}
          </span>
        </motion.div>
      )}

      {/* Shocked message phase */}
      {phase === "shocked" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-10 bg-black">
          <img src="/images2/d.webp" alt="" className="w-64 h-64 md:w-96 md:h-96 object-contain" />
          <h2
            className="text-4xl md:text-6xl font-bold text-center px-6"
            style={{ 
              background: "linear-gradient(135deg, #f472b6 0%, #ec4899 45%, #be185d 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 40px rgba(236, 72, 153, 0.6))",
            }}
          >
            You're right. Not more than this person. But apart from you, am I not the cutest????????
          </h2>
        </div>
      )}
    </motion.div>
  );
}

// Confetti Celebration Component
function Celebration() {
  const [confetti] = useState(() => 
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 3,
      emoji: ["💕", "❤️", "💖", "✨", "💗", "💝", "🥰", "💘"][i % 8],
      duration: 4 + Math.random() * 3,
      size: 1.2 + Math.random() * 1,
      wobble: (Math.random() - 0.5) * 80,
    }))
  );

  const galleryImages = [
    { src: "/images3/WhatsApp Image 2026-02-01 at 23.04.16.jpeg", alt: "Memory 1" },
    { src: "/images3/WhatsApp Image 2026-02-01 at 23.04.16 (1).jpeg", alt: "Memory 2" },
    { src: "/images3/WhatsApp Image 2026-02-01 at 23.04.16 (2).jpeg", alt: "Memory 3" },
    { src: "/images3/WhatsApp Image 2026-02-01 at 23.04.16 (3).jpeg", alt: "Memory 4" },
    { src: "/images3/WhatsApp Image 2026-02-01 at 23.04.16 (4).jpeg", alt: "Memory 5" },
    { src: "/images3/WhatsApp Image 2026-02-01 at 23.04.17.jpeg", alt: "Memory 6" },
    { src: "/images3/WhatsApp Image 2026-02-01 at 23.04.17 (1).jpeg", alt: "Memory 7" },
    { src: "/images3/WhatsApp Image 2026-02-01 at 23.04.17 (2).jpeg", alt: "Memory 8" },
    { src: "/images3/WhatsApp Image 2026-02-01 at 23.04.17 (3).jpeg", alt: "Memory 9" },
    { src: "/images3/WhatsApp Image 2026-02-01 at 23.04.17 (4).jpeg", alt: "Memory 10" },
    { src: "/images3/WhatsApp Image 2026-02-01 at 23.04.17 (5).jpeg", alt: "Memory 11" },
    { src: "/images3/WhatsApp Image 2026-02-01 at 23.04.17 (6).jpeg", alt: "Memory 12" },
  ];

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Dome Gallery */}
      <div className="absolute inset-0 z-10">
        <DomeGallery 
          images={galleryImages}
          dragSensitivity={15}
          maxVerticalRotationDeg={10}
          grayscale={false}
        />
      </div>

      {/* Falling hearts */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-30">
        {confetti.map((c) => (
          <motion.div
            key={c.id}
            className="absolute"
            style={{ 
              left: `${c.x}%`,
              top: -60,
              fontSize: `${c.size}rem`,
            }}
            animate={{
              y: [0, typeof window !== 'undefined' ? window.innerHeight + 100 : 1000],
              x: [0, c.wobble, 0],
              rotate: [0, 360],
            }}
            transition={{
              y: {
                duration: c.duration,
                delay: c.delay,
                repeat: Infinity,
                ease: "linear",
              },
              x: {
                duration: c.duration / 2,
                delay: c.delay,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
              rotate: {
                duration: c.duration,
                delay: c.delay,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {c.emoji}
          </motion.div>
        ))}
      </div>

      {/* Text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-20 pointer-events-none">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-yellow-500 text-center px-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
          style={{
            textShadow: "0 4px 20px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.9)",
          }}
        >
          Hehehehe, thought so 💕
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-yellow-300 text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={{
            textShadow: "0 2px 10px rgba(0,0,0,0.8)",
          }}
        >
          Can&apos;t wait to spend Valentine&apos;s with you baby 🥰
        </motion.p>

        <motion.div
          className="text-6xl md:text-8xl"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.3, 1] }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          ❤️
        </motion.div>
      </div>
    </motion.div>
  );
}

// Question Component with Yes/No buttons
function QuestionScreen({
  question,
  correctAnswer,
  onCorrect,
  onWrong,
  isDodging = false,
}: {
  question: string;
  correctAnswer: "yes" | "no";
  onCorrect: () => void;
  onWrong: () => void;
  isDodging?: boolean;
}) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noScale, setNoScale] = useState(1);
  const [dodgeCount, setDodgeCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const lastDodgeTime = useRef<number>(0);
  
  // Detection distance (pixels from button edge)
  const detectionDistance = 50;
  // Extra distance to jump beyond detection range
  const jumpExtra = 60;
  // Cooldown between dodges (milliseconds)
  const dodgeCooldown = 300;

  // Track mouse position and check proximity to No button
  useEffect(() => {
    if (!isDodging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!noButtonRef.current) return;

      const buttonRect = noButtonRef.current.getBoundingClientRect();
      const buttonCenterX = buttonRect.left + buttonRect.width / 2;
      const buttonCenterY = buttonRect.top + buttonRect.height / 2;
      
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Calculate distance from mouse to button center
      const dx = mouseX - buttonCenterX;
      const dy = mouseY - buttonCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Expand the detection zone based on button size
      const buttonRadius = Math.max(buttonRect.width, buttonRect.height) / 2;
      const triggerDistance = buttonRadius + detectionDistance;

      // If mouse is within detection zone, dodge! (with cooldown)
      const now = Date.now();
      if (distance < triggerDistance && now - lastDodgeTime.current > dodgeCooldown) {
        lastDodgeTime.current = now;
        // Calculate escape direction (away from mouse)
        const escapeAngle = Math.atan2(-dy, -dx);
        
        // Add some randomness to the angle (±45 degrees)
        const randomAngle = escapeAngle + (Math.random() - 0.5) * (Math.PI / 2);
        
        // Jump distance = detection distance + extra
        const jumpDistance = detectionDistance + jumpExtra;
        
        // Calculate proposed jump
        const deltaX = Math.cos(randomAngle) * jumpDistance;
        const deltaY = Math.sin(randomAngle) * jumpDistance;
        
        // Where would the button end up (absolute position)?
        const proposedLeft = buttonRect.left + deltaX;
        const proposedTop = buttonRect.top + deltaY;
        const proposedRight = buttonRect.right + deltaX;
        const proposedBottom = buttonRect.bottom + deltaY;
        
        // Viewport bounds with padding
        const padding = 20;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Calculate new position, clamped to viewport
        let newX = noPosition.x + deltaX;
        let newY = noPosition.y + deltaY;
        
        // Clamp X - adjust based on where button would go
        if (proposedLeft < padding) {
          newX = noPosition.x + (padding - buttonRect.left);
        } else if (proposedRight > viewportWidth - padding) {
          newX = noPosition.x + ((viewportWidth - padding) - buttonRect.right);
        }
        
        // Clamp Y - adjust based on where button would go
        if (proposedTop < padding) {
          newY = noPosition.y + (padding - buttonRect.top);
        } else if (proposedBottom > viewportHeight - padding) {
          newY = noPosition.y + ((viewportHeight - padding) - buttonRect.bottom);
        }

        setNoPosition({ x: newX, y: newY });
        setDodgeCount((prev) => prev + 1);
        
        // Shrink by 10% each dodge
        setNoScale((prev) => Math.max(0.2, prev * 0.96));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isDodging]);

  const handleYesClick = () => {
    if (correctAnswer === "yes") {
      onCorrect();
    } else {
      onWrong();
    }
  };

  const handleNoClick = () => {
    if (isDodging) return; // Can't click if dodging
    if (correctAnswer === "no") {
      onCorrect();
    } else {
      onWrong();
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className="flex flex-col items-center justify-center min-h-screen gap-12 px-4"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
    >
      <motion.h2
        className="text-4xl md:text-6xl font-bold text-rose-700 text-center"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {question}
      </motion.h2>

      <div className="flex gap-6 md:gap-12 items-center relative">
        {/* Yes Button */}
        <motion.button
          className="group relative px-10 py-5 text-white text-2xl md:text-3xl font-bold rounded-2xl overflow-hidden cursor-pointer"
          style={{
            background: "linear-gradient(145deg, #f9a8d4 0%, #f472b6 30%, #ec4899 70%, #db2777 100%)",
            boxShadow: `
              0 0 0 2px rgba(255, 255, 255, 0.1),
              0 8px 32px rgba(236, 72, 153, 0.35),
              0 16px 48px rgba(219, 39, 119, 0.15),
              inset 0 2px 0 rgba(255, 255, 255, 0.25),
              inset 0 -2px 0 rgba(0, 0, 0, 0.1)
            `,
          }}
          whileHover={{ 
            scale: 1.05,
            y: -4,
          }}
          whileTap={{ scale: 0.97, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
          onClick={handleYesClick}
        >
          {/* Animated glow ring */}
          <motion.div
            className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: "linear-gradient(135deg, #f9a8d4, #ec4899, #f9a8d4)",
              filter: "blur(12px)",
              zIndex: -1,
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          {/* Shine effect */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.5) 45%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.5) 55%, transparent 60%)",
              transform: "translateX(-100%)",
              animation: "shine 3s ease-in-out infinite",
            }}
          />
          <span className="relative z-10 flex items-center gap-2">
            Yes
            {correctAnswer === "yes" && (
              <img src="/images2/b_c.webp" alt="" className="w-12 h-12 object-contain" />
            )}
          </span>
        </motion.button>

        {/* No Button - Dodges away from cursor on Q4 */}
        <motion.button
          ref={noButtonRef}
          className="group relative px-10 py-5 text-white text-2xl md:text-3xl font-bold rounded-2xl overflow-hidden cursor-pointer"
          style={{
            background: "linear-gradient(145deg, #f9a8d4 0%, #f472b6 30%, #ec4899 70%, #db2777 100%)",
            boxShadow: `
              0 0 0 2px rgba(255, 255, 255, 0.1),
              0 8px 32px rgba(236, 72, 153, 0.35),
              0 16px 48px rgba(219, 39, 119, 0.15),
              inset 0 2px 0 rgba(255, 255, 255, 0.25),
              inset 0 -2px 0 rgba(0, 0, 0, 0.1)
            `,
          }}
          animate={{
            x: noPosition.x,
            y: noPosition.y,
            scale: noScale,
            opacity: noScale < 0.25 ? 0.3 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 25,
          }}
          whileHover={isDodging ? {} : { 
            scale: 1.05,
            y: -4,
          }}
          whileTap={{ scale: 0.97, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          onClick={handleNoClick}
        >
          {/* Animated glow ring */}
          <motion.div
            className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: "linear-gradient(135deg, #f9a8d4, #ec4899, #f9a8d4)",
              filter: "blur(12px)",
              zIndex: -1,
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          {/* Shine effect */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.5) 45%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.5) 55%, transparent 60%)",
              transform: "translateX(-100%)",
              animation: "shine 3s ease-in-out infinite 0.5s",
            }}
          />
          <span className="relative z-10 flex items-center gap-2">
            No
            {correctAnswer === "no" && (
              <img src="/images2/b_c.webp" alt="" className="w-12 h-12 object-contain" />
            )}
          </span>
        </motion.button>
      </div>

      {/* CSS for shine animation */}
      <style>{`
        @keyframes shine {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
      `}</style>

      {isDodging && dodgeCount > 0 && (
        <motion.p
          className="text-xl text-rose-500 italic mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={dodgeCount > 8 ? "final" : dodgeCount > 4 ? "mid" : "start"}
        >
          {dodgeCount > 24
            ? "Fine fine, I admire your persistence... but still no"
            : dodgeCount > 20
            ? "You really thought you could win ya cutie?"
            : dodgeCount > 16
            ? "Just click yes already dumbo"
            : dodgeCount > 12
            ? "The button is faster than you cutie"
            : dodgeCount > 8
            ? "Click yes no babe, why are you trying so hard to click no"
            : dodgeCount > 4
            ? "Noooo don't click no babe"
            : "Hehe"}
        </motion.p>
      )}
    </motion.div>
  );
}

// Main Page Component
export default function ValentinePage() {
  const [gameState, setGameState] = useState<GameState>("greeting");
  const [wrongEffect, setWrongEffect] = useState<WrongAnswerEffect>(null);
  const [emojiState, setEmojiState] = useState<EmojiState>("floating");

  const handleWrongAnswer = (effect: WrongAnswerEffect) => {
    // Step 1: Freeze the emojis
    setEmojiState("frozen");
    
    // Step 2: Start sucking + trigger effect after freeze
    setTimeout(() => {
      setEmojiState("sucking");
      setWrongEffect(effect);
    }, 600);
  };

  const handleEffectComplete = useCallback(() => {
    setWrongEffect(null);
    setEmojiState("floating");
  }, []);

  const questions: Record<
    "q1" | "q2" | "q3" | "q4",
    {
      question: string;
      correctAnswer: "yes" | "no";
      wrongEffect: WrongAnswerEffect;
      nextState: GameState;
    }
  > = {
    q1: {
      question: "Am I annoying?",
      correctAnswer: "no",
      wrongEffect: "blackhole",
      nextState: "q2",
    },
    q2: {
      question: "Do I make you smile?",
      correctAnswer: "yes",
      wrongEffect: "crying",
      nextState: "q3",
    },
    q3: {
      question: "Am I the cutest person you know?",
      correctAnswer: "yes",
      wrongEffect: "monster",
      nextState: "q4",
    },
    q4: {
      question: "Then, will you be my Valentine?",
      correctAnswer: "yes",
      wrongEffect: null,
      nextState: "celebration",
    },
  };

  // Determine which background to show
  const isQuizActive = gameState !== "greeting" && gameState !== "celebration";
  // Show funny emojis during quiz AND during any wrong effect (so they can be animated)
  const showFunnyEmojis = isQuizActive || (wrongEffect !== null && emojiState === "sucking");

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 overflow-hidden">
      {/* Floating Hearts - only on greeting */}
      {gameState === "greeting" && <FloatingHearts />}
      
      {/* Floating Funny Emojis - during quiz and during wrong answer effects */}
      {showFunnyEmojis && <FloatingFunnyEmojis state={emojiState} question={gameState} effectType={wrongEffect} />}

      {/* Wrong Answer Effects */}
      <AnimatePresence>
        {wrongEffect === "blackhole" && (
          <BlackHoleEffect onComplete={handleEffectComplete} />
        )}
        {wrongEffect === "crying" && (
          <CryingFloodEffect onComplete={handleEffectComplete} />
        )}
        {wrongEffect === "monster" && (
          <MonsterEatEffect onComplete={handleEffectComplete} />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {gameState === "greeting" && (
          <GreetingScreen
            key="greeting"
            onStart={() => setGameState("q1")}
          />
        )}

        {gameState === "q1" && !wrongEffect && (
          <QuestionScreen
            key="q1"
            question={questions.q1.question}
            correctAnswer={questions.q1.correctAnswer}
            onCorrect={() => setGameState(questions.q1.nextState)}
            onWrong={() => handleWrongAnswer(questions.q1.wrongEffect)}
          />
        )}

        {gameState === "q2" && !wrongEffect && (
          <QuestionScreen
            key="q2"
            question={questions.q2.question}
            correctAnswer={questions.q2.correctAnswer}
            onCorrect={() => setGameState(questions.q2.nextState)}
            onWrong={() => handleWrongAnswer(questions.q2.wrongEffect)}
          />
        )}

        {gameState === "q3" && !wrongEffect && (
          <QuestionScreen
            key="q3"
            question={questions.q3.question}
            correctAnswer={questions.q3.correctAnswer}
            onCorrect={() => setGameState(questions.q3.nextState)}
            onWrong={() => handleWrongAnswer(questions.q3.wrongEffect)}
          />
        )}

        {gameState === "q4" && (
          <QuestionScreen
            key="q4"
            question={questions.q4.question}
            correctAnswer={questions.q4.correctAnswer}
            onCorrect={() => setGameState(questions.q4.nextState)}
            onWrong={() => {}} // No wrong effect for dodging button
            isDodging={true}
          />
        )}

        {gameState === "celebration" && <Celebration key="celebration" />}
      </AnimatePresence>
    </div>
  );
}
