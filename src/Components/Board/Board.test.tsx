import { render } from '@testing-library/react'
import React from 'react'
import { Board } from './Board'

test('Board renders', () => {
  const mockSetGameResult: React.Dispatch<React.SetStateAction<Array<string>>> = jest.fn()

  const mockGameResult: Array<string> = ['Pending']
  render(<Board gameResult={mockGameResult} setGameResult={mockSetGameResult} />)
})
