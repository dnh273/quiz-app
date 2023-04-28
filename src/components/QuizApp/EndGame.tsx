interface EndGameProps {
  score: number;
  onRestartGame: () => void;
  onReviewGame: () => void;
}
const EndGame = ({ score, onRestartGame, onReviewGame }: EndGameProps) => {
  return (
    <>
      <div className="end-game">
        <h3>Your score is : {score}</h3>

        <div className="button">
          <button
            type="button"
            className="btn btn-try-again"
            onClick={onRestartGame}
          >
            Try again
          </button>
          <button
            type="button"
            className="btn btn-review"
            onClick={onReviewGame}
          >
            Review
          </button>
        </div>
      </div>
    </>
  );
};

export default EndGame;
