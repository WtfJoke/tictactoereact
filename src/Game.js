import React, { useState } from 'react'
import { Board } from './Board'

export function Game() {
    function handleCLick(i) {
        const newHistory = history.slice(0, state.stepNumber + 1)
        const next = state.xIsNext
        const current = newHistory[newHistory.length - 1]
        const squares = current.squares.slice()
        if (calculateWinner(squares) || squares[i]) {
            return
        }
        squares[i] = next ? 'X' : 'O'
        updateState({
            history: newHistory.concat([
                {
                    squares: squares,
                },
            ]),
            stepNumber: newHistory.length,
            xIsNext: !next,
        })
    }
    function jumpTo(step) {
        updateState({
            history: state.history,
            stepNumber: step,
            xIsNext: step % 2 === 0,
        })
    }
    const [state, updateState] = useState({
        history: [
            {
                squares: Array(9).fill(null),
            },
        ],
        stepNumber: 0,
        xIsNext: true,
    })
    const history = state.history
    const current = history[state.stepNumber]
    const winner = calculateWinner(current.squares)
    const status = winner
        ? `Winner: ${winner}`
        : `Next player: ${state.xIsNext ? 'X' : 'O'}`
    const moves = history.map((_, moveIndex) => {
        const description = moveIndex
            ? `Go to move #${moveIndex}`
            : 'Go to game start'
        return (
            <li key={moveIndex}>
                <button onClick={() => jumpTo(moveIndex)}>{description}</button>
            </li>
        )
    })
    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={i => handleCLick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    )
}

function calculateWinner(squares) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    const winnerRow = winningCombinations
        .filter(notWinning(squares))
        .map(winningRow => squares[winningRow[0]])

    return winnerRow[0]
}

function notWinning(squares) {
    return ([a, b, c]) =>
        squares[a] && squares[a] === squares[b] && squares[a] === squares[c]
}
