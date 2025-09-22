import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaRedo, FaBookOpen, FaClock } from "react-icons/fa";

import { supabase } from "../supabaseClient";
import toast from "react-hot-toast";
import QuizResult from "./QuizResult";
import { useNavigate } from "react-router-dom";
const QuizCard = ({ quiz }) => {
  const navigate = useNavigate();

  return (
    <div
      className="card shadow-sm p-3 mb-4"
      style={{ borderRadius: "15px", maxWidth: "420px" }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">{quiz.section}</h5>
        <span className="badge bg-warning text-dark">{quiz.difficulty}</span>
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

      <button
        className="btn btn-outline-secondary w-100"
        onClick={() => navigate(`/quiz/${quiz.id}`)}
      >
        <i className="bi bi-play-fill me-2"></i>
        Start Quiz
      </button>
    </div>
  );
};

export default QuizCard;
