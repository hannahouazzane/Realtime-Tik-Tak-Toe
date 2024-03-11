import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import { Board } from './Board'

const mockSetGameResult: React.Dispatch<React.SetStateAction<Array<string>>> = jest.fn()

let squares: Record<number, Element | null> = {}

beforeEach(() => {
  jest.clearAllMocks()
  const { container } = render(<Board gameResult={['Pending']} setGameResult={mockSetGameResult} />)

  // Initialize squares dynamically
  squares = {}
  for (let i = 1; i <= 9; i++) {
    squares[i] = container.querySelector(`.board > div:nth-child(${i})`)
  }
})

const clickSquare = (index: number) => {
  if (squares[index]) {
    fireEvent.click(squares[index] as Element)
  }
}

const expectImageInSquare = (index: number, altText: string) => {
  const image = squares[index]?.querySelector(`img[alt="${altText}"]`)
  expect(image).toBeInTheDocument()
}

test('Board renders', () => {
  const getBoardElement = document.querySelector('.board')
  expect(getBoardElement).toBeInTheDocument
})

test('an X image shows when player X presses a square', () => {
  clickSquare(1)
  expectImageInSquare(1, 'Cross')
})

test('an O image shows when player O presses a square', async () => {
  clickSquare(1)
  clickSquare(2)
  expectImageInSquare(2, 'Naught')
})

test('Game result set to player X Won when they win', () => {
  clickSquare(2)
  clickSquare(5)
  clickSquare(1)
  clickSquare(6)
  clickSquare(3)
  expect(mockSetGameResult).toHaveBeenCalledWith(['Won', 'X'])
})

test('Game result set to player O won when they win', () => {
  clickSquare(3)
  clickSquare(5)
  clickSquare(1)
  clickSquare(8)
  clickSquare(6)
  clickSquare(2)
  expect(mockSetGameResult).toHaveBeenCalledWith(['Won', 'O'])
})

test('Game result set to draw when the game play end its a draw', () => {
  clickSquare(1)
  clickSquare(4)
  clickSquare(7)
  clickSquare(2)
  clickSquare(5)
  clickSquare(9)
  clickSquare(8)
  clickSquare(3)
  clickSquare(6)

  expect(mockSetGameResult).toHaveBeenCalledWith(['Draw'])
})
