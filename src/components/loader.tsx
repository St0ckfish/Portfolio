"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center text-center justify-center bg-[#000000] z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image src="/images/Stockfish .png" alt="Loading..." width={200} height={200} className="w-[300px] h-[150px]" />
        <p className='text-[#26a6cb] text-[32px] font-bold'>Stockfish</p>
      </motion.div>
    </div>
  );
};

export default Loader;
