import { useState, useCallback } from "react";

import QUESTIONS from "../question";
import image_quizComplete from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);
  // const [timerKey, setTimerKey] = useState(0); 
  // Key for resetting timer

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer( 
    selectedAnswer) {
    setUserAnswers((prevUserAnswer) => {
      return [...prevUserAnswer, selectedAnswer];
    });
  },
  []);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return (
      <>
        <div id="summary">
          <img src={image_quizComplete} alt="" />
          <h2>KUIS SELESAI</h2>
        </div>
      </>
    );
  }

  const shuffledANswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledANswers.sort(() => Math.random() - 0.5);

  return (
    <main>
      <div id="quiz">
        <div id="question">
        <QuestionTimer timeout={10000} onTimeout={handleSkipAnswer} />

          <p>{QUESTIONS[activeQuestionIndex].text}</p>

          <ul id="answers">
            {shuffledANswers.map((answer) => (
              <li key={answer} className="answer">
                <button onClick={() => handleSelectAnswer(answer)}>
                  {answer}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Quiz;