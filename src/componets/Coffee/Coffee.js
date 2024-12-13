import React from 'react';
import { Copy, X, Coffee } from 'lucide-react';
import './Coffee.css';

function CoffeeButton() {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isCopied, setIsCopied] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsModalOpen(false);
    };

    const copyPixKey = () => {
        const pixKeyText = document.getElementById('pixKey').innerText;
        navigator.clipboard.writeText(pixKeyText).then(
            function () {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            },
            function (err) {
                alert(
                    'Falha ao copiar a chave Pix. Por favor, tente novamente.'
                );
            }
        );
    };

    return (
        <div className="coffee-button-container">
            <button
                className="coffee-button"
                onClick={() => setIsModalOpen(true)}
                aria-label="Buy me a coffee"
            >
                <Coffee className="icon" size={24} color="white" />
            </button>

            {isModalOpen && (
                <div
                    className="modal-overlay"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="close-button"
                            onClick={() => setIsModalOpen(false)}
                            aria-label="Close modal"
                        >
                            <X size={24} />
                        </button>
                        <h2>Me pague um Café ☕</h2>
                        <form onSubmit={handleSubmit}>
                            <p>
                                Este é um projeto independente, criado com muito
                                carinho. Se você gostou do jogo e quer me ajudar
                                a mante-lo, você pode contribuir qualquer valor
                                é bem-vindo e fará toda a diferença! Utilize a
                                chave Pix abaixo para realizar sua doação:
                            </p>
                            <div className="form-group pix-section">
                                <p>
                                    <strong>Chave Pix:</strong>{' '}
                                    <em id="pixKey">
                                        1db4b864-0629-4484-9067-c6a7916e619e
                                    </em>{' '}
                                </p>
                                <button
                                    type="button"
                                    onClick={copyPixKey}
                                    className="copy-button"
                                >
                                    {isCopied ? 'Copiado!' : <Copy size={16} />}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CoffeeButton;
