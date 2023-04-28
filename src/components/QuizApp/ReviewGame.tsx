interface ReviewGameProps {
  userAnswer: Answer;
  onRestartGame: () => void;
  currentQuestion: { id: string; question_content: string; answers: Answer[] };
  currentQuestionIndex: number;
  totalQuestions: number;
  onNextQuestion: () => void;
  onPrevQuestion: () => void;
}

interface Answer {
  answer_content: string;
  correct: boolean;
}

const ReviewGame = ({
  userAnswer,
  onRestartGame,
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  onNextQuestion,
  onPrevQuestion,
}: ReviewGameProps) => {
  return (
    <>
      <div className="actions">
        <button
          type="button"
          className="btn btn-previous"
          disabled={currentQuestionIndex === 0}
          onClick={onPrevQuestion}
        >
          Previous
        </button>
        <button
          type="button"
          className="btn btn-next"
          disabled={currentQuestionIndex === totalQuestions - 1}
          onClick={onNextQuestion}
        >
          Next
        </button>
        <button
          type="button"
          className="btn btn-restart"
          onClick={onRestartGame}
        >
          Restart
        </button>
      </div>

      <div className="quiz">
        <div className="question">
          <p>Question {currentQuestionIndex + 1}/5</p>
          <h3 className="title">{currentQuestion.question_content}</h3>
        </div>
        <div className="answers">
          {currentQuestion.answers.map((answer, index) => {
            return (
              <div
                key={index}
                className={`answer-item disable ${
                  answer.correct ? "correct-answer color-white" : ""
                } ${
                  userAnswer?.answer_content === answer.answer_content &&
                  !answer.correct
                    ? "incorrect-answer color-white"
                    : ""
                }`}
              >
                <h5>
                  {index + 1}) {answer.answer_content}
                </h5>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ReviewGame;
