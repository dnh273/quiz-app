import "./App.css";
import QuizApp from "./components/QuizApp/QuizApp";
import quiz from "./data/questions.json";

function App() {
  return (
    <div className="App">
      <QuizApp questions={quiz} />
    </div>
  );
}

export default App;
