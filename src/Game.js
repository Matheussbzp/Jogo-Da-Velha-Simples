import React, { useState } from 'react';

function Board({ squares, onClick, winnerLine }) {
  function renderSquare(i) {
    const isWinnerSquare = winnerLine && winnerLine.includes(i);
    const squareClassName = `square${isWinnerSquare ? ' winner' : ''}`;
    return (
      <button className={squareClassName} onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    );
  }

  return (
    <div className="board">
      {[0, 1, 2].map((row) => (
        <div className="board-row" key={row}>
          {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
        </div>
      ))}
    </div>
  );
}

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    const newSquares = squares.slice();
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }

  function calculateWinner(squares) {
    const lines = [  
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    return null;
  }

  const result = calculateWinner(squares);
  const winner = result?.winner;
  const winnerLine = result?.line;
  const isTie = !winner && squares.every((square) => square !== null);
  const status = winner ? `O vencedor é: ${winner}` : isTie ? `Deu Velha!` : `Próximo jogador: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} onClick={handleClick} winnerLine={winnerLine} />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
      </div>
    </div>
  );
}

export default Game
