"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

const shapes = [
  { name: 'Círculo', sides: 0 },
  { name: 'Triángulo', sides: 3 },
  { name: 'Cuadrado', sides: 4 },
  { name: 'Pentágono', sides: 5 },
  { name: 'Hexágono', sides: 6 },
]

export default function GeometriaGame() {
  const [currentShape, setCurrentShape] = useState(shapes[0])
  const [options, setOptions] = useState([])
  const [message, setMessage] = useState('')
  const [score, setScore] = useState(0)

  useEffect(() => {
    generateQuestion()
  }, [])

  const generateQuestion = () => {
    const newShape = shapes[Math.floor(Math.random() * shapes.length)]
    setCurrentShape(newShape)
    const newOptions = [newShape.sides]
    while (newOptions.length < 3) {
      const option = Math.floor(Math.random() * 7)
      if (!newOptions.includes(option)) {
        newOptions.push(option)
      }
    }
    setOptions(newOptions.sort(() => Math.random() - 0.5))
    setMessage('')
  }

  const checkAnswer = (answer) => {
    if (answer === currentShape.sides) {
      setMessage('¡Correcto! ¡Eres un experto en formas!')
      setScore(score + 1)
      setTimeout(generateQuestion, 1500)
    } else {
      setMessage(`Oops, inténtalo de nuevo. ${currentShape.name} tiene ${currentShape.sides} lados.`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-200 to-purple-400 p-8">
      <Link href="/" className="text-blue-800 hover:underline mb-4 inline-block">&larr; Volver al inicio</Link>
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">Formas Geométricas</h1>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <p className="text-2xl mb-4 text-center">
          ¿Cuántos lados tiene un {currentShape.name}?
        </p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {options.map((option, index) => (
            <Button key={index} onClick={() => checkAnswer(option)} className="text-xl">
              {option}
            </Button>
          ))}
        </div>
        {message && <p className="text-xl text-center mb-4">{message}</p>}
        <p className="text-xl text-center">Puntuación: {score}</p>
      </div>
    </div>
  )
}

