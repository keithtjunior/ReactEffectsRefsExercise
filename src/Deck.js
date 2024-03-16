import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Card from './Card';

const Deck = () => {
    const [deck, setDeck] = useState({ remaining: 52 });
    const [cards, setCards] = useState([]);
    const [toggleShuffle, setToggleShuffle] = useState(false);
    const hasRes = useRef(false);

    useEffect(function fetchDeckWhenMounted() {
        async function fetchDeck() {
            try {
                hasRes.current = false;
                const res = await axios.get(
                    `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
                    setDeck(res.data);
                    hasRes.current = true;
            } catch (err) {
                alert(`404 Error: Failed request. \n Please refresh the page.`);
            }
        }
        fetchDeck();
    }, []);

    useEffect(function shuffleCurrentDeck() {
        async function shuffleDeck() {
            try {
                hasRes.current = false;
                const res = await axios.get(
                    `https://deckofcardsapi.com/api/deck/${deck.deck_id}/shuffle/`);
                    setDeck(res.data);
                    setCards([]);
                    hasRes.current = true;
            } catch (err) {
                alert(`404 Error: Failed request. \n Please refresh the page.`);
            }
        }
        if(deck.deck_id && cards.length > 0) shuffleDeck();
    }, [toggleShuffle]);

    useEffect(function alertWhenDeckEmpty() {
        if(deck.remaining === 0) alert('Error: no cards remaining!');
    }, [deck.remaining]);

    const fetchCard = async () => {
        try {
            hasRes.current = false;
            const res = await axios.get(
                `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
                setDeck(res.data);
                setCards([...cards, {
                    image: res.data.cards[0].image,
                    code: res.data.cards[0].code,
                    value: res.data.cards[0].value,
                    suit: res.data.cards[0].suit
                }])
                hasRes.current = true;
        } catch (err) {
            alert(`404 Error: Failed request. \n Please refresh the page.`);
        }
    }

    const shuffle = () => setToggleShuffle(!toggleShuffle);

    return (
        <div style={{margin: '2rem'}}>
            <button 
                style={{marginBottom: '2rem'}} 
                disabled={!deck.deck_id || !hasRes.current || deck.remaining === 0}
                onClick={fetchCard}>
                    GIMMIE A CARD
            </button>
            <button 
                style={{marginLeft: '2rem'}} 
                disabled={!deck.deck_id || !hasRes.current || cards.length === 0}
                onClick={shuffle}>
                    SHUFFLE DECK
            </button>
            <div className='deck'>
                {cards.map(card => (
                    <Card 
                        key={card.code} 
                        image={card.image}
                        value={card.value}
                        suit={card.suit} />
                ))}
            </div>
        </div>
    )
}

export default Deck;