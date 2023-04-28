import { useEffect, useState } from "react";
import InGame from "./InGame";
import StartGame from "./StartGame";
// import quizApp from "../../data/questions.json";
import EndGame from "./EndGame";
import ReviewGame from "./ReviewGame";

interface Question {
  id: string;
  question_content: string;
  answers: Answer[];
}

interface Answer {
  answer_content: string;
  correct: boolean;
}

interface quizApp {
  questions: Question[];
}

const QuizApp = ({ questions }: quizApp) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
  const [startGame, setStartGame] = useState<boolean>(false);
  const [endGame, setEndGame] = useState<boolean>(false);
  const [reviewGame, setReviewGame] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [timer, setTimer] = useState<number>(90);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  useEffect(() => {
    let interval: any;

    if (startGame) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    if (timer === 0) {
      handleSubmit();
    }

    return () => {
      clearInterval(interval);
      console.log("run clearInterval");
    };
  }, [timer, startGame]);

  const handleStartGame = () => {
    setCurrentQuestionIndex(0);
    setTimer(90);
    setStartGame(true);
  };

  const handleRestartGame = () => {
    window.location.reload();
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setStartGame(false);
    handleScore();
    setEndGame(true);
  };

  const handleReviewGame = () => {
    setCurrentQuestionIndex(0);
    setReviewGame(true);
  };

  const handleScore = () => {
    let score = 0;
    questions.forEach((question) => {
      question.answers.forEach((answer) => {
        if (userAnswers.includes(answer) && answer.correct) {
          score++;
        }
      });
    });
    console.log(score);
    setScore(score);
  };

  const handleAnswerChange = (answer: Answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    console.log(newAnswers);
    setUserAnswers(newAnswers);
  };

  // useEffect(() => { console.log('Component re-rendered'); }, [reload]);

  if (reviewGame) {
    return (
      <ReviewGame
        onNextQuestion={handleNextQuestion}
        onPrevQuestion={handlePrevQuestion}
        onRestartGame={handleRestartGame}
        currentQuestion={currentQuestion}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
        userAnswer={userAnswers[currentQuestionIndex]}
      />
    );
  }

  if (endGame) {
    return (
      <EndGame
        score={score}
        onReviewGame={handleReviewGame}
        onRestartGame={handleRestartGame}
      />
    );
  }

  if (startGame) {
    return (
      <InGame
        timer={timer}
        totalQuestions={totalQuestions}
        currentQuestion={currentQuestion}
        userAnswer={userAnswers[currentQuestionIndex]}
        onAnswerChange={handleAnswerChange}
        currentQuestionIndex={currentQuestionIndex}
        onNextQuestion={handleNextQuestion}
        onPrevQuestion={handlePrevQuestion}
        onSubmit={handleSubmit}
      />
    );
  }

  return (
    <>
      <StartGame onStartGame={handleStartGame} />
    </>
  );
};

export default QuizApp;
