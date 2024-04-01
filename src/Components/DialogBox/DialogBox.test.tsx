import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import DialogBox from './DialogBox'
HTMLDialogElement.prototype.showModal = jest.fn(function mock(this: HTMLDialogElement) {
  this.open = true
})
HTMLDialogElement.prototype.close = jest.fn(function mock(this: HTMLDialogElement) {
  this.open = false
})

test('Dialog box is not visible when game is ongoing', () => {
  render(<DialogBox result={['Playing']} />)
  const dialogElement = screen.queryByRole('dialog')
  expect(dialogElement).toBeNull
})

test('Dialog box is visible when the game reaches a draw', () => {
  render(<DialogBox result={['Draw']} />)
  const dialogElement = screen.getByRole('dialog')
  expect(dialogElement).toBeInTheDocument
  expect(dialogElement).toHaveAttribute('open')
})

test('Dialog box is visible when the game reaches a draw', () => {
  render(<DialogBox result={['Won', 'X']} />)
  const dialogElement = screen.getByRole('dialog')
  expect(dialogElement).toBeInTheDocument
  expect(dialogElement).toHaveAttribute('open')
})

test('Correct text displays on the dialog box when Player O has won', () => {
  render(<DialogBox result={['Won', 'O']} />)
  expect(screen.getByText('Congratulations O, looks like you won!'))
})

test('Correct text displays on the dialog box when game reaches a draw', () => {
  render(<DialogBox result={['Draw']} />)
  expect(screen.getByText('Looks like a draw'))
})

test('Close button closes the dialog box', () => {
  const { container } = render(<DialogBox result={['Draw']} />)

  const closeButton = container.querySelector('.close-box-btn')
  fireEvent.click(closeButton as Element)
  const dialogElement = screen.queryByRole('dialog')

  expect(dialogElement).toBeNull
})
