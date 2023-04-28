import CircleTimer from "../SVG/CircleTimer";

interface InGameProps {
  currentQuestion: {
    id: string;
    question_content: string;
    answers: Answer[];
  };
  timer: number;
  totalQuestions: number;
  userAnswer: Answer;
  onNextQuestion: () => void;
  onPrevQuestion: () => void;
  onSubmit: () => void;
  currentQuestionIndex: number;
  onAnswerChange: (answer: Answer) => void;
}

interface Answer {
  answer_content: string;
  correct: boolean;
}

const InGame = ({
  currentQuestion,
  currentQuestionIndex,
  timer,
  totalQuestions,
  onNextQuestion,
  onPrevQuestion,
  onAnswerChange,
  userAnswer,
  onSubmit,
}: InGameProps) => {
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
          className={
            currentQuestionIndex === totalQuestions - 1
              ? "btn btn-submit show"
              : "btn btn-submit"
          }
          onClick={onSubmit}
        >
          Submit
        </button>
      </div>

      <div className="quiz">
        <div className="time-left">
          <CircleTimer timeLeft={timer} />
        </div>
        <div className="question">
          <p>Question {currentQuestionIndex + 1}/5</p>
          <h3 className="title">{currentQuestion.question_content}</h3>
        </div>
        <div className="answers">
          {currentQuestion.answers.map((answer, index) => {
            return (
              <div
                key={index}
                className={`answer-item ${
                  userAnswer?.answer_content === answer.answer_content
                    ? "bg-blue color-white"
                    : ""
                }`}
                onClick={() => {
                  onAnswerChange(answer);
                }}
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

export default InGame;
