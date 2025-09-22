import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";

export default function QuizResult({ correctAnswers, total, quiz_id }) {
  const { session } = useAuth();
  const userId = session?.user?.id;
  const navigate = useNavigate();
  const scorePercent = Math.round((correctAnswers / total) * 100);

  // ✅ Prevent saving multiple times
  const hasSaved = useRef(false);

  useEffect(() => {
    const saveResult = async () => {
      if (hasSaved.current) return; // already saved once
      hasSaved.current = true;

      const { error } = await supabase.from("user_quizzes").insert([
        {
          user_id: userId,
          quiz_id: quiz_id,
          score: correctAnswers,
        },
      ]);

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Result saved ✅");
      }
    };

    if (userId && quiz_id) {
      saveResult();
    }
  }, [userId, quiz_id, correctAnswers]);

  return (
    <div className="p-5 my-2">
      {/* Result Title */}
      <div className="quiz-question text-center mb-4">
        <h2>Quiz Completed!</h2>
        <p className="text-muted fs-5">Here’s how you performed:</p>
      </div>

      {/* Score Section */}
      <div className="my-2 p-5 border border-secondary rounded text-center">
        <h3 className="mb-3">
          Score: {correctAnswers} / {total}
        </h3>
        <div className="progress my-3" style={{ height: "20px" }}>
          <div
            className="progress-bar bg-dark"
            role="progressbar"
            style={{ width: `${scorePercent}%` }}
            aria-valuenow={scorePercent}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {scorePercent}%
          </div>
        </div>
        <p className="fs-5">
          {scorePercent >= 70
            ? "Great job! 🎉"
            : "Keep practicing to improve! 💪"}
        </p>
        <div className="row d-flex justify-content-center gap-4 mt-4">
          <button
            className="btn btn-dark col-2 px-4"
            onClick={() => navigate("/leaderboard")}
          >
            Leaderboard
          </button>
          <button
            className="btn btn-dark col-2 px-4"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
