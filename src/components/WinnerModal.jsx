import { Square } from "./Square";

export const WinnerModal = ({ winner, resetGame }) => {
  if (winner === null) return null;

  const modalText = winner === false ? "It's a tie!" : `The winner is:`;
  return (
    <section className="winner">
      <div className="text">
        <h2>{modalText}</h2>
        <header className="win">{winner && <Square> {winner}</Square>}</header>
        <footer>
          <button onClick={resetGame}>Play again</button>
        </footer>
      </div>
    </section>
  );
};
