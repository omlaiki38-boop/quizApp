import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { TrophyFill } from "react-bootstrap-icons";
import Header from "../components/Header";
import { supabase } from "../supabaseClient";
import toast from "react-hot-toast";
import { useAuth } from "../Context/AuthContext";
import Loading from "../components/Loading";
import { Spinner } from "react-bootstrap";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userInfo, user, accountType, session } = useAuth();

  useEffect(() => {
    console.log(session);
    const fetchLeaderboardData = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("account_type", "client");
        if (error) throw error;

        setLeaderboardData(data.sort((a, b) => b.total_score - a.total_score));
      } catch (e) {
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <div className="container my-5">
        <h2 className="text-center mb-5 fw-bold text-primary">
          🏆 Leaderboard
        </h2>
        {leaderboardData === undefined ? (
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
        ) : leaderboardData.length === 0 ? (
          <div className="text-center my-5 text-muted "> no users found </div>
        ) : (
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white fw-bold d-flex justify-content-between">
              <span style={{ width: "80px" }}>Rank</span>
              <span style={{ flex: 1 }}>User</span>
              <span style={{ width: "100px", textAlign: "right" }}>Score</span>
            </div>
            <ul className="list-group list-group-flush ">
              {leaderboardData.map((u, index) => (
                <li
                  key={index}
                  className={`list-group-item d-flex justify-content-between align-items-center ${
                    u.user_id == user.id ? "bg-warning" : ""
                  }`}
                >
                  {/* Rank + Avatar + Username */}
                  <div className="d-flex align-items-center gap-3 flex-grow-1">
                    <span
                      className="fw-bold text-primary"
                      style={{ width: "30px" }}
                    >
                      {index + 1}
                    </span>

                    <span className="fw-semibold">{u.username}</span>
                  </div>

                  {/* Score */}
                  <span className="fw-bold text-dark">{u.total_score}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Leaderboard;
