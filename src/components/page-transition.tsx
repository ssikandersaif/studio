
"use client"

import { motion } from "framer-motion";

const transitionVariants = {
    initial: {
        x: '100%',
        width: '100%'
    },
    animate: {
        x: '0%',
        width: '100%'
    },
    exit: {
        x: '100%',
        width: '100%'
    }
}

export function PageTransition() {
    return (
        <>
            <motion.div 
                className="fixed top-0 bottom-0 right-full w-screen h-screen z-[99] bg-primary/80 backdrop-blur-sm"
                variants={transitionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ delay: 0.1, duration: 0.4, ease: 'easeInOut' }}
            >
            </motion.div>
        </>
    )
}
