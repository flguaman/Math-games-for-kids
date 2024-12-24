"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function RompecabezasNumerico() {
  const [puzzle, setPuzzle] = useState<number[]>([])
  const [solved, setSolved] = useState(false)

  useEffect(() => {
    initializePuzzle()
  }, [])

  const initializePuzzle = () => {
    const numbers = Array.from({length: 8}, (_, i) => i + 1)
    numbers.push(0) // 0 representa el espacio vacío
    shuffleArray(numbers)
    setPuzzle(numbers)
    setSolved(false)
  }

  const shuffleArray = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
    }
  }

  const moveNumber = (index: number) => {
    const emptyIndex = puzzle.indexOf(0)
    if (
      (index === emptyIndex - 1 && emptyIndex % 3 !== 0) ||
      (index === emptyIndex + 1 && index % 3 !== 0) ||
      index === emptyIndex - 3 ||
      index === emptyIndex + 3
    ) {
      const newPuzzle = [...puzzle]
      ;[newPuzzle[index], newPuzzle[emptyIndex]] = [newPuzzle[emptyIndex], newPuzzle[index]]
      setPuzzle(newPuzzle)
      checkSolution(newPuzzle)
    }
  }

  const checkSolution = (currentPuzzle: number[]) => {
    if (currentPuzzle.slice(0, 8).every((num, index) => num === index + 1) && currentPuzzle[8] === 0) {
      setSolved(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-200 to-red-400 p-8">
      <Link href="/" className="text-blue-800 hover:underline mb-4 inline-block">&larr; Volver al inicio</Link>
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">Rompecabezas Numérico</h1>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <div className="grid grid-cols-3 gap-2 mb-4">
          {puzzle.map((num, index) => (
            <Button
              key={index}
              onClick={() => moveNumber(index)}
              className={`text-2xl h-16 ${num === 0 ? 'invisible' : ''}`}
              disabled={solved}
            >
              {num !== 0 ? num : ''}
            </Button>
          ))}
        </div>
        {solved && <p className="text-2xl text-center mb-4 text-green-600">¡Felicidades! Has resuelto el rompecabezas.</p>}
        <Button onClick={initializePuzzle} className="w-full">Nuevo Juego</Button>
      </div>
    </div>
  )
}

