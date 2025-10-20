"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";

export default function MouseFollower() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const booleanValue = useSelector((state: RootState) => state.boolean.value);
  const isDark = !booleanValue; // Light mode when value is true
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 20, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 20);
      cursorY.set(e.clientY - 20);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-hover')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
        }}
      >
        <motion.div
          className="relative w-10 h-10"
          animate={{
            scale: isClicking ? 0.8 : isHovering ? 1.8 : 1,
            rotate: isHovering ? 90 : 0,
          }}
          transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #b292ff 0%, #7feaff 100%)',
              padding: '2px',
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <div className="w-full h-full rounded-full bg-[#0c0c0d]" />
          </motion.div>

          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: isClicking ? 0 : isHovering ? 0.5 : 1,
            }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{
                background: 'radial-gradient(circle, #b292ff 0%, #7feaff 100%)',
                boxShadow: '0 0 10px #b292ff, 0 0 20px #7feaff',
              }}
            />
          </motion.div>

          {isHovering && (
            <>
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2"
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: [0, Math.cos((i * Math.PI) / 2) * 20, Math.cos((i * Math.PI) / 2) * 30],
                    y: [0, Math.sin((i * Math.PI) / 2) * 20, Math.sin((i * Math.PI) / 2) * 30],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                >
                  <div className="w-1 h-1 rounded-full bg-[#7feaff]" />
                </motion.div>
              ))}
            </>
          )}
        </motion.div>
      </motion.div>

      <motion.div
        className="fixed pointer-events-none z-[9998] mix-blend-screen hidden lg:block"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
        }}
      >
        <motion.div
          className="w-10 h-10 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(178, 146, 255, 0.3) 0%, transparent 70%)',
          }}
          animate={{
            scale: isHovering ? 2 : 1.5,
            opacity: isHovering ? 0.6 : 0.3,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </>
  );
}
