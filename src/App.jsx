import { useState } from "react";
import { GameBoard, TurnIndicator, WinnerModal } from "./components";
import { TURNS } from "./constants";
import { checkWinner, checkEndGame } from "./logic/board";
import confetti from "canvas-confetti";
import { resetGameFromStorage, saveGameToStorage } from "./logic/storage";

function App() {
  const [board, setBoard] = useState(() => {
    const localBoard = window.localStorage.getItem("board");

    if (localBoard) {
      return JSON.parse(localBoard);
    }

    return Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const localTurn = window.localStorage.getItem("turn");

    return localTurn ?? TURNS.X;
  });
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    resetGameFromStorage();
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    const newWinner = checkWinner(newBoard);

    saveGameToStorage({
      board: newBoard,
      turn: newTurn,
    });

    if (newWinner) {
      confetti();
      //* The update state function is asynchronous!!
      setWinner((prevWinner) => {
        return newWinner;
      });
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset Game</button>

      <GameBoard board={board} updateBoard={updateBoard} />

      <TurnIndicator turn={turn} />

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
