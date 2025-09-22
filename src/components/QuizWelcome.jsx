import "bootstrap/dist/css/bootstrap.min.css";
import { FaQuestionCircle, FaClock, FaTrophy } from "react-icons/fa";

const QuizWelcome = ({ setStart }) => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card p-4 shadow"
        style={{ maxWidth: "500px", borderRadius: "15px" }}
      >
        <div className="tex t-center mb-4">
          <div
            className="rounded-circle d-flex justify-content-center align-items-center mb-3"
            style={{
              width: "60px",
              height: "60px",
              backgroundColor: "#0d0b1f",
              color: "#fff",
              margin: "0 auto",
            }}
          >
            <FaQuestionCircle size={30} />
          </div>
          <h3 className="card-title text-center">Welcome to the Quiz!</h3>
          <p className="text-muted text-center">
            Test your knowledge with our interactive quiz
          </p>
        </div>

        <div className="d-flex justify-content-between mb-4">
          <div className="text-center p-2" style={{ flex: 1 }}>
            <FaQuestionCircle size={20} />
            <h6 className="mt-2 mb-0">8 Questions</h6>
            <small className="text-muted">Multiple choice</small>
          </div>
          <div className="text-center p-2" style={{ flex: 1 }}>
            <FaClock size={20} />
            <h6 className="mt-2 mb-0">No Time Limit</h6>
            <small className="text-muted">Take your time</small>
          </div>
          <div className="text-center p-2" style={{ flex: 1 }}>
            <FaTrophy size={20} />
            <h6 className="mt-2 mb-0">Instant Results</h6>
            <small className="text-muted">See your score</small>
          </div>
        </div>

        <div className="mb-4">
          <h6>Instructions:</h6>
          <ol className="ps-3">
            <li>Read each question carefully</li>
            <li>Select the best answer from the options provided</li>
            <li>You can go back and change your answers before finishing</li>
            <li>Click "Finish" when you're ready to see your results</li>
          </ol>
        </div>

        <div className="text-center">
          <button className="btn btn-dark" onClick={() => setStart(true)}>
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizWelcome;
