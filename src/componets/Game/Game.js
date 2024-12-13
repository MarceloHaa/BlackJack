import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { shuffleDeck, drawCards } from '../../api/deckApi';
import Dealer from '../Dealer/Dealer';
import Player from '../Player/Player';
import Button from '../Button/Button';
import LoadingSpinner from '../Loading/LoadingSpinner';
import Confetti from 'react-confetti';
import CountUp from 'react-countup';
import { Crown } from 'lucide-react';
import './Game.css';
import background from '../../img/fundo.png';
import Versus from '../Versus/Versus';
import CoffeeButton from '../Coffee/Coffee';

const calculateScore = (cards) => {
    let score = 0;
    let aceCount = 0;

    cards.forEach((card) => {
        if (card.value === 'ACE') {
            aceCount++;
            score += 11;
        } else if (['KING', 'QUEEN', 'JACK'].includes(card.value)) {
            score += 10;
        } else {
            score += parseInt(card.value, 10);
        }
    });

    while (score > 21 && aceCount > 0) {
        score -= 10;
        aceCount--;
    }

    return score;
};

const Game = () => {
    const [deckId, setDeckId] = useState(null);
    const [playerCards, setPlayerCards] = useState([]);
    const [dealerCards, setDealerCards] = useState([]);
    const [playerScore, setPlayerScore] = useState(0);
    const [dealerScore, setDealerScore] = useState(0);
    const [message, setMessage] = useState('');
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [loading, setLoading] = useState(true);
    const [dealerTurn, setDealerTurn] = useState(false);
    const [showScores, setShowScores] = useState(false);
    const [playerVictories, setPlayerVictories] = useState(0);
    const [dealerVictories, setDealerVictories] = useState(0);

    const startGame = useCallback(async () => {
        setLoading(true);
        setGameStarted(false);
        setGameOver(false);
        setDealerTurn(false);
        setShowScores(false);

        const deck = await shuffleDeck();
        setDeckId(deck.deck_id);

        const playerHand = await drawCards(deck.deck_id, 2);
        const dealerHand = await drawCards(deck.deck_id, 2);

        setPlayerCards(playerHand.cards);
        setDealerCards(dealerHand.cards);

        setPlayerScore(calculateScore(playerHand.cards));
        setDealerScore(calculateScore([dealerHand.cards[0]]));

        setMessage('');
        setLoading(false);
    }, []);

    useEffect(() => {
        startGame();
    }, [startGame]);

    const drawPlayerCard = async () => {
        const cardData = await drawCards(deckId, 1);
        const newCards = [...playerCards, ...cardData.cards];
        const newScore = calculateScore(newCards);

        setPlayerCards(newCards);
        setPlayerScore(newScore);

        if (newScore > 21) {
            setMessage('Você estourou!');
            setGameOver(true);
            setDealerVictories((prev) => prev + 1);
        } else if (newScore === 21) {
            setMessage('Parabéns você fez 21!');
            setGameOver(true);
            setPlayerVictories((prev) => prev + 1);
        }
    };

    const dealerPlay = async () => {
        setDealerTurn(true);
        let dealerHand = [...dealerCards];
        let newScore = calculateScore(dealerHand);

        while (newScore < playerScore && newScore < 21) {
            const cardData = await drawCards(deckId, 1);
            dealerHand = [...dealerHand, ...cardData.cards];
            newScore = calculateScore(dealerHand);
            setDealerCards(dealerHand);
        }

        setDealerScore(newScore);

        if (newScore > 21) {
            setMessage('Dealer estourou! Você ganhou!');
            setPlayerVictories((prev) => prev + 1);
        } else if (newScore > playerScore) {
            setMessage('Dealer ganhou!');
            setDealerVictories((prev) => prev + 1);
        } else if (newScore === playerScore) {
            setMessage('Empate!');
            setDealerVictories((prev) => prev + 1);
        } else {
            setMessage('Você ganhou!');
            setPlayerVictories((prev) => prev + 1);
        }

        setGameOver(true);
    };

    const playerWon = useMemo(
        () =>
            message.includes('Parabéns você fez 21!') ||
            message.includes('Dealer estourou! Você ganhou!') ||
            message.includes('Você ganhou!'),
        [message]
    );

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <section
            className="background"
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '101vw',
                height: '101vh',
                position: 'fixed',
                top: 0,
                left: 0,
            }}
        >
            <motion.div
                className="container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        {playerWon && <Confetti />}
                        {message && (
                            <motion.div
                                className="message-container"
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 50 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 300,
                                    damping: 20,
                                }}
                            >
                                <motion.h3
                                    className={`message ${
                                        message.includes('ganhou')
                                            ? 'winning'
                                            : ''
                                    }`}
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 200,
                                        damping: 15,
                                    }}
                                >
                                    {message}
                                </motion.h3>
                            </motion.div>
                        )}

                        <div className="score-container">
                            <div className="player-score-section">
                                <AnimatePresence>
                                    {showScores && (
                                        <motion.div
                                            className="score-card"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 300,
                                                damping: 20,
                                            }}
                                        >
                                            <div className="score-header">
                                                <span className="player-score-label">
                                                    Jogador:
                                                </span>
                                                <div className="victory-counter">
                                                    <Crown
                                                        color="#FFD700"
                                                        fill="#FFD700"
                                                        size={24}
                                                        strokeWidth={2.25}
                                                        className="victory-crown"
                                                    />
                                                    <span className="victory-number">
                                                        {playerVictories}
                                                    </span>
                                                </div>
                                            </div>
                                            <CountUp
                                                start={0}
                                                end={playerScore}
                                                duration={1.5}
                                                className="score-number player"
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div className="dealer-score-section">
                                <motion.div
                                    className="score-card"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{
                                        opacity: showScores ? 1 : 0,
                                        y: 0,
                                    }}
                                >
                                    <div className="score-header">
                                        <span className="dealer-score-label">
                                            Dealer:
                                        </span>
                                        <div className="victory-counter">
                                            <Crown
                                                color="#FFD700"
                                                fill="#FFD700"
                                                size={24}
                                                className="victory-crown"
                                            />
                                            <span className="victory-number">
                                                {dealerVictories}
                                            </span>
                                        </div>
                                    </div>

                                    <CountUp
                                        start={0}
                                        end={dealerScore}
                                        duration={1.5}
                                        className="score-number dealer"
                                    />
                                </motion.div>
                            </div>
                        </div>

                        <div className="game-board">
                            <Player cards={playerCards} flipped={gameStarted} />
                            <Versus />

                            <Dealer
                                cards={dealerCards}
                                hidden={!dealerTurn}
                                gameStarted={gameStarted}
                            />
                        </div>

                        <div className="button-group">
                            {!gameStarted && !gameOver && (
                                <Button
                                    onClick={() => {
                                        setGameStarted(true);
                                        setShowScores(true);
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Play
                                </Button>
                            )}
                            {gameStarted && !gameOver && (
                                <>
                                    <Button
                                        onClick={drawPlayerCard}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Puxar Carta
                                    </Button>
                                    <Button
                                        onClick={dealerPlay}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Parar
                                    </Button>
                                </>
                            )}
                            {gameOver && (
                                <Button
                                    onClick={startGame}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Reiniciar
                                </Button>
                            )}
                        </div>
                    </>
                )}
                <div className="coffee-container">
                    <CoffeeButton />
                </div>
            </motion.div>
        </section>
    );
};

export default Game;
