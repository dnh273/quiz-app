interface StartGameProps {
  onStartGame: () => void;
}

const StartGame = ({ onStartGame }: StartGameProps) => {
  return (
    <div className="start-game">
      <h3 className="start-game--title">Welcome to React Quiz Game!</h3>
      <button className="btn btn-start" type="button" onClick={onStartGame}>
        Start
      </button>
    </div>
  );
};

export default StartGame;
