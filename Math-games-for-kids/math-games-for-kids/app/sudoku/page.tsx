"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

const GRID_SIZE = 4

export default function SudokuJunior() {
  const [grid, setGrid] = useState<number[][]>([])
  const [solved, setSolved] = useState(false)

  useEffect(() => {
    initializeGrid()
  }, [])

  const initializeGrid = () => {
    const newGrid = generateSudoku()
    setGrid(newGrid)
    setSolved(false)
  }

  const generateSudoku = (): number[][] => {
    const grid: number[][] = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0))
    fillGrid(grid)
    removeNumbers(grid)
    return grid
  }

  const fillGrid = (grid: number[][]) => {
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        if (grid[row][col] === 0) {
          for (let num = 1; num <= GRID_SIZE; num++) {
            if (isValid(grid, row, col, num)) {
              grid[row][col] = num
              if (fillGrid(grid)) return true
              grid[row][col] = 0
            }
          }
          return false
        }
      }
    }
    return true
  }

  const removeNumbers = (grid: number[][]) => {
    const numbersToRemove = 8
    for (let i = 0; i < numbersToRemove; i++) {
      let row = Math.floor(Math.random() * GRID_SIZE)
      let col = Math.floor(Math.random() * GRID_SIZE)
      while (grid[row][col] === 0) {
        row = Math.floor(Math.random() * GRID_SIZE)
        col = Math.floor(Math.random() * GRID_SIZE)
      }
      grid[row][col] = 0
    }
  }

  const isValid = (grid: number[][], row: number, col: number, num: number): boolean => {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[row][x] === num || grid[x][col] === num) return false
    }
    const boxSize = Math.sqrt(GRID_SIZE)
    const boxRow = Math.floor(row / boxSize) * boxSize
    const boxCol = Math.floor(col / boxSize) * boxSize
    for (let i = 0; i < boxSize; i++) {
      for (let j = 0; j < boxSize; j++) {
        if (grid[boxRow + i][boxCol + j] === num) return false
      }
    }
    return true
  }

  const handleCellChange = (row: number, col: number, value: string) => {
    const newValue = value === '' ? 0 : parseInt(value)
    if (isNaN(newValue) || newValue < 0 || newValue > GRID_SIZE) return

    const newGrid = grid.map((r, i) => 
      r.map((c, j) => i === row && j === col ? newValue : c)
    )
    setGrid(newGrid)
    checkSolution(newGrid)
  }

  const checkSolution = (currentGrid: number[][]) => {
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        if (currentGrid[row][col] === 0 || !isValid(currentGrid, row, col, currentGrid[row][col])) {
          setSolved(false)
          return
        }
      }
    }
    setSolved(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-200 to-purple-400 p-8">
      <Link href="/" className="text-blue-800 hover:underline mb-4 inline-block">&larr; Volver al inicio</Link>
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">Sudoku Junior</h1>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <div className="grid grid-cols-4 gap-1 mb-4">
          {grid.flat().map((cell, index) => (
            <input
              key={index}
              type="number"
              value={cell === 0 ? '' : cell}
              onChange={(e) => handleCellChange(Math.floor(index / GRID_SIZE), index % GRID_SIZE, e.target.value)}
              className="w-12 h-12 text-center text-2xl border border-gray-300 rounded"
              min="1"
              max="4"
            />
          ))}
        </div>
        {solved && <p className="text-2xl text-center mb-4 text-green-600">¡Felicidades! Has resuelto el Sudoku.</p>}
        <Button onClick={initializeGrid} className="w-full">Nuevo Juego</Button>
      </div>
    </div>
  )
}

