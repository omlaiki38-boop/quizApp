import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorised = () => {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        padding: "20px",
      }}
    >
      <div
        className="card shadow-lg rounded-5 text-center p-5"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        {/* Icon / Illustration */}
        <div
          className="mb-4 d-flex justify-content-center align-items-center"
          style={{
            width: "100px",
            height: "100px",
            margin: "0 auto",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #ff6b6b, #ff8787)",
          }}
        >
          <i
            className="bi bi-shield-lock-fill text-white"
            style={{ fontSize: "2.5rem" }}
          ></i>
        </div>

        {/* Heading */}
        <h2 className="fw-bold text-dark mb-3">Access Denied</h2>
        <p className="text-secondary mb-4">
          You don’t have permission to view this page. Please check with the
          administrator or try another page.
        </p>

        {/* Buttons */}
        <div className="d-grid gap-3">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate("/")}
          >
            <i className="bi bi-house-door-fill me-2"></i> Go to Homepage
          </button>

          <button
            className="btn btn-outline-secondary btn-lg"
            onClick={() => navigate(-1)}
          >
            <i className="bi bi-arrow-left-circle-fill me-2"></i> Take Me Back
          </button>
        </div>

        {/* Footer Note */}
        <small className="text-muted mt-4 d-block">
          Tip: Check the URL or return to the homepage.
        </small>
      </div>
    </div>
  );
};

export default Unauthorised;
