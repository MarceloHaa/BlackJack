import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
    return (
        <div className="newtons-cradle">
            <div className="newtons-cradle__dot"></div>
            <div className="newtons-cradle__dot"></div>
            <div className="newtons-cradle__dot"></div>
            <div className="newtons-cradle__dot"></div>
        </div>
    );
};

export default LoadingSpinner;
