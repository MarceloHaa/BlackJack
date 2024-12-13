import axios from 'axios';

const API_BASE = 'https://deckofcardsapi.com/api/deck';

export const shuffleDeck = async () => {
    try {
        const response = await axios.get(
            `${API_BASE}/new/shuffle/?deck_count=1`
        );
        return response.data;
    } catch (error) {
        console.error('Error shuffling the deck:', error);
        throw error;
    }
};

export const drawCards = async (deckId, count) => {
    try {
        const response = await axios.get(
            `${API_BASE}/${deckId}/draw/?count=${count}`
        );
        return response.data;
    } catch (error) {
        console.error('Error drawing cards:', error);
        throw error;
    }
};
