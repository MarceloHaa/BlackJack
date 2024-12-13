import React from 'react';
import Card from '../Card/Card';
import './Player.css';

const Player = ({ cards, flipped }) => {
    return (
        <div className="container">
            <div>
                <h2 className="player-title">Jogador</h2>
            </div>
            <div className="cards">
                {cards.map((card, index) => (
                    <Card
                        key={index}
                        image={card.image}
                        value={card.value}
                        suit={card.suit}
                        flipped={!flipped}
                    />
                ))}
            </div>
        </div>
    );
};

export default Player;
