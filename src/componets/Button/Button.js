import React from 'react';
import { motion } from 'framer-motion';
import './Button.css';

const Button = ({
    children,
    onClick,
    className = '',
    whileHover = { scale: 1.05 },
    whileTap = { scale: 0.95 },
}) => {
    return (
        
        <motion.button
        
            className={`custom-button ${className}`}
            onClick={onClick}
            whileHover={whileHover}
            whileTap={whileTap}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            {children}
        </motion.button>
    );
};

export default Button;
