"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

const GRID_SIZE = 8
const NUMBERS_TO_FIND = ['12', '24', '36', '48', '60']

export default function SopaDeNumeros() {
  const [grid, setGrid] = useState<string[][]>([])
  const [foundNumbers, setFoundNumbers] = useState<string[]>([])
  const [selectedCells, setSelectedCells] = useState<number[]>([])

  useEffect(() => {
    initializeGrid()
  }, [])

  const initializeGrid = () => {
    const newGrid: string[][] = []
    for (let i = 0; i < GRID_SIZE; i++) {
      newGrid.push(Array(GRID_SIZE).fill('').map(() => Math.floor(Math.random() * 10).toString()))
    }
    
    NUMBERS_TO_FIND.forEach(num => {
      const [row, col] = [Math.floor(Math.random() * GRID_SIZE), Math.floor(Math.random() * (GRID_SIZE - 1))]
      newGrid[row][col] = num[0]
      newGrid[row][col + 1] = num[1]
    })
    
    setGrid(newGrid)
    setFoundNumbers([])
  }

  const handleCellClick = (row: number, col: number) => {
    const cellIndex = row * GRID_SIZE + col
    let newSelectedCells

    if (selectedCells.includes(cellIndex)) {
      newSelectedCells = selectedCells.filter(i => i !== cellIndex)
    } else if (selectedCells.length < 2) {
      newSelectedCells = [...selectedCells, cellIndex]
    } else {
      newSelectedCells = [cellIndex]
    }

    setSelectedCells(newSelectedCells)

    if (newSelectedCells.length === 2) {
      checkSelection(newSelectedCells)
    }
  }

  const checkSelection = (cells: number[]) => {
    const [cell1, cell2] = cells
    const num = grid[Math.floor(cell1 / GRID_SIZE)][cell1 % GRID_SIZE] + grid[Math.floor(cell2 / GRID_SIZE)][cell2 % GRID_SIZE]
    if (NUMBERS_TO_FIND.includes(num) && !foundNumbers.includes(num)) {
      setFoundNumbers([...foundNumbers, num])
    }
    setTimeout(() => setSelectedCells([]), 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-400 p-8">
      <Link href="/" className="text-blue-800 hover:underline mb-4 inline-block">&larr; Volver al inicio</Link>
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">Sopa de Números</h1>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <div className="grid grid-cols-8 gap-1 mb-4">
          {grid.flat().map((cell, index) => (
            <Button
              key={index}
              onClick={() => handleCellClick(Math.floor(index / GRID_SIZE), index % GRID_SIZE)}
              className={`text-lg h-10 w-10 p-0 ${selectedCells.includes(index) ? 'bg-yellow-300' : ''}`}
            >
              {cell}
            </Button>
          ))}
        </div>
        <div className="mb-4">
          <p className="text-lg font-bold">Números a encontrar:</p>
          <div className="flex flex-wrap gap-2">
            {NUMBERS_TO_FIND.map(num => (
              <span key={num} className={`text-lg ${foundNumbers.includes(num) ? 'line-through text-green-600' : ''}`}>
                {num}
              </span>
            ))}
          </div>
        </div>
        {foundNumbers.length === NUMBERS_TO_FIND.length && (
          <p className="text-2xl text-center mb-4 text-green-600">¡Felicidades! Has encontrado todos los números.</p>
        )}
        <Button onClick={initializeGrid} className="w-full">Nuevo Juego</Button>
      </div>
    </div>
  )
}

