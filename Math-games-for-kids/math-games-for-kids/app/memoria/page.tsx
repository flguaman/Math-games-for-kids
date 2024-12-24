"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

type Card = {
  id: number
  content: string
  flipped: boolean
  matched: boolean
}

const createDeck = (): Card[] => {
  const numbers = Array.from({length: 8}, (_, i) => i + 1)
  const deck: Card[] = [
    ...numbers.map(n => ({ id: n, content: n.toString(), flipped: false, matched: false })),
    ...numbers.map(n => ({ id: n + 8, content: (n * 2).toString(), flipped: false, matched: false }))
  ]
  return shuffle(deck)
}

const shuffle = (array: any[]): any[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export default function MemoriaMatematica() {
  const [cards, setCards] = useState<Card[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState<number>(0)

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    setCards(createDeck())
    setFlippedCards([])
    setMatchedPairs(0)
  }

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return
    
    const newCards = cards.map(card => 
      card.id === id ? { ...card, flipped: true } : card
    )
    setCards(newCards)
    
    const newFlippedCards = [...flippedCards, id]
    setFlippedCards(newFlippedCards)
    
    if (newFlippedCards.length === 2) {
      setTimeout(() => checkMatch(newFlippedCards), 1000)
    }
  }

  const checkMatch = (flippedCardIds: number[]) => {
    const [card1, card2] = flippedCardIds.map(id => cards.find(card => card.id === id)!)
    
    if (parseInt(card1.content) * 2 === parseInt(card2.content) || parseInt(card2.content) * 2 === parseInt(card1.content)) {
      setCards(cards.map(card => 
        flippedCardIds.includes(card.id) ? { ...card, matched: true } : card
      ))
      setMatchedPairs(matchedPairs + 1)
    } else {
      setCards(cards.map(card => 
        flippedCardIds.includes(card.id) ? { ...card, flipped: false } : card
      ))
    }
    
    setFlippedCards([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-200 to-green-400 p-8">
      <Link href="/" className="text-blue-800 hover:underline mb-4 inline-block">&larr; Volver al inicio</Link>
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">Memoria Matemática</h1>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <div className="grid grid-cols-4 gap-2 mb-4">
          {cards.map(card => (
            <Button
              key={card.id}
              onClick={() => !card.flipped && !card.matched && handleCardClick(card.id)}
              className={`text-2xl h-16 ${card.flipped || card.matched ? 'bg-yellow-300' : ''}`}
              disabled={card.matched}
            >
              {card.flipped || card.matched ? card.content : '?'}
            </Button>
          ))}
        </div>
        {matchedPairs === 8 && (
          <p className="text-2xl text-center mb-4 text-green-600">¡Felicidades! Has encontrado todos los pares.</p>
        )}
        <Button onClick={initializeGame} className="w-full">Nuevo Juego</Button>
      </div>
    </div>
  )
}

