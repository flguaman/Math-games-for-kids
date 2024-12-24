"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from 'next/link'

export default function RestaGame() {
  const [num1, setNum1] = useState(0)
  const [num2, setNum2] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [message, setMessage] = useState('')
  const [score, setScore] = useState(0)

  useEffect(() => {
    generateQuestion()
  }, [])

  const generateQuestion = () => {
    let a = Math.floor(Math.random() * 20)
    let b = Math.floor(Math.random() * a)
    setNum1(a)
    setNum2(b)
    setUserAnswer('')
    setMessage('')
  }

  const checkAnswer = () => {
    const correctAnswer = num1 - num2
    if (parseInt(userAnswer) === correctAnswer) {
      setMessage('¡Correcto! ¡Excelente trabajo!')
      setScore(score + 1)
      setTimeout(generateQuestion, 1500)
    } else {
      setMessage(`Oops, inténtalo de nuevo. La respuesta correcta es ${correctAnswer}.`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-400 p-8">
      <Link href="/" className="text-blue-800 hover:underline mb-4 inline-block">&larr; Volver al inicio</Link>
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">Resta Rápida</h1>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <p className="text-2xl mb-4 text-center">
          {num1} - {num2} = ?
        </p>
        <div className="flex space-x-4 mb-4">
          <Input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Tu respuesta"
            className="text-2xl"
          />
          <Button onClick={checkAnswer} className="text-xl">Comprobar</Button>
        </div>
        {message && <p className="text-xl text-center mb-4">{message}</p>}
        <p className="text-xl text-center">Puntuación: {score}</p>
      </div>
    </div>
  )
}

