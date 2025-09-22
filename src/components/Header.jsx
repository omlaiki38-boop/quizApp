import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { HouseDoor, Trophy, BoxArrowRight } from "react-bootstrap-icons";
import { Spinner } from "react-bootstrap";

const Header = () => {
  const { signOut, user, accountType, session } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false); // local state for logout
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goToDashboard = () => {
    navigate("/dashboard");
    setShowMenu(false);
  };

  const goToAdminDashboard = () => {
    navigate("/admin/dashboard");
    setShowMenu(false);
  };

  const goToLeaderboard = () => {
    navigate("/leaderboard");
    setShowMenu(false);
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await signOut();
      navigate("/login"); // redirect after logout
    } catch (error) {
      console.error(error);
    } finally {
      setLoggingOut(false);
    }
  };
  return (
    <header className="bg-dark p-3 shadow rounded-bottom d-flex justify-content-between align-items-center">
      {/* Left: Avatar + Title */}
      <div className="d-flex align-items-center gap-3">
        <div
          className="d-flex justify-content-center align-items-center rounded-circle bg-white text-primary fw-bold"
          style={{ width: "40px", height: "40px", fontSize: "1.2rem" }}
        >
          {user.user_metadata?.username?.[0]?.toUpperCase() || "U"}
        </div>
        <h1 className="text-white m-0 fs-4 fw-bold"> Quiz App</h1>
      </div>
      {/* Right: Username + Toggle Menu */}
      <div className="d-flex align-items-center gap-3 position-relative">
        <span className="text-white d-none d-sm-inline">
          Hi, {user.user_metadata?.username || "User"}!
        </span>

        {/* Toggle button */}
        <button
          ref={toggleRef}
          className="btn btn-light fw-bold"
          onClick={() => setShowMenu(!showMenu)}
        >
          ☰ Menu
        </button>

        {/* Dropdown menu */}
        {showMenu && (
          <div
            ref={menuRef}
            className="position-absolute bg-white rounded shadow p-2 d-flex flex-column"
            style={{
              top: "100%",
              right: 0,
              minWidth: "200px",
              zIndex: 1000,
            }}
          >
            {accountType === "admin" && (
              <button
                className={`btn mb-2 d-flex align-items-center gap-2 ${
                  location.pathname === "/admin/dashboard"
                    ? "btn-warning text-white"
                    : "btn-outline-warning"
                }`}
                onClick={goToAdminDashboard}
              >
                <HouseDoor />
                admin Dashboard
              </button>
            )}

            {console.log("acc", accountType)}
            {accountType === "client" && (
              <button
                className={`btn mb-2 d-flex align-items-center gap-2 ${
                  location.pathname === "/dashboard"
                    ? "btn-secondary text-white"
                    : "btn-outline-secondary"
                }`}
                onClick={goToDashboard}
              >
                <HouseDoor />
                Dashboard
              </button>
            )}

            <button
              className={`btn mb-2 d-flex align-items-center gap-2 ${
                location.pathname === "/leaderboard"
                  ? "btn-primary text-white"
                  : "btn-outline-primary"
              }`}
              onClick={goToLeaderboard}
            >
              <Trophy />
              Leaderboard
            </button>

            {session && (
              <button
                className="btn btn-outline-danger d-flex align-items-center gap-2"
                onClick={handleLogout}
                disabled={loggingOut}
              >
                <BoxArrowRight />
                {loggingOut ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Logging out...
                  </>
                ) : (
                  "Logout"
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
