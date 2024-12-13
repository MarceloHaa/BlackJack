import React from 'react';
import Card from '../Card/Card';
import './Dealer.css';

const Dealer = ({ cards, hidden, gameStarted }) => {
    return (
        <div className="container">
            <div>
                <h2 className="dealer-title">Dealer</h2>
            </div>
            <div className="cards">
                {cards.map((card, index) => (
                    <Card
                        key={index}
                        image={
                            gameStarted
                                ? hidden && index > 0
                                    ? 'https://deckofcardsapi.com/static/img/back.png'
                                    : card.image
                                : 'https://deckofcardsapi.com/static/img/back.png'
                        }
                        value={
                            gameStarted
                                ? hidden && index > 0
                                    ? 'Hidden'
                                    : card.value
                                : 'Hidden'
                        }
                        suit={
                            gameStarted
                                ? hidden && index > 0
                                    ? ''
                                    : card.suit
                                : ''
                        }
                        flipped={!gameStarted || (hidden && index > 0)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Dealer;
