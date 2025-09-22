import React, { useState } from "react";

export default function QuizQuestions({
  setEnd,
  setCorrectAnswers,
  questions,
}) {
  const [nbQuestion, setNbQuestion] = useState(1);
  const [userAnswer, setUserAnswer] = useState("");

  const checkUserAnswer = () => {
    console.log(questions);

    console.log(
      "user:",
      userAnswer,
      "correct:",
      questions[nbQuestion - 1].correct_answer
    );
    if (userAnswer === questions[nbQuestion - 1].correct_answer) {
      setCorrectAnswers((prev) => prev + 1); // functional update
      console.log("Correct answers incremented");
    }
  };

  const handleNextQuestion = () => {
    checkUserAnswer();
    if (nbQuestion < questions.length) {
      setUserAnswer("");
      setNbQuestion(nbQuestion + 1);
    } else {
      setEnd(true);
    }
  };

  const handlePrevQuestion = () => {
    if (nbQuestion > 1) {
      setNbQuestion(nbQuestion - 1);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow-sm p-4"
        style={{ maxWidth: "500px", width: "100%", borderRadius: "15px" }}
      >
        {/* Progress and question count */}
        <div className="row align-items-center my-1 g-2">
          <div className="col-auto">
            <small className="text-muted">
              Question {nbQuestion} of {questions.length}
            </small>
          </div>
          <div className="col">
            <div className="progress" style={{ height: "10px" }}>
              <div
                className="progress-bar bg-dark"
                role="progressbar"
                style={{ width: `${(nbQuestion * 100) / questions.length}%` }}
                aria-valuenow={(nbQuestion * 100) / questions.length}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>

        {/* Question */}
        <h5 className="mb-4">{questions[nbQuestion - 1].question}</h5>

        {/* Options */}
        <div className="mb-4">
          {questions[nbQuestion - 1].options.map((option) => (
            <div className="form-check mb-2" key={option}>
              <input
                className="form-check-input"
                type="radio"
                name={`question-${nbQuestion}`}
                id={option}
                value={option}
                checked={userAnswer === option}
                onChange={(e) => setUserAnswer(e.target.value)}
              />
              <label className="form-check-label" htmlFor={option}>
                {option}
              </label>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-between">
          <button className="btn btn-light" onClick={handlePrevQuestion}>
            Previous
          </button>
          <button
            className="btn btn-dark"
            onClick={handleNextQuestion}
            disabled={!userAnswer}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
