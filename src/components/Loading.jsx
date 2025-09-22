import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        zIndex: 9999,
      }}
    >
      <Spinner
        animation="border"
        variant="light"
        style={{ width: "3rem", height: "3rem" }}
      />
      <span style={{ color: "#fff", marginTop: "10px", fontSize: "1.2rem" }}>
        Loading...
      </span>
    </div>
  );
};

export default Loading;
