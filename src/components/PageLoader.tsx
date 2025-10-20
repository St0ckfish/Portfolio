"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const isDark = !useSelector((state: RootState) => state.boolean.value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.4, ease: "easeOut" }
          }}
          className={`fixed inset-0 z-[9999] flex items-center justify-center ${
            isDark ? 'bg-[#0c0c0d]' : 'bg-white'
          }`}
        >
          <div className="flex flex-col items-center gap-6">
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`w-1 rounded-full ${
                    isDark ? 'bg-[#7feaff]' : 'bg-[#8b5cf6]'
                  }`}
                  animate={{
                    height: ['20px', '60px', '20px'],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
