import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({
            duration: 1200,
            once: false,
        });
    }, []);

    return (
        <div className="home-container">
            <div className="panel-container">
                <section className="panel welcome-section" data-aos="fade-up">
                    <div className="content">
                        <h1 data-aos="tracking-in-contract-bck-top">
                            Bem-vindo ao Blackjack
                        </h1>
                        <p data-aos="fade-in" data-aos-delay="300">
                            Prepare-se para uma experiência emocionante de
                            Blackjack!
                        </p>
                        <div className="welcome-animation">
                            <div
                                className="card card1"
                                data-aos="flip-left"
                                data-aos-delay="400"
                            ></div>
                            <div
                                className="card card2"
                                data-aos="flip-left"
                                data-aos-delay="500"
                            ></div>
                            <div
                                className="card card3"
                                data-aos="flip-left"
                                data-aos-delay="600"
                            ></div>
                        </div>
                    </div>
                </section>

                <section className="panel rules-section" data-aos="fade-up">
                    <div className="content">
                        <h2 data-aos="fade-in">Regras do Jogo</h2>
                        <ul>
                            <li data-aos="fade-right" data-aos-delay="100">
                                O objetivo é chegar o mais próximo possível de
                                21 pontos sem ultrapassar
                            </li>
                            <li data-aos="fade-right" data-aos-delay="200">
                                Cartas numeradas valem seu valor nominal
                            </li>
                            <li data-aos="fade-right" data-aos-delay="300">
                                Cartas J, Q, K valem 10 pontos
                            </li>
                            <li data-aos="fade-right" data-aos-delay="400">
                                Ás pode valer 1 ou 11 pontos (dependendo da mão
                                do jogador. O valor que prevalece é aquele que
                                favorece o jogador)
                            </li>
                            <li data-aos="fade-right" data-aos-delay="500">
                                Se ultrapassar 21, você "estoura" e perde o jogo
                            </li>
                        </ul>
                    </div>
                </section>

                <section className="panel start-section" data-aos="fade-up">
                    <div className="content">
                        <h2 data-aos="fade-in" data-aos-delay="200">
                            Pronto para Jogar?
                        </h2>
                        <button
                            className="start-button"
                            onClick={() => navigate('/game')}
                            data-aos="zoom-in"
                            data-aos-delay="400"
                        >
                            Iniciar Jogo
                        </button>
                        <div className="card-background">
                            <div
                                className="card card1"
                                data-aos="flip-left"
                                data-aos-delay="500"
                            ></div>
                            <div
                                className="card card2"
                                data-aos="flip-left"
                                data-aos-delay="600"
                            ></div>
                            <div
                                className="card card3"
                                data-aos="flip-left"
                                data-aos-delay="700"
                            ></div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;
