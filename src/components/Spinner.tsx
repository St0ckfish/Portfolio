import { motion } from "framer-motion";

const Spinner = () => {
    return ( 
        <div className="flex items-center justify-center">
            <motion.div
                className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
}
 
export default Spinner;