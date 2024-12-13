import React from 'react';
import { motion } from 'framer-motion';
import './Card.css';

const Card = ({ image, value, suit, flipped, variants, ...motionProps }) => {
    return (
        <motion.div
            className={`card ${flipped ? 'flipped' : ''}`}
            {...motionProps}
            variants={variants}
        >
            <div className="card-inner">
                <div className="card-front">
                    <img
                        className="card-image"
                        src={image}
                        alt={`${value} of ${suit}`}
                    />
                </div>
                <div className="card-back">
                    <img
                        className="card-image"
                        src="https://deckofcardsapi.com/static/img/back.png"
                        alt="Card Back"
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default Card;
