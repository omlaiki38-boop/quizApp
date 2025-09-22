import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import toast from "react-hot-toast";
import { useAuth } from "../Context/AuthContext";
import QuizCompletedCard from "../components/QuizCardCompleted";
import { CpuIcon } from "lucide-react";
import QuizCard from "../components/QuizCard";
import { Spinner } from "react-bootstrap";
const QuizTabs = () => {
  const [activeTab, setActiveTab] = useState("Completed");
  const tabs = ["Available", "Completed"];
  const [completedQuizzes, setCompletedQuizzes] = useState(undefined);
  const [availableQuizzes, setAvailableQuizzes] = useState(undefined);

  const { user } = useAuth();

  const handleClickTab = (tab) => {
    setActiveTab(tab);
  };

  // const checkQuizCompleted = async (quizId) => {
  //   const { data, error } = await supabase
  //     .from("user_quizzes")
  //     .select("id")
  //     .eq("user_id", user.id)
  //     .eq("quiz_id", quizId)
  //     .limit(1);

  //   if (error) toast.error(error.message);

  //   return data && data.length > 0;
  // };

  const renderCompletedQuizzes = async () => {
    const { data, error } = await supabase
      .from("quiz")
      .select(
        `
        *,
        user_quizzes!inner (
          user_id,
          quiz_id
        )
      `
      )
      .eq("user_quizzes.user_id", user.id);

    if (error) {
      toast.error(error.message);
    } else {
      setCompletedQuizzes(data);
    }
  };

  const renderAvailableQuizzes = async () => {
    // 1️⃣ Get the list of completed quiz IDs for the current user
    const { data: completed, error: completedError } = await supabase
      .from("user_quizzes")
      .select("quiz_id")
      .eq("user_id", user.id);

    if (completedError) {
      console.error(completedError);
    }

    // Convert to array of IDs
    const completedIds = completed?.map((q) => q.quiz_id) || [];

    // 2️⃣ Get quizzes NOT in that list
    const { data: availableQuizzes, error: quizError } = await supabase
      .from("quiz")
      .select("*")
      .not("id", "in", `(${completedIds.join(",")})`); // simpler and safe

    if (quizError) {
      console.error(quizError);
    } else {
      setAvailableQuizzes(availableQuizzes);
    }
  };

  // ✅ Also run whenever activeTab changes to "Completed"
  useEffect(() => {
    if (activeTab === "Completed" && user) {
      renderCompletedQuizzes();
    }
    if (activeTab == "Available" && user) {
      renderAvailableQuizzes();
    }
  }, [activeTab, user]);

  return (
    <>
      {/*quiz header */}
      <div className="d-flex justify-content-center my-3">
        <div
          className="d-flex p-1 bg-light rounded-pill shadow-sm"
          style={{ gap: "4px" }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`btn rounded-pill px-3 py-1 ${
                activeTab === tab
                  ? "btn-white shadow-sm fw-bold"
                  : "btn-light text-muted"
              }`}
              style={{
                border: "none",
                backgroundColor: activeTab === tab ? "#fff" : "transparent",
              }}
              onClick={() => handleClickTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      {activeTab === "Completed" && (
        <div className="container my-4">
          <div className="row g-4">
            {completedQuizzes === undefined ? (
              <div className="d-flex  justify-content-center">
                <Spinner
                  as="span"
                  animation="border"
                  size="lg"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
              </div>
            ) : completedQuizzes.length === 0 ? (
              <div className="text-center text-muted">no quizzes available</div>
            ) : (
              completedQuizzes.map((quiz, index) => (
                <div key={index} className="col-md-6 col-lg-4">
                  <QuizCompletedCard quiz={quiz} />
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === "Available" && (
        <div className="container my-4">
          <div className="row g-4">
            {availableQuizzes === undefined ? (
              <div className="d-flex  justify-content-center">
                <Spinner
                  as="span"
                  animation="border"
                  size="lg"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
              </div>
            ) : availableQuizzes.length === 0 ? (
              <div className="text-center text-muted">no quizzes available</div>
            ) : (
              availableQuizzes.map((quiz, index) => (
                <div key={index} className="col-md-6 col-lg-4">
                  <QuizCard quiz={quiz} />
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default QuizTabs;
