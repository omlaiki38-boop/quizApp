import React, { useEffect, useState } from "react";
import QuizWelcome from "../../components/QuizWelcome";
import QuizResult from "../../components/QuizResult";
import QuizQuestions from "../../components/QuizQuestions";
import { supabase } from "../../supabaseClient";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";
import { CpuIcon } from "lucide-react";
import { useAuth } from "../../Context/AuthContext";
export default function Quiz() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [questions, setQuestions] = useState(null);
  const [total, setTotal] = useState(0);
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const { session } = useAuth();
  useEffect(() => {
    const getQuestions = async () => {
      const { data, error } = await supabase
        .from("user_quizzes")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("quiz_id", id)
        .single();

      if (data) {
        // Already completed
        toast.error("You already completed this quiz!");
        navigate("/dashboard");
        return;
      }

      const { data: questionsData, error: questionsError } = await supabase
        .from("questions")
        .select("*")
        .eq("quiz_id", id);

      if (questionsError) {
        toast.error(questionsError.message());
      }
      setQuestions(questionsData);
      setTotal(questionsData.length);
    };

    getQuestions();
  }, []);

  // Otherwise, allow them to start

  if (questions == null) {
    return <Loading />;
  }
  return !start ? (
    <QuizWelcome setStart={setStart} />
  ) : end ? (
    <QuizResult correctAnswers={correctAnswers} total={total} quiz_id={id} />
  ) : (
    <QuizQuestions
      questions={questions}
      setEnd={setEnd}
      setCorrectAnswers={setCorrectAnswers}
      correctAnswers={correctAnswers}
    />
  );
}
