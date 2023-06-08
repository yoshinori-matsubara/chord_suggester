import React from "react";
import "./styles/Loading.css";

function Loading({ inverted = true, content = "Loading..." }) {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <div className="content">{content}</div>
    </div>
  );
}

export default Loading;
