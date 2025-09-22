import "bootstrap/dist/css/bootstrap.min.css";
import { FaRedo, FaBookOpen, FaClock } from "react-icons/fa";

const QuizCompletedCard = ({ quiz }) => {
  return (
    <div
      className="card shadow-sm p-3 mb-4"
      style={{ borderRadius: "15px", maxWidth: "420px" }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">{quiz.section}</h5>
        <span className="badge bg-success">Completed</span>
      </div>
      <p className="text-muted mb-3">{quiz.title}</p>

      {/* Info row */}
      <div className="d-flex mb-3">
        <div className="me-4 d-flex align-items-center">
          <FaBookOpen className="me-2 text-muted" />
          <small>
            {quiz.nb_questions} question{quiz.nb_questions > 1 ? "s" : ""}
          </small>
        </div>
        <div className="d-flex align-items-center">
          <FaClock className="me-2 text-muted" />
          <small>~12 min</small>
        </div>
      </div>

      {/* Tags */}
      <div className="mb-3">
        <span className="badge bg-warning text-dark">{quiz.difficulty}</span>
      </div>
    </div>
  );
};

export default QuizCompletedCard;
